import { Input } from '@mui/material'
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
                        
                    </Donated>
            </RightContainer>
        </DetailsWrapper>
    </>
  )
}

export default Details