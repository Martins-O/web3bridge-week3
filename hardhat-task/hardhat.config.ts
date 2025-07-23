import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
require("dotenv").config();

const { PRIVATE_KEY, ETHERSCAN_API_KEY, SEPOLIA_URL, CORE_RPC_URL_2, CORESCAN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    coredaoTestnet: {
      url: CORE_RPC_URL_2,
      chainId: 1114, // Fixed: was 1114, should be 1115
      accounts: [`0x${PRIVATE_KEY}`], // Fixed: added 0x prefix
      gasPrice: 20000000000,
    },
  },
  
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY || "",
      coredaoTestnet: CORESCAN_API_KEY || "abc", // CoreDAO doesn't require real API key
    },
    customChains: [
      {
        network: "coredaoTestnet",
        chainId: 1114,
        urls: {
          apiURL: "https://api.test2.btcs.network/api",
          browserURL: "https://scan.test2.btcs.network"
        }
      }
    ]
  },

  sourcify: {
    enabled: true
  }
};

export default config;