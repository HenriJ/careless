"use strict";

var gulp = require('gulp');
var merge = require('merge-stream');
var through = require('through2');
var source = require('vinyl-source-stream');
var del = require('del');

var transform = require('./main').transform;

var JSXX_OPTIONS = {
  harmony: true,
  sourceMap: false,
  stripTypes: true
};

function jsxxify() {

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

gulp.task('careless', function() {

  return gulp.src('src/careless/**/*.js')
  .pipe(jsxxify())
  .pipe(gulp.dest('dist/careless'));
  
});

gulp.task('examples', ['careless'], function() {

  var ressources = gulp.src('src/examples/**/*.{jpg,png,json,txt,md}')
  .pipe(gulp.dest('dist/examples'));

  var scripts = gulp.src('src/examples/**/*.{js,jsx}')
  .pipe(jsxxify())
  .pipe(gulp.dest('dist/examples'));

  var module_careless = gulp.src('dist/careless/**/*')
  .pipe(gulp.dest('dist/node_modules/careless/'));

  return merge(ressources, scripts, module_careless);
  
});

gulp.task('clean', function(cb) {
  del(['dist/*'], cb);
});

gulp.task('default', ['careless', 'examples']);
