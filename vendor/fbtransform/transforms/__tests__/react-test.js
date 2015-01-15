/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails react-core
 */

/*jshint evil:true, unused:false*/

"use strict";

require('mock-modules').autoMockOff();

describe('reactless jsx', function() {
  var transformAll = require('../../syntax.js').transformAll;

  var transform = function(code, excludes) {
    return transformAll(
      code,
      {harmony: true},
      (excludes || []).concat(['sourcemeta', 'allocate'])
    );
  };

  it('should convert simple tags', function() {
    var code = 'var x = <div></div>;';
    var result = 'var x = {elt: "div", props: null};';

    expect(transform(code).code).toEqual(result);
  });


  it('should convert simple text', function() {
    var code = 'var x = <div>text</div>;';
    var result = 'var x = {elt: "div", props: {children: ["text"]}};';

    expect(transform(code).code).toEqual(result);
  });

  it('should accept xml namespaces', function() {
    var code = 'var x = <fo:block>text</fo:block>;';
    var result = 'var x = {elt: "fo:block", props: {children: ["text"]}};';

    expect(transform(code).code).toEqual(result);
  });

  it('should accept string attributes', function() {
    var code = 'var x = <div style="color: red;">text</div>;';
    var result = 'var x = {elt: "div", props: {style: "color: red;", children: ["text"]}};';

    expect(transform(code).code).toEqual(result);
  });

  it('should accept interpolated attributes', function() {
    var code = 'var x = <div style={"color: red;"}>text</div>;';
    var result = 'var x = {elt: "div", props: {style: "color: red;", children: ["text"]}};';

    expect(transform(code).code).toEqual(result);
  });

  it('should accept js attributes', function() {
    var code = 'var x = <div style={style}>text</div>;';
    var result = 'var x = {elt: "div", props: {style: style, children: ["text"]}};';

    expect(transform(code).code).toEqual(result);
  });

  it('should support self-closed tags', function() {
    var code = 'var x = <br />;';
    var result = 'var x = {elt: "br", props: null};';

    expect(transform(code).code).toEqual(result);
  });

  it('should support spread props', function() {
    var code = 'var x = <hr {...spread} />;';
    var result = 'var x = {elt: "hr", props: Object.assign({}, spread)};';

    expect(transform(code).code).toEqual(result);
  });

  it('should support spread props and not use unecessary object', function() {
    var code = 'var x = <hr data="data" {...spread} />;';
    var result = 'var x = {elt: "hr", props: Object.assign({data: "data"}, spread)};';

    expect(transform(code).code).toEqual(result);
  });

/*
  // TODO
  it('should support xml comments', function() {
    var code = 'var x = <!-- XML comment -->;';
    var result = 'var x = {raw: "<!-- XML comment -->"};';

    expect(transform(code).code).toEqual(result);
  });
  */

});
