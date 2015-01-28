var path = require('path');
var Careless = require('careless');
var Salted = require('careless-salted');

var generateArticles = function(res) {
  var Articles = [];

  var colors = ["#F6BB42", "#5D9CEC", "#4FC1E9"];
  var imgs = ["litmus-logo.jpg", "mailchimp-logo.jpg", "campaign-monitor-logo.jpg"];

  for (var i = 0; i < 3; i++) {
    Articles.push(
      <Salted.CompactArticles.Article
        meta="A meta description"
        title={"The title of your article n°" + i}
        img={res(__dirname, "node_modules/careless-salted/img", imgs[Math.floor(Math.random()*imgs.length)])}
        imgAlt="">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisi iaculis, iaculis metus at, auctor arcu. Cras ac posuere neque, efficitur venenatis massa.
      </Salted.CompactArticles.Article>
    )
  }

  return Articles;
};

var Mail = function(props, context, res) {
  var pos = -1;

  return (
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

      <Salted.CompactArticles pos={pos++} title="List of articles">
        {generateArticles(res)}
      </Salted.CompactArticles>

      <Salted.Footer
        address="1234 Main Street, Anywhere, MA 01234, USA"
        unsubscribe="Unsubscribe" unsubscribeHref=""
        viewInBrowser="View this email in your browser" viewInBrowserHref=""
      />
    </Salted.Layout>
  );
};

var main = function() {

  var usedResources = [];
  var resourceFinder = function(...pathTokens) {
    var fullPath = path.join.apply(null, pathTokens);
    var relPath = path.relative(__dirname, fullPath);
    if (usedResources.indexOf(relPath) === -1) {
      usedResources.push(relPath);
    }
    return fullPath;
  };

  var customerContext = {

  };

  return {
    html: Careless.renderToString(<Mail />, customerContext, resourceFinder),
    resources: usedResources
  }
};

var output = main();
process.stderr.write("Used resources : " + output.resources.join(', '));
process.stdout.write(output.html);
