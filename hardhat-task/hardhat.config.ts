import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config()

const {PRIVATE_KEY, ETHERSCAN_API_KEY, SEPOLIA_URL, CORE_RPC_URL_2} = process.env;
const sep = String(ETHERSCAN_API_KEY)

const config: HardhatUserConfig = {
  solidity: "0.8.28",

  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    coredaoTestnet: {
      url: CORE_RPC_URL_2,
      chainId: 1114,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
};

export default config;
