
import React from 'react'
import styled from 'styled-components'
import children1 from '../Images/children1.PNG'
const Details = () => {
  return (
    <>
        <DetailsWrapper>
            <LeftContainer>
                <ImageSection>
                    <img
                        layout='fill'
                        src={children1}
                    />
                </ImageSection>
                <Text>
                We’re continually impressed and grateful for people’s fundraising activities for The Listening Place, 
                which range from hikes,
                 to artwork, to baking. We’ve collated a collection of stories of some of our previous community fundraisers,
                 so that you can read all about their experiences in their own words.
                </Text>
            </LeftContainer>
            <RightContainer>
                <Title>Children's Cancer</Title>
                    <DonateSection>
                        <Input type='number' placeholder='Enter Amount To Donate'/>
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
  )
}

const DetailsWrapper=styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: 98%;
`
const LeftContainer=styled.div`
width: 45%;

`
const RightContainer=styled.div`
width: 50%;
`
const ImageSection=styled.div`
    width: 100%;
    position: relative;
    height: 350px;
`
const Text=styled.p`
font-family: 'Roboto';
font-size: large;
color: ${(props)=>props.theme.color};
text-align: justify;
`
const Title=styled.h1`
    margin: 0;
    padding: 0;
    font-family: 'poppins';
    font-size: x-large;
    color: ${(props)=>props.theme.color};

`
const DonateSection=styled.div`
display: flex;
width: 100%;
justify-content: space-between;
align-items: center;
margin-top: 10px;

`
const Input=styled.input`
padding: 8px 15px;
background-color: ${(props)=>props.theme.bgDiv};
color: ${(props)=>props.theme.color};
border: none;
border-radius: 8px;
outline: none;
font-size: large;
width: 40%;
height: 40%;
`
const Donate=styled.button`
display: flex;
justify-content: center;
border: none;
width: 40%;
padding: 15px;
color: white;
background-color: #00b712;
background-image: linear-gradient(180deg,#00b712,);
`
export default Details