var util = require('util');

// Taken from React source code
var _uppercasePattern = /([A-Z])/g;
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var renderAttributes = function(props) {
  var attrs = [];

  for (var p in props) {
    if (p === 'children') {
      continue;
    }

    attrs.push(renderAttribute(p, props[p]));
  }

  return attrs.length > 0 ? ' ' + attrs.join(' '): '';
};

var renderAttribute = function(propName, prop) {

  if (typeof prop === "undefined" || prop === null || prop === false) {
    return "";
  }

  if (prop === true) {
    return propName;
  }

  var propVal = "";

  if (typeof prop === 'string' || typeof prop === 'number') {
    propVal = prop;
  } else if (Array.isArray(prop)) {
    var s = [];
    for (var i in prop) {
      s.push(prop[i]);
    }
    propVal = s.join(' ');
  } else if (typeof prop === 'object') {
    propVal = renderStyleObject(prop);
  } else {
    throw Error('Unsupported type for attribute ' + propName + " : " + util.inspect(prop));
  }

  return propName+'="'+propVal+'"';

};

var stylesToVendorExtensions = {
  "border-radius": [
    "-webkit-border-radius", "-moz-border-radius"
  ]
};

var renderStyleObject = function(prop) {
  /*
   prop = {
   fontSize: "12pt",
   color: "red"
   }
   */

  var styles = [];

  for (var key in prop) {
    styles.push(hyphenate(key) + ": " + prop[key] +";");
  }

  return styles.join(" ");
};

module.exports = renderAttributes;
