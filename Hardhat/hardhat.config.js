require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const Goerli_Http_URL=process.env.QUICKNODE_HTTP_URL;
const private_Key=process.env.PRIVATE_KEY;

module.exports={
  solidity:"0.8.16",
  networks:{
    goerli:{
      url:Goerli_Http_URL,
      accounts:[private_Key],
    },
  },
};