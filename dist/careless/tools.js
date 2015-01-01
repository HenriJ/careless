var JSXX_DEFAULT_OPTIONS = {
  harmony: true,
  sourceMap: false,
  stripTypes: true
};

function jsxxify(JSXX_OPTIONS) {

  JSXX_OPTIONS = JSXX_OPTIONS || {};
  if (JSXX_OPTIONS.harmony === undefined) {
    JSXX_OPTIONS.harmony = JSXX_DEFAULT_OPTIONS.harmony;
  }
  if (JSXX_OPTIONS.sourceMap === undefined) {
    JSXX_OPTIONS.sourceMap = JSXX_DEFAULT_OPTIONS.sourceMap;
  }
  if (JSXX_OPTIONS.stripTypes === undefined) {
    JSXX_OPTIONS.stripTypes = JSXX_DEFAULT_OPTIONS.stripTypes;
  }

  return through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      // return empty file
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      return cb(Error('Streaming not supported'));
    }

    // File is a Buffer if we reach here
    file.contents = new Buffer(transform(String(file.contents), JSXX_OPTIONS));

    cb(null, file);
  });
}

module.exports = {
  gulp: jsxxify
};
