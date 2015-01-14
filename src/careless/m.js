module.exports = function m() {
  var out = {};

  for (var i = 0; i < arguments.length; i++) {
    var obj = arguments[i];
    for (var j in obj) {
      out[j] = obj[j];
    }
  }

  return out;
};
