import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountBox from "@mui/icons-material/AccountBox";
import PaidIcon from "@mui/icons-material/Paid";
import EventIcon from "@mui/icons-material/Event";
import dog1 from "../Images/dog1.jpg";
import dog2 from "../Images/dog2.jpg";
import dog3 from "../Images/dog3.jpg";
import CampaignFactory from "../utils/CampaignFactory.json";
import { ethers } from "ethers";
// require('dotenv').config();
const Index = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [HealthDataState, setHealthDataState] = useState([]);
  const [EducationDataState, setEducationDataState] = useState([]);
  const [AnimalDataState, setAnimalDataState] = useState([]);
  const [category, setMyCategory] = useState(0);

  useEffect(() => {
    const loadCampaign = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/la-zlvPjvKYKidlxY4Mf6jkMqDFaDgbY"
      );
      const contract = new ethers.Contract(
        "0xCD4b4f4bf5550255a6E02aAF704C5478c76a7e39",
        CampaignFactory.abi,
        provider
      );
      setLoading(true);
      const getAllCampaigns = contract.filters.campaignCreated();
      const AllCampains = await contract.queryFilter(getAllCampaigns);
      console.log("All Data campains:", AllCampains);
      setAllData(AllCampains);

      const getHealthCampaigns = contract.filters.campaignCreated(
        null,
        null,
        null,
        null,
        null,
        null,
        "health"
      );
      const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
      console.log("Health Data campains:", HealthCampaigns);
      setHealthDataState(HealthCampaigns);
      // const HealthData=HealthCampaigns.map((e)=>{
      //     return{
      //         title:e.args.title,
      //         image:e.args.imgURI,
      //         owner:e.args.owner,
      //         timeStamp:e.args.timestamp,

      //     }
      // });
      // console.log("Health Campains",HealthData);

      const getEducationCampaigns = contract.filters.campaignCreated(
        null,
        null,
        null,
        null,
        null,
        null,
        "Education"
      );
      const EducationCampaigns = await contract.queryFilter(
        getEducationCampaigns
      );
      console.log("Education Data campains:", EducationCampaigns);
      setEducationDataState(EducationCampaigns);
      // const EducationData=EducationCampaigns.map((e)=>{
      //     return{
      //         title:e.args.title,
      //         image:e.args.imgURI,
      //         owner:e.args.owner,
      //         timeStamp:e.args.timestamp,

      //     }
      // });
      // console.log("Education Campains",EducationData);

      const getAnimalCampaigns = contract.filters.campaignCreated(
        null,
        null,
        null,
        null,
        null,
        null,
        "Animal"
      );
      const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
      console.log("Animal Data campains:", AnimalCampaigns);
      setAnimalDataState(AnimalCampaigns);
      // const AnimalData=AnimalCampaigns.map((e)=>{
      //     return{
      //         title:e.args.title,
      //         image:e.args.imgURI,
      //         owner:e.args.owner,
      //         timeStamp:e.args.timestamp,

      //     }
      // });
      // console.log("Animal Campains",AnimalData);
      setLoading(false);
    };
    loadCampaign();
  }, []);
  if (loading == true) {
    return "Loading";
  }

  const settingupcategory = (i) => {
    setMyCategory(i);
    console.log("hi usman", category);
    if(category==1)
    {
        setAllData([]);
        setAllData(HealthDataState);
    }else if(category==2)
    {
        setAllData([]);
        setAllData(EducationDataState)
    }else if(category==3)
    {
        setAllData([]);
        setAllData(AnimalDataState);
    }else{
        allData
    }
  };
  return (
    <>
      <HomeWrapper>
        {/* Filter Section */}
        <FilterWrapper>
          <FilterAltIcon style={{ fontSize: 40 }} />
          <Category
            onClick={() => {
              settingupcategory(1);
            }}
          >
            Health
          </Category>
          <Category
            onClick={() => {
              settingupcategory(2);
            }}
          >
            Education
          </Category>
          <Category
            onClick={() => {
              settingupcategory(3);
            }}
          >
            Animal
          </Category>
        </FilterWrapper>
        {/* Cards Container */}
        <div className="CardWrapper">
          {/* Cards */}
          {category === "1"
            ? setAllData(HealthDataState)
            : category === "2"
            ? setAllData(EducationDataState)
            : category === "3"
            ? setAllData(AnimalDataState)
            : ""}
          {allData.map((e, index) => (
            <>
       
              {/* {console.log("Item#",index, " :",e.args[0])} */}
              <Card>
                {index + 1}
                <CardImg>
                  <img
                    height="100%"
                    width="100%"
                    layout="fill"
                    src={e.args[4]}
                  />
                </CardImg>
                <Title>{e.args[0]}</Title>
                <CardData>
                  <Text>
                    Owner
                    <AccountBox />
                  </Text>
                  <Text>{e.args[2].slice(0,6)}...{e.args[2].slice(39)}</Text>
                </CardData>
                <CardData>
                  <Text>
                    Amount
                    <PaidIcon />
                  </Text>
                  <Text>{ethers.utils.formatEther(e.args[1])}</Text>
                </CardData>
                <CardData>
                  <Text>
                    <EventIcon />
                  </Text>
                  <Text>{new Date(parseInt(e.args.timestamp) * 1000).toLocaleString()}</Text>
                </CardData>
                <Button>Go to Campaign</Button>
              </Card>
            </>
          ))}
        </div>
      </HomeWrapper>
    </>
  );
};

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
`;

const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0 15px;
  border-radius: 8px;
  font-family: "poppins";
  font-weight: normal;
  cursor: pointer;
`;
const Card = styled.div`
  width: 100%;
  margin-top: 20px;

  background-color: ${(props) => props.theme.bgDiv};
  &:hover {
    transform: translateY(-20px);
    transition: transform 0.5s;
  }
  &:not(:hover) {
    transition: transform 0.5s;
  }
`;

const CardImg = styled.div`
  position: relative;
  height: 200px;
  width: 300px;
  background-color: gray;
`;

const Title = styled.h2`
  font-family: "Roboto";
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`;
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  cursor: pointer;
  font-family: "Roboto";
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-image: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
`;
const Text = styled.p`
  display: flex;
  margin: 0;
  padding: 0;
  font-size: 18px;
  font-family: "Roboto";
  font-weight: bold;
`;

export default Index;
