require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ["0x+privateKey"]
    },
    sphinx: {
      url: "https://dapps.shardeum.org/",
      chainId: 8081,
      accounts: ['0x+privateKey'],
    },
  },
  paths: {
    artifacts: "./frontend/src/artifacts",
  },
};