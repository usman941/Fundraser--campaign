import React from 'react'
import styled from 'styled-components'
import fundrasing from '../Images/fundrasing.jpg'
const Details = () => {
  return (
    <>
        <DetailsWrapper>
            <LeftContainer>
                <ImageSection>
                    <img
                        layout='fill'
                        src={fundrasing}
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
                
            </RightContainer>
        </DetailsWrapper>
    </>
  )
}

export default Details