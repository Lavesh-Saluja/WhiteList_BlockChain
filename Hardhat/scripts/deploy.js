// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log(
//     `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const { ethers } = require("hardhat");
async function main(){
  //Step 1: Telling That we are going to deploy this smart contract
  const contract=await ethers.getContractFactory("WhiteList");

  //Step 2:
  const deployedContract=await contract.deploy(10);
  await deployedContract.deployed();

  //step 3: printing Contract address
  console.log('------------------------------------');
  console.log("WhiteList Contarct Address: "+deployedContract.address);//0x15a307230FCD22a900954bDc790792e775fCBEaC
  console.log('------------------------------------');

}

main().then(()=> process.exit(0))
.catch((error)=>{console.log(error);
                  process.exit(1);});



























