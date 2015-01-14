var Careless = require('..');
var m = Careless.m;

var data = function() {
  var style = {
    fontSize: "12pt",
    "background-color": "red",
    color: "#00000"
  };

  var override = {
    color: "blue"
  };

  return (
    <div style={m(style, override)}>
      Test div
    </div>
  )
};

var check = function() {
  console.log(Careless.renderToString(data()));
};

check();
