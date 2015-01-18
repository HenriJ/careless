module.exports = function m() {
  var args = [{}];

  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  // When ES6 spread operator is here, could be simply Object.assign({}, ...arguments)
  return Object.assign.apply(null, args);
};
