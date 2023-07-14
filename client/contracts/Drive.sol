// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Drive {
    struct share {
        address sharedBy;
        string url;
    }

    struct file {
        string[] own;
        mapping (string => address[]) access;
        share[] shared;
    }
    event fileAdded(string[] url);
    mapping (string => address) public access;
    mapping (address => file) record;


    function addOwn(string memory url) public {
        (record[msg.sender].own).push(url);
        record[msg.sender].access[url].push(msg.sender);
        access[url] = msg.sender;
    }

    function grantAccess( address sharedWith, string memory url) public {
        if (access[url] == msg.sender) {
            (record[sharedWith].shared).push(share(msg.sender, url));
            (record[msg.sender].access[url]).push(sharedWith);
        }
        else{
            revert("You are not the owner of this file");
        }
    }

    function ownDisplay(address user) public view returns(string[] memory) {
        return record[user].own;
    }

    function sharedDisplay(address user) public view returns(share[] memory) {
        return record[user].shared;
    }

    function revokeAccess(address sharedWith, string memory url) public {
        if(sharedWith == msg.sender){
            revert("You cannot revoke access from yourself");
        }
        if (access[url] == msg.sender) {
            for (uint i = 0; i < record[sharedWith].shared.length; i++) {
                if (keccak256(abi.encodePacked(record[sharedWith].shared[i].url)) == keccak256(abi.encodePacked(url))) {
                    delete record[sharedWith].shared[i];
                }
            }
            for (uint i = 0; i < record[msg.sender].access[url].length; i++) {
                if (record[msg.sender].access[url][i] == sharedWith) {
                    delete record[msg.sender].access[url][i];
                }
            }
        }
        else{
            revert("You are not the owner of this file");
        }
    }
    function deletePic(string memory url) public {
        if (access[url] == msg.sender) {
            
            for (uint i = 0; i < record[msg.sender].own.length; i++) {
                if (keccak256(abi.encodePacked(record[msg.sender].own[i])) == keccak256(abi.encodePacked(url))) {
                    delete record[msg.sender].own[i];
                }
            }
            for (uint i = 0; i < record[msg.sender].access[url].length; i++) {
                for (uint j=0;j < record[record[msg.sender].access[url][i]].shared.length;j++)
                {
                    if(keccak256(abi.encodePacked(record[record[msg.sender].access[url][i]].shared[j].url)) == keccak256(abi.encodePacked(url)))
                    {
                        delete record[record[msg.sender].access[url][i]].shared[j];
                    }
                }
            }
            delete record[msg.sender].access[url];
        }
        else{
            revert("You are not the owner of this file");
        }
    }
    function accessDisplay(string memory url) public view returns(address[] memory) {
        return record[msg.sender].access[url];
    }
}
