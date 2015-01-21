var path = require('path');
var Careless = require('careless');
var Salted = require('careless-salted');

var main = function() {

  var usedResources = [];
  var resourceFinder = function(...pathTokens) {
    var fullPath = path.join.apply(null, pathTokens);
    usedResources.push(path.relative(__dirname, fullPath));
    return fullPath;
  };

  var customerContext = {

  };

  var pos = -1;
  var Mail = (
    <Salted.Layout title="Sample mail using Litmus Salted email layout">

      <Salted.Header>Sample mail using <a href="https://litmus.com/" target="_blank">Litmus</a> email layout</Salted.Header>

      <Salted.OneCol pos={pos++}>
        <Salted.OneCol.Hero alt="Your hero image here !" />
        <Salted.OneCol.Content title="Yes. Email can be responsive, too.">
          Using fluid structures, fluid images, and media queries, we can make email (nearly) as responsive as modern websites.
        </Salted.OneCol.Content>
        <Salted.Button href={"https://github.com/HenriJ/careless"}>Go Careless !</Salted.Button>
      </Salted.OneCol>

      <Salted.OneColBottomImg pos={pos++} />

      <Salted.TwoCol pos={pos++} />

      <Salted.CompactArticle pos={pos++} />

      <Salted.Footer />
    </Salted.Layout>
  );

  return {
    html: Careless.renderToString(Mail, customerContext, resourceFinder),
    resources: usedResources
  }
};

var output = main();
process.stderr.write("Used resources : " + output.resources.join(', '));
process.stdout.write(output.html);
