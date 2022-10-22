require( '@nomiclabs/hardhat-waffle');
require('dotenv').config({path:'./.env.local'});
task("accounts","prints the list of accounts",async (taskArgs,hre)=>{// accounts is an key or task 
  const accounts=await hre.ethers.getSigners();

  for(const account of accounts){
    console.log(account.address);
  }
});

const privatekey=process.env.NEXT_PUBLIC_PRIVATE_KEY;
module.exports={
  solidity:"0.8.10",
  defaultNetwork:"polygon",
  networks:{
    hardhat:{},
    polygon:{ // defining polygon network
      url:process.env.NEXT_PUBLIC_RPC_URL,
      accounts:[privatekey]
    }
  }
}
