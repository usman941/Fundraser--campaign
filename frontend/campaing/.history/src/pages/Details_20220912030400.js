import React from "react";
import styled from "styled-components";
import children1 from "../Images/children1.PNG";
import { ethers } from "ethers";
import CampaignFactory from '../utils/CampaignFactory.json'
import Campaign from '../utils/Campaing.json'
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
const Details = () => {
  const[amount,setAmount]=useState(0);
  const[change,setChange]=useState(false);
  const[doner,setDoner]=useState([]);

  let {address}=useParams();
console.log(address);
  useEffect(()=>{
    const loadDonation=async ()=>{
      setChange(true);
      const provider=new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/la-zlvPjvKYKidlxY4Mf6jkMqDFaDgbY"
      );
      const contract=new ethers.Contract(
        address,
        Campaign.abi,
        provider
      );
      const getAllCampaigns=contract.filters.donated();
      const AllCampains=await contract.queryFilter(getAllCampaigns);
      setDoner(AllCampains);
      setChange(false);
      console.log(AllCampains);
    }
    loadDonation();
  },[]);
  
  const DonateFunds=async (e)=>{
    e.preventDefault();
    try{
      setChange(true);
      await window.ethereum.request({method:'eth_requestAccounts'});
      const provider=new ethers.providers.Web3Provider(window.ethereum);
      const signer=provider.getSigner();
      const contract=new ethers.Contract(address,Campaign.abi,signer);
      const transation=await contract.donate();
    }catch(){

    }
  }
  return (
    <>
      <DetailsWrapper>
        <LeftContainer>
          <ImageSection>
            <img layout="fill" src={children1} />
          </ImageSection>
          <Text>
            We’re continually impressed and grateful for people’s fundraising
            activities for The Listening Place, which range from hikes, to
            artwork, to baking. We’ve collated a collection of stories of some
            of our previous community fundraisers, so that you can read all
            about their experiences in their own words.
          </Text>
        </LeftContainer>
        <RightContainer>
          <Title>Children's Cancer</Title>
          <DonateSection>
            <Input type="number" placeholder="Enter Amount To Donate" />
            <Donate>Donate</Donate>
          </DonateSection>
          <FundsData>
            <Funds>
              <FundsText>Required Amount</FundsText>
              <FundsText>100 Matics</FundsText>
            </Funds>
            <Funds>
              <FundsText>Received Amount</FundsText>
              <FundsText>60 Matics</FundsText>
            </Funds>
          </FundsData>
          <Donated>
            <LiveDonation>
              <DonationTitle>Recent Donation</DonationTitle>
              <Donation>
                <DonationData>0xc53...E27</DonationData>
                <DonationData>100 Matic</DonationData>
                <DonationData>3/13/2022,11:21:50 AM</DonationData>
              </Donation>
            
            </LiveDonation>
            <MyDonation>
              <DonationTitle>My Past Donation</DonationTitle>
              <Donation>
                <DonationData>0xc53...E27</DonationData>
                <DonationData>100 Matic</DonationData>
                <DonationData>3/13/2022,11:21:50 AM</DonationData>
              </Donation>
            </MyDonation>
          </Donated>
        </RightContainer>
      </DetailsWrapper>
    </>
  );
};

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 98%;
`;
const LeftContainer = styled.div`
  width: 45%;
`;
const RightContainer = styled.div`
  width: 50%;
`;
const ImageSection = styled.div`
  width: 100%;
  position: relative;
  height: 350px;
`;
const Text = styled.p`
  font-family: "Roboto";
  font-size: large;
  color: ${(props) => props.theme.color};
  text-align: justify;
`;
const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-family: "poppins";
  font-size: x-large;
  color: ${(props) => props.theme.color};
`;
const DonateSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const Input = styled.input`
  padding: 8px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 40%;
  height: 40%;
`;
const Donate = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  width: 40%;
  padding: 15px;
  color: white;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  cursor: pointer;
  font-weight: bold;
  border-radius: 8px;
  font-size: large;
`;
const FundsData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const Funds = styled.div`
  width: 45%;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 8px;
  border-radius: 8px;
  text-align: center;
`;
const FundsText = styled.p`
  margin: 2px;
  padding: 0;
  font-family: "poppians";
  font-size: normal;
`;
const Donated = styled.div`
  height: 280px;
  margin-top: 15px;
  background-color: ${(props) => props.theme.bgDiv};
`;
const LiveDonation = styled.div`
  height: 65%;
  overflow-y: auto;
`;
const MyDonation = styled.div`
  height: 35%;
  overflow-y: auto;
`;
const DonationTitle = styled.div`
  font-family: "Roboto";
  font-size: x-small;
  text-transform: uppercase;
  padding: 4px;
  text-align: center;
  background-color: #4cd137;
`;
const Donation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  background-color: ${(props) => props.theme.bgSubDiv};

  padding: 4px 8px;
`;
const DonationData = styled.p`
  color: ${(props) => props.theme.color};
  font-family: "Roboto";
  font-size: large;
  margin: 0;
  padding: 0;
`;

export default Details;
