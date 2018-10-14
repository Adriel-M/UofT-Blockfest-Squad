var webPage = require('webpage');
var page = webPage.create();

page.open('http://google.com', function(status) {

  var title = page.evaluate(function() {
    var imgs = document.getElementsByTagName("img");
    var imgSrcs = [];

    for (var i = 0; i < imgs.length; i++) {
        imgSrcs.push(imgs[i].src);
    }

    return imgSrcs;
  });

  console.log(title);
  phantom.exit();

});
