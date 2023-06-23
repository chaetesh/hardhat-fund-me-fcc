require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.8",
  // If we want to use mulitple solidity versions in different contracts
  solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/lFlEqs4A-_jmelDXJeTXPhDK15PBnFL9",
      accounts: [
        "0x36e81a7c346508f7f67acff5338dec1c50b7d3953e0832e61f5f9b2b354d412c",
      ],
      blockConfirmations: 6,
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts hardhat will place by default when running hardhat on localhost
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  etherscan: {
    apiKey: "Y1KDYSC31H5GJGDGRMUTEP1BT4FF1NDHGX",
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    coinmarketcap: "1b944536-a5ba-4c34-a787-53910214761b",
    token: "matic",
  },
};
