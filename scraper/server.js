const dateTime = require('node-datetime');
const express = require('express');
const contract = require('./contract')
var bodyParser = require('body-parser')
const secrets = require('./secrets');

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const provider = new HDWalletProvider(
    secrets.wallet,
    secrets.infuraApi,
);
const web3 = new Web3(provider);

const app = express();
var router = express.Router();

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/', router);

router.route('/scrape')
    .post(function(req, res) {
        const urlToScrape = req.body.url;
        console.log(urlToScrape)
        ipfs.util.addFromURL(urlToScrape, async function(err, result) {
            accounts = await web3.eth.getAccounts();

            console.log(result)
            const ipfsHash = result[0].hash;
            res.send(ipfsHash);
            let dt = dateTime.create();
            let response = await contract.methods.addEntry(urlToScrape, dt.epoch(), ipfsHash).send({
                from: accounts[0],
                gas: '1000000',
            });
        });
    });

app.listen(3002, () => console.log("Scraper listening to 3002"))
