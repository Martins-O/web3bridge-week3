import { ethers } from "hardhat";

async function main() {
    console.log("Starting deployment...");
    
    // Get deployer account
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with account:", deployer.address);
    
    // Check deployer balance
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "CORE");
    
    // Deploy the contract
    console.log("Deploying Storage contract...");
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    
    // Wait for deployment
    await storage.waitForDeployment();
    
    // Get contract address (both methods work, but target is preferred)
    const contractAddress = storage.target;
    console.log("✅ Storage contract deployed to:", contractAddress);
    
    // Optional: Get deployment transaction details
    const deploymentTx = storage.deploymentTransaction();
    if (deploymentTx) {
        console.log("Transaction hash:", deploymentTx.hash);
        console.log("Gas used:", deploymentTx.gasLimit?.toString());
    }
    
    // Verify the deployment by calling a contract function (if applicable)
    try {
        // Example: if your Storage contract has a getter function
        // const initialValue = await storage.retrieve();
        // console.log("Initial storage value:", initialValue.toString());
    } catch (error) {
        console.log("Note: Could not verify contract state (normal if no getter functions)");
    }
    
    console.log("\n📋 Deployment Summary:");
    console.log("Contract Address:", contractAddress);
    console.log("Network:", (await ethers.provider.getNetwork()).name);
    console.log("Deployer:", deployer.address);
}

main()
    .then(() => {
        console.log("\n🎉 Deployment completed successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("\n❌ Deployment failed:");
        console.error(error);
        process.exit(1);
    });