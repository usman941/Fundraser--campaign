const CampaignFactory=require('./src/utils/CampaignFactory.json');
const {ethers}=require('ethers');
require('dotenv').config({path:'./.env.local'});

const main=async ()=>{
    // 1st setting provider using ethers.providers
    const provider=new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL // we are using enviorment variable so thats why we use process.env
    );
   // 2ndly we are initilize our contract 
    const contract=new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS, // giving address where we deployed our contract
        CampaignFactory.abi,
        provider
    );
    // 3rdly we calling our events from contract
    const getDeployedCampaign=contract.filters.campaignCreated(// campaignCreated is an event in our contract
        // passing arguments that we passes in contract event
        // only that arguments in which we use indexed keyword


    ); 
        let events=await contract.queryFilter(getDeployedCampaign);
        

}
