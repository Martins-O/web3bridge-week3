import {ethers} from "hardhat";

async function main() {
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    await storage.waitForDeployment();

    console.log("Storage contract deployed to:", storage.target);

    const address = await storage.getAddress();
    console.log("Storage address:", address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });