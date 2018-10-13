const path = require('path');
const fs = require('fs');
const solc = require('solc');

const ipfsMapPath = path.resolve(__dirname, 'contract', 'IpfsMap.sol');
const source = fs.readFileSync(ipfsMapPath, 'utf-8');

module.exports = solc.compile(source, 1).contracts[':IpfsMap'];

