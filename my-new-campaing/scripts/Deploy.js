const hre=require('hardhat');

async function main(){
    //0xCD4b4f4bf5550255a6E02aAF704C5478c76a7e39
    // getContractFactory is a function that ethers.js gives us 
    // with the help of this fun we get contacts that exists in artifacts folder
    const CampaignFactory=await hre.ethers.getContractFactory("CampaignFactory"); 
    const campaignFactory=await CampaignFactory.deploy();

    await campaignFactory.deployed();

    console.log("factory deployed to :",campaignFactory.address);
}

main()
      .then(()=>process.exit(0))
      .catch((error)=>{
        console.log(error); // if any error will occur when we deploy then it will console
        process.exit(1);
    });