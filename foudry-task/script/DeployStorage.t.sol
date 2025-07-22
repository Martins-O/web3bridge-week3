// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Storage} from "../src/Storage.sol";

contract DeploySimpleStorage is Script {
    function run() external returns (Storage) {
        vm.startBroadcast();
        Storage simpleStorage = new Storage();
        vm.stopBroadcast();
        return simpleStorage;
    }
}
