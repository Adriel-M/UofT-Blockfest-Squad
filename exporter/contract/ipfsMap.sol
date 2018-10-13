pragma solidity ^0.4.7;

contract ipfsMap {
    struct ipfsEntry {
            uint64 time;
            string ipfsLocation;
        }
    address public owner;

    mapping(address => mapping(string => ipfsEntry[])) ipfsEntries;

    constructor() public {
            owner = msg.sender;
    }

    function addEntry(string url, uint64 _time, string _ipfsLocation) public {
        ipfsEntries[msg.sender][url].push(ipfsEntry({
            time: _time,
            ipfsLocation: _ipfsLocation
        }));
    }

    function getNumberOfEntriesForSite(address sourceAddress, string url) public returns (uint) {
            return ipfsEntries[sourceAddress][url].length;
    }

    function getEntryOfSiteTime(address sourceAddress, string url, uint index) public returns (uint64) {
            return ipfsEntries[sourceAddress][url][index].time;
    }

    function getEntryOfSiteLocation(address sourceAddress, string url, uint index) public returns (string) {
            return ipfsEntries[sourceAddress][url][index].ipfsLocation;
    }
}

