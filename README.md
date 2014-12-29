Careless
========

A react fork for static XML generation


Example :

```js
var Careless = require('careless');

var PageSequence = function(props, context) {
	return (
		<fo:page-sequence master-reference="my-page">
			<fo:flow flow-name="xsl-region-body">
				<fo:block>{props.message}</fo:block>
			</fo:flow>
		</fo:page-sequence>
	);
};

var xslfo = (
	<fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
		<fo:layout-master-set>
			<fo:simple-page-master master-name="my-page">
				<fo:region-body margin="1in"/>
			</fo:simple-page-master>
		</fo:layout-master-set>

		<PageSequence message="Hello, world! Sample from renderx tutorial webpage" />
	</fo:root>
);

console.log(Careless.renderToString(xslfo, {}));
```
