var util = require('util');
var renderAttributes = require('./attr');

// TODO use envify
var __DEV__ = true;

var isFunction = function(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

var escapeXml = function(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * List of tags that when empty should not use the self-closing syntax
 * Ex: <div></div> should not be rendered as "<div />" but as "<div></div>"
 * @type {string[]}
 */
var TAGS_NO_SHORT_CLOSING = ['div', 'span', 'p', 'title'];

/**
 *
 * @param {{type: String, props?: {}}} node
 * @param {Array?} contexts
 * @param {{push: function}} out
 */
function renderTag(node, contexts, out) {

  if (__DEV__) {
    if (tagAttrs && tagAttrs.children && !Array.isArray(tagAttrs.children)) {
      throw new Error("A node's children should be in an array, event if there is only one : " + util.inspect(node));
    }
  }

  var tagName = node.type;
  var tagAttrs = node.props;
  var hasChildren = tagAttrs && tagAttrs.children && tagAttrs.children.length > 0;

  out.push('<'+tagName+renderAttributes(tagAttrs));

  if (hasChildren || TAGS_NO_SHORT_CLOSING.indexOf(tagName) !== -1) {
    out.push('>');
    if (hasChildren) {
      tagAttrs.children.forEach(child => _renderToString(child, out, contexts));
    }
    out.push('</'+tagName+'>');
  } else {
    out.push(' />');
  }
}

var _renderToString = function(node, out, contexts) {

  // null => no render
  if (node === null) {
    return;
  }

  // String or number node => render escaped text
  if (typeof node === 'string' || typeof node === 'number') {
    out.push(escapeXml(String(node)));
    return;
  }

  // Data flagged as raw to avoid escaping
  if (node.raw !== undefined) {
    out.push(String(node.raw));
    return;
  }

  // Array of nodes => render each element
  if (Array.isArray(node)) {
    node.forEach(n => _renderToString(n, out, contexts));
    return;
  }

  // If node.type is a function, this is a "virtual" node
  if (isFunction(node.type)) {
    var render = node.type;
    var props = node.props || {}; // props are never undefined, at least they are an empty object

    // Could be replace by ES6 spread operator when available : args = [props, ...contexts]
    var args = [props];
    contexts.forEach(c => args.push(c));
    _renderToString(render.apply(this, args), out, contexts);
    return;
  }

  // "real" node (those beginning with a lowercase letter)
  if (node.type && typeof node.type === 'string') {
    renderTag(node, contexts, out);
    return;
  }

  // Finally, if we have no clue what kind of node this is
  throw Error('Unsupported node : ' + util.inspect(node));
};

var renderToString = function(node, ...contexts) {
  var out = [];
  _renderToString(node, out, contexts);
  return out.join('');
};

module.exports = {
  renderToString: renderToString,
  escapeXml: escapeXml
};
