const dateTime = require('node-datetime');
const IpfsMap = require('./IpfsMap');
const express = require('express');
const app = express();
var router = express.Router();

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')

app.use('/', router);

router.route('scrape')
    .post(function(req, res) {
        const urlToScrape = req.body.url;
        ipfs.util.addFromURL(urlToScrape, function(err, result) {
            const ipfsHash = result[0].hash;
            res.send(ipfsHash);
            let dt = dateTime.create();
            IpfsMap.methods.addEntry(urlToScrape, dt.epoch(), ipfsHash);
        })
    })

