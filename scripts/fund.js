// We can run local node, and then run each scripts to execute their functions
const {getNamedAccounts, ethers} = require("hardhat");

async function main(){
    const {deployer} = await getNamedAccounts();
    const fundMe = await ethers.getContract("FundMe",deployer);
    console.log("Funding Contract......");
    const transactionResponse = await fundMe.fund({value:ethers.utils.parseEther("0.1")});
    await transactionResponse.wait(1);
    console.log("Funded");
}