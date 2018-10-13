
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')

ipfs.util.addFromURL('http://ipfs.io/', (err, result) => {
    if (err) { throw err }
    console.log(result)
})

