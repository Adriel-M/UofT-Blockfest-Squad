var dateTime = require('node-datetime');
const express = require('express');
const app = express();
var router = express.Router();

app.get('/', (req, res) => {
    res.send('Definitely not archive.org home page');
});


app.use('/', router);

router.route('/explore/:id')
    .get(function(req, res) {
        res.send('Looking for ' + req.params.id)
    });


router.route('/scrape/:url')
    .post(function(req, res) {
        var dt = dateTime.create();
        var time = dt.format('Y-m-d H:M:S');
        res.send('Finished Scraping ' + req.params.url + ' at time ' + time.toString())
    });


app.listen(3000, () => console.log('App listening to 3000'));