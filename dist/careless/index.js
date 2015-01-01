var careless = require('./careless');
var tools = require('./tools');

module.exports = {
  createElement: careless.createElement,
  createClass: careless.createClass,
  renderToString: careless.renderToString,
  Component: careless.Component,
  raw: careless.raw,
  escapeXml: careless.escapeXml,
  __spread: careless.__spread,
  tools: tools
};
