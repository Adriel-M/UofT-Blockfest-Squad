const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let ipfsmap;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    ipfsmap = await new web3.eth.Contract(JSON.parse(interface))
                .deploy({
                    data: bytecode,
                    arguments: []
                })
                .send({
                    from: accounts[0],
                    gas: '1000000',
                });
});

describe('IpfsMap', () => {
    it('deploys a contract', () => {
        assert.ok(ipfsmap.options.address);
    });

    it('should be able to add an entry', async () => {
        await ipfsmap.methods.addEntry('google.com', 1000000, 'location1').send({
            from: accounts[0]
        });
        const numEntries = await ipfsmap.methods.getNumberOfEntriesForSite(accounts[0], 'google.com').call();
        assert.equal(numEntries, 1);
        const savedTime = await ipfsmap.methods.getEntryOfSiteTime(accounts[0], 'google.com', 0).call();
        const savedLocation = await ipfsmap.methods.getEntryOfSiteLocation(accounts[0], 'google.com', 0).call();
        assert.equal(savedTime, 1000000);
        assert.equal(savedLocation, 'location1');
    });
});

