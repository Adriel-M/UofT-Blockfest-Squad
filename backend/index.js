var dateTime = require('node-datetime');
const express = require('express');
const app = express();
var router = express.Router();

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')


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
        ipfs.util.addFromFs('testFolder', { recursive: true }, (err, result) => {
            if (err) { throw err }
            console.log(result)
        })
        
        var dt = dateTime.create();
        var time = dt.format('Y-m-d H:M:S');
        res.send('Finished Scraping ' + req.params.url + ' at time ' + time.toString())
    });

router.route('/example')
    .get(function(req,res) {
        ipfs.files.cat("Qmcy3yKqNiEVxX9C5jhsLZw3h1QaEtQwbh6EXh4kxvUmW2" + "/index.html", function (err, file) {
            if (err) {
              throw err
            }
            console.log(file.toString('utf8'));
            res.end(file.toString('utf8'));
        
          })
        
    })

router.route('/address/:address_id/:file')
    .get(function(req, res) {
        req.file = req.file || 'index.html';
        ipfs.files.cat(`${req.params.address_id}/${req.params.file}`, function (err, file) {
            if (err) {
              throw err
            }
            res.end(file);
        
          })

    })


app.listen(3000, () => console.log('App listening to 3000'));