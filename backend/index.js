var dateTime = require('node-datetime');
const express = require('express');
const _ = require('lodash');
const contract = require('./contract');
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')


app.get('/', (req, res) => {
    res.send('Definitely not archive.org home page');
});

app.use('/', router);

router.route('/explore')
    .post(async function(req, res) {
            url = req.body.url;
            accounts = await web3.eth.getAccounts();
            console.log("Starting connection with blockchain to retrieve " + url)
            console.log("Account used: " + accounts)
            const numEntries = await contract.methods.getNumberOfEntriesForSite(accounts[0], url).call({
                from: accounts[0],
                gas: '1000000',
            });
            console.log(numEntries)
            snaps = []
            for(i = 0; i < numEntries; i++) {
                time = await contract.methods.getEntryOfSiteTime(accounts[0], url, i).call({
                    from: accounts[0],
                    gas: '1000000',
                });
                ipfs = await contract.methods.getEntryOfSiteLocation(accounts[0], url, i).call({
                    from: accounts[0],
                    gas: '1000000',
                });
                console.log(time)
                console.log(ipfs)
                snaps.push({"time":time, "ipfs":ipfs})
            }
            _.orderBy(snaps, ['time'], ['desc']);
            console.log(snaps)
            res.send(snaps)
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

router.route('/address/:address_id')
    .get(function(req, res) {
        ipfs.files.cat(req.params.address_id, function (err, file) {
            if (err) {
              throw err
            }
            res.end(file);
        
          })

    })


app.listen(3000, () => console.log('App listening to 3000'));