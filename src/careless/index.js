require('./object-assign-polyfill');

var render = require('./render');
var tools = require('./tools');
var m = require('./m');

module.exports = {
  renderToString: render.renderToString,
  escapeXml: render.escapeXml,
  m: m,
  tools: tools
};
