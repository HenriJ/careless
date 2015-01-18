# Careless

A JSX/React fork for static XML generation that just don't care.


Examples :
```js
var Careless = require('careless');

// Careless works with XML namespace
var XslfoExample = function(props, context) {
	return (
		<fo:page-sequence master-reference="my-page">
			<fo:flow flow-name="xsl-region-body">
				<fo:block>{props.children}</fo:block>
			</fo:flow>
		</fo:page-sequence>
	);
};

console.log(Careless.renderToString(XslfoExample, {}));

// Careless doesn't care if you use string for inline style
var XhtmlExample = function(props, context) {
	return(
	<div>
		<h1 style="margin-top: 5px;">{props.title}</h1>
		<div>
			{{raw: context.html}}
		</div>
	</div>
	);
);

// Careless doesn't event care if you want to pass a "global" context when rendering
console.log(Careless.renderToString(XhtmlExample, {html: "<span>Raw HTML !</span>"}));
```

# Differences with Facebook flavored JSX/React

## JSX : POJO instead of createElement

Careless's JSX compiles to pure POJO (as next versions of React will be) and ES6 Object.assign for the spread attribute.

This way the creation of the nodes tree is separated from the redenring : because nodes are POJOs, you don't need to
require Careless in the modules that do no rendering.

Note: When you require careless, it will polyfill Object.assign if it doesn't exist

Example :
```js
var simpleDivWithId = <div id="div-id">Simple Div</div>;

var attrs = {style: "color: red;"};
var divWithSpreadAttrs = <div {...attrs}>Div with spread</div>;
```

compiles to :

```js
var simpleDivWithId = {type: "div", props: {id: "div-id", children: ["Simple Div"]}};

var attrs = {style: "color: red;"};
var divWithSpreadAttrs = {type: "div", props: Object.assign({}, attrs, {children: ["Div with spread"]})};
```

# JSX : XML support (XML namespace, custom tags, ...)

Careless is not only html-focused. It will accept any kind of xml tags and even xml namespaces.

It allows you to write things like
```js
<page-sequence master-reference="A4">
  <afp:no-operation name="nop">NOP</afp:no-operation>
  <flow flow-name="xsl-region-body" font-size="10pt">
    <block margin-top="8mm">
      Test
    </block>
  </flow>
</page-sequence>
```

# Rendering : raw xml/html support

Careless doesn't use __dangerouslySetInnerHtml, but the simplier (riskier ?) {raw: "<div>Raw HTML</div>"}

Example:
```js
Careless.renderToString(<div>{{raw: "<span>Raw HTML !</span>"}}</div>);
```

# Rendering : no state, no class !

When generating a static document, there is little need for state.
Therefore there is no Careless.createClass.
If you want to create a component, just write a function !

```js
function Custom(props) {
  return <span>A custom {props.content}</span>;
}

Careless.renderToString(<div><Custom content="Tag"/></div>);
```

# Rendering : special handling of attributes

To give a class to your HTML tag, just use the class attribute, not className.

Inline-style can be written directly as a string, no need to use an object if you don't want to.

```js
// This is OK in careless but not in react
var divWithClass = <div class="header"></div>;

// This is KO in careless, but what you should do in react
var otherDivWithClass = <div classname="header"></div>;

// This is OK both in react and careless
var style = {color: "red"};
var divWithStyle = <div style={style}></div>;

// This OK only in careless (because it doesn't care)
var otherDivWithStyle = <div style="color: red;"></div>
```

# Context

When generating static documents, typically mails for your customers, it is very practical to have a global context
containing the customer common datas.
Careless allows you to pass automatically this context down to every child components.


Examples :
```js
var Careless = require('careless');


var Recipient = function(props, context) {
	var customer = context.customer;
	return (
		<div>
			{customer.name}<br />
			{customer.address}<br />
			{customer.city}
		</div>
	);
}

var Mail = function(props, context) {
	return (
		<div>
			<Recipient />
			<div>Great discount today : {props.discount}</div>
		</div>
	);
);

var context: {
	customer = {
		name: "M. John Doe",
		address: "26 rue de Berri",
		city: "Paris"
	}
}

console.log(Careless.renderToString(<Mail discount="10%" />, context));
```
