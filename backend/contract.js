const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const secrets = require('../exporter/secrets');

const provider = new HDWalletProvider(
    secrets.wallet,
    secrets.infuraApi,
);

const web3 = new Web3(provider);

const address = '0x111659BA0A2713dAe97a5D05ec1A0C934b47879D'

const abi = [
    {
        "constant":false,
        "inputs":[{"name":"sourceAddress","type":"address"}, {"name":"url","type":"string"},{"name":"index","type":"uint256"}],
        "name":"getEntryOfSiteTime",
        "outputs":[{"name":"","type":"uint64"}],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[{"name":"sourceAddress","type":"address"},{"name":"url","type":"string"}],
        "name":"getNumberOfEntriesForSite",
        "outputs":[{"name":"","type":"uint256"}],
        "payable":false,"stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[],
        "name":"owner",
        "outputs":[{"name":"","type":"address"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[{"name":"sourceAddress","type":"address"},{"name":"url","type":"string"},{"name":"index","type":"uint256"}],
        "name":"getEntryOfSiteLocation",
        "outputs":[{"name":"","type":"string"}],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[{"name":"url","type":"string"},{"name":"_time","type":"uint64"},{"name":"_ipfsLocation","type":"string"}],
        "name":"addEntry",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"constructor"
    }
]

export default new web3.eth.Contract(abi, address);