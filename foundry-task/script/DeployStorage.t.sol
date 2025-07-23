// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {Storage} from "../src/Storage.sol";

contract DeployScript is Script {
    Storage public storageContract;

    function setUp() public {}

    function run() public {
        // Get deployer private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        uint256 balanceBefore = deployer.balance;
        console.log("=== Pre-Deployment Info ===");
        console.log("Deployer address:", deployer);
        console.log("Balance before deployment:", balanceBefore / 1e18, "CORE");
        console.log("Balance before (wei):", balanceBefore);

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the contract
        console.log("Deploying Storage contract...");
        storageContract = new Storage();

        console.log("Storage contract deployed to:", address(storageContract));
        console.log(
            "Transaction hash:",
            vm.getRecordedLogs().length > 0 ? "Check explorer" : "N/A"
        );

        // Verify deployment by calling a function
        uint256 initialNumber = storageContract.retrieve();
        // string memory initialMessage = storageContract.getMessage(); // Removed because getMessage() does not exist

        console.log("Initial number:", initialNumber);
        // console.log("Initial message:", initialMessage); // Removed because getMessage() does not exist
        vm.stopBroadcast();

        // Log deployment summary
        console.log("\n=== Deployment Summary ===");
        console.log("Contract Address:", address(storageContract));
        console.log("Deployer:", vm.addr(deployerPrivateKey));
        console.log("Network: CoreDAO Testnet");
        console.log(
            "Explorer: https://scan.test.btcs.network/address/%s",
            address(storageContract)
        );
    }
}
