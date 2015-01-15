"use strict";

var transform = require('../main').transform;

module.exports = {
  process: function(src) {
    var options = {
      harmony: true,
      sourceMap: false,
      stripTypes: true
    };
    return transform(src, options);
  }
};
