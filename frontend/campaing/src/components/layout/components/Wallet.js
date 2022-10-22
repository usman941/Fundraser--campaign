import React, { useState } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers';
const networks={ // defining network
    polygon:{
        chainId:`0x${Number(80001).toString(16)}`,
        chainName:"polygon Testnet",
        nativeCurrency:{
            name:"MATIC",
            symbol:"MATIC",
            decimals:18
        },
        rpcUrls:["https://rpc-mumbai.maticvigil.com/"],
        blockExplorerUrls:["https://mumbai.polygonscan.com/"]
    }
}
const Wallet = () => {
    const[address,setAddress]=useState('');
    const[balance,setBalance]=useState('');
    
    const connectWallet=async ()=>{
        // ethereum is an web3 provider
        await window.ethereum.request({method:"eth_requestAccounts"}) // using this method we will authenticate our metamask to with our project
        const provider=new ethers.providers.Web3Provider(window.ethereum,"any");
        if(provider.network!='matic')
        {
            await window.ethereum.request({
                method:'wallet_addEthereumChain',
                params:[
                    {
                        ...networks['polygon']
                    }
                ]
            })
            const account=provider.getSigner(); // getsigner use for the ethers
            const Address= await account.getAddress();
            setAddress(Address);
            const Balance=ethers.utils.formatEther( await account.getBalance());
            setBalance(Balance);
        }
       
    }
  return (
    <>
    <ConnectWallentWrapper 
    onClick={connectWallet}>
        {balance==''?<BalanceWrapper></BalanceWrapper>:
        <BalanceWrapper>{balance.slice(0,4)} Matic</BalanceWrapper>}
       {address==''? <AddressWrapper>Connect Wallet</AddressWrapper>:<AddressWrapper>
        {address.slice(0,6)}...{address.slice(39)}</AddressWrapper>}
        
        </ConnectWallentWrapper>
    </>
  )
}
const ConnectWallentWrapper=styled.div`
display: flex;
justify-content: space-between;
align-items: center;
background-color: ${(props)=>props.theme.bgDiv};
padding:0 9px;
height: 100%;
color:${(props)=>props.theme.color};
border-radius:10px;
margin-right: 15px;
font-family: 'Roboto';
font-weight: bold;
font-size: small;
`
const AddressWrapper=styled.h2`
background-color: ${(props)=>props.theme.bgSubDiv};
height: 80%;
display: flex;
align-items: center;
border-radius: 10px;
justify-content: center;
padding: 0 5px 0 5px;
`
const BalanceWrapper=styled.h2`
display: flex;
align-items: center;
justify-content: center;
height: 100%;

margin-right: 15px;
`
export default Wallet