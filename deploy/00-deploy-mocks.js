const { network } = require("hardhat");
const { developmentChains, DECIMALS, INITIAL_ANSWER} = require("../helper-hardhat-config");

// If out local chain dosent have pricefeed or any other contract we use mock
// If the Contract doesn't, we deploy a minimal version for local testing

// by default all these arguments are passed to deploy func by hardhat
module.exports = async ({getNamedAccounts, deployments, getChainId})=>{
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();

    // when going for localhost or hardhat network we want to use a mock as priceFeed contract is not deployed

    // args include arguments for constructor
    if(developmentChains.includes(network.name)){
        log("Local network detected! Deploying Mocks....");
        await deploy("MockV3Aggregator",{
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS,INITIAL_ANSWER]
        })
        log("Mocks deployed!")
        log("---------------------------------------");
    }
}

module.exports.tags = ["all","mocks"];