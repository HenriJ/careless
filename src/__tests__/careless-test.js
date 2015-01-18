/*jshint evil:true, unused:false*/

"use strict";

var Careless = require('../careless');
require('mock-modules').autoMockOff();

describe('reactless render', function() {

  it('should render empty div', function() {
    var code = <div></div>;
    var result = '<div></div>';

    expect(Careless.renderToString(code)).toEqual(result);
  });

  it('should render POJO', function() {
    var code = {type: 'div', props: {children: ["Test"]}};
    var result = '<div>Test</div>';

    expect(Careless.renderToString(code)).toEqual(result);
  });

  it('should render spread attributes', function() {
    var attrs = {
      "class": "header"
    };
    var code = <div {...attrs}></div>;
    var result = '<div class="header"></div>';

    expect(Careless.renderToString(code)).toEqual(result);
  });

  it('should render a generated list', function() {
    var lis = [<li>1</li>, <li>2</li>];
    var code = <ul>{lis}</ul>;
    var result = '<ul><li>1</li><li>2</li></ul>';

    expect(Careless.renderToString(code)).toEqual(result);
  });

  it('should be able to use a simple context', function() {
    var Sub = function(props, context){
      return <span>{context.data}</span>;
    };
    var context = {data: "Lorem"};
    var code = <div><Sub /></div>;
    var result = '<div><span>Lorem</span></div>';

    expect(Careless.renderToString(code, context)).toEqual(result);
  });

  it('should be able to use a multi context', function() {
    var res = [];
    var Sub = function(props, context, res){
      res.push('Out of band output');
      return <span></span>;
    };
    var context = {};
    Careless.renderToString(<Sub />, context, res);

    expect(res[0]).toBe('Out of band output');
  });

  it('should support the merge function', function() {
    var style = {color: "red", fontSize: "12pt"}
    var code = <div style={Careless.m(style, {color: "blue"})}></div>;
    var result = '<div style="color: blue; font-size: 12pt;"></div>';

    expect(Careless.renderToString(code)).toEqual(result);
  });

  it('should have some love for xsl-fo', function() {
    var code = (
      <page-sequence master-reference="A4">
        <afp:no-operation name="nop">NOP</afp:no-operation>
        <flow flow-name="xsl-region-body" font-size="10pt">
          <block margin-top="8mm">
            Test
          </block>
        </flow>
      </page-sequence>
    );

    var result = '<page-sequence master-reference="A4">'+
      '<afp:no-operation name="nop">NOP</afp:no-operation>' +
      '<flow flow-name="xsl-region-body" font-size="10pt">' +
      '<block margin-top="8mm">Test</block>' +
      '</flow>' +
      '</page-sequence>';

    expect(Careless.renderToString(code)).toEqual(result);
  });

});
