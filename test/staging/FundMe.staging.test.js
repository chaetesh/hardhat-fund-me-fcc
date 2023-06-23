const { getNamedAccounts, ethers, network } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert } = require("chai");

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async () => {
        let fundMe;
        let deployer;
        let dep;
        const sendValue = ethers.utils.parseEther("1");
        beforeEach(async ()=>{
            deployer = (await getNamedAccounts()).deployer;
            fundMe = await ethers.getContractAt(
              "FundMe",
              "0x3e03e52eC66B83Cdcf8D8e9baE8434196532489F",
              "0x6139F737Dc39a3ec031dc4831D92cC9881C710a9",
            );
            console.log(await fundMe.getPriceFeed());
        })

        it("allows people to fund and withdraw", async ()=>{
            await dep.fund({value: sendValue});
            await dep.withdraw();
            const endingBalance = await dep.provider.getBalance(dep.address);
            assert(endingBalance,"0");
        })
  });
