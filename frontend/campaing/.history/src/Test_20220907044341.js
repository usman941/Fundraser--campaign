const CampaignFactory=require('./src/utils/CampaignFactory.json');
const {ethers}=require('ethers');
require('dotenv').config({path:'./.env.local'});

const main=async ()=>{
    const provider=new ethers.providers.JsonRpcProvider(
        process.env
    )
}
