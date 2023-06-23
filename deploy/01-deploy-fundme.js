// import
// main function 
// calling main function 
// Traditionally above is the format of the deploy script, but in hardhat deploy some are changed
// Follow this github repo doc for detailed deploy understanding
// https://github.com/wighawag/hardhat-deploy#deploying-and-upgrading-proxies

const {networkConfig, developmentChains} = require("../helper-hardhat-config")
const { network, deployments } = require("hardhat");
const { verify } = require("../utils/Verify");

// If out local chain dosent have pricefeed or any other contract we use mock
// If the Contract doesn't, we deploy a minimal version for local testing

async function deployFunc({getNamedAccounts, deployments, getChainId}){

    let ethUsdPriceFeedAddress;
    // If the development chain is local or hardhat, we need to use Mock as pricefeed contract is not deployed on localChain
    if(developmentChains.includes(network.name)){
        // getting contract address
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    }
    else{
        // if PriceFeed contract already exists on chain
        ethUsdPriceFeedAddress = networkConfig[5]["ethUsdPriceFeed"];   
    }

    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId

    const fundMe = await deploy("FundMe",{
        from: deployer,
        log: true,
        args: [ethUsdPriceFeedAddress],
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    // if not a development chain
    if(!developmentChains.includes(network.name)){
        // verify
        await verify(fundMe.address,[ethUsdPriceFeedAddress]);
    }

    log("---------------------------------------");
}

module.exports.default = deployFunc;