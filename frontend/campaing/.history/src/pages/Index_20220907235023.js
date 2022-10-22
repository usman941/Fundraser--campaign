import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import  AccountBox  from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import dog1 from '../Images/dog1.jpg';
import dog2 from '../Images/dog2.jpg';
import dog3 from '../Images/dog3.jpg';
import CampaignFactory from '../utils/CampaignFactory.json';
import { ethers } from 'ethers';
// require('dotenv').config();
const Index = () => {
    const [allData,setAllData]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        const loadCampaign=async ()=>
        {
            const provider=new ethers.providers.JsonRpcProvider(
                "https://polygon-mumbai.g.alchemy.com/v2/la-zlvPjvKYKidlxY4Mf6jkMqDFaDgbY"
            );
            const contract=new ethers.Contract(
                "0xCD4b4f4bf5550255a6E02aAF704C5478c76a7e39",
                CampaignFactory.abi,
                provider
            );
            setLoading(true);
            const getAllCampaigns=contract.filters.campaignCreated();
            const AllCampains=await contract.queryFilter(getAllCampaigns);
            console.log(AllCampains);   
            setAllData(AllCampains);
            setLoading(false);
            const getHealthCampaigns=contract.filters.campaignCreated();
            const HealthCampaigns=await contract.queryFilter(getHealthCampaigns);
            const HealthData=HealthCampaigns.map((e)=>{
                return(
                    
                )
            })
        }
        loadCampaign();
    },[]);
    if(loading==true)
    {
        return 'Loading';
    }
  return (
    <>
    <HomeWrapper>
        {/* Filter Section */}
        <FilterWrapper>
        <FilterAltIcon style={{fontSize:40}}/>
        <Category>Health</Category>
        <Category>Education</Category>
        <Category>Animal</Category>
        </FilterWrapper>
        {/* Cards Container */}
        <div className='CardWrapper'>
        
            {/* Cards */}
            <Card>
                <CardImg>
                    <img height="100%" width="100%"
                        layout='fill' 

                        src={dog2} 
                        />
                </CardImg>
                <Title>
                    Treatment for my Dog
                </Title>
                <CardData>
                    <Text>Owner<AccountBox/></Text>
                    <Text>0xc578...F25</Text>

                </CardData>
                <CardData>
                    <Text>Amount<PaidIcon/></Text>
                    <Text>100 Matic</Text>
                </CardData>
                <CardData>
                    <Text><EventIcon/></Text>
                    <Text>07/09/2022,11:17:00 AM</Text>
                </CardData>
                <Button>
                    Go to Campaign
                </Button>
            </Card>

        </div>
       
        
    </HomeWrapper>    
    
    </>
  )
}

 

const HomeWrapper=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`
const FilterWrapper=styled.div`
display: flex;
align-items: center;
width: 80%;
margin-top: 15px;
`

const Category=styled.div`
padding:10px 15px;
background-color: ${(props)=>props.theme.bgDiv};
margin: 0 15px;
border-radius: 8px;
font-family: 'poppins';
font-weight: normal;
cursor: pointer;
`
const Card=styled.div`
width: 100%;
margin-top: 20px;

background-color: ${(props)=>props.theme.bgDiv};
&:hover{
    transform: translateY(-20px);
    transition: transform 0.5s;
}
&:not(:hover)
{
    transition: transform 0.5s;
}
`

const CardImg=styled.div`
    position: relative;
    height: 200px;
    width: 300px;
    background-color: gray;
    
`

const Title=styled.h2`
    font-family: 'Roboto';
    font-size: 18px;
    margin: 2px 0px;
    background-color: ${(props)=>props.theme.bgSubDiv};
    padding: 5px;
    cursor: pointer;
    font-weight: normal;
`
const Button=styled.button`
padding: 8px;
text-align: center;
width: 100%;
background-color: #00b712;
background-image: linear-gradient(
    180deg,#00b712 0%,#5aff15 80%
);
cursor: pointer;
font-family: 'Roboto';
text-transform: uppercase;
color: #fff;
font-size: 14px;
font-weight: bold;
`
const CardData=styled.div`
display: flex;
justify-content: space-between;
margin: 2px 0px;
background-image: ${(props)=>props.theme.bgSubDiv};
padding: 5px;
cursor: pointer;
`
const Text=styled.p`
    display: flex;
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-family: 'Roboto';
    font-weight: bold;
`

export default Index