import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
const HeaderNav = () => {
  return (
   <>
      <HeaderNavWrapper>
        <HeaderNavLink>
        <NavLink to={'/'} style={({isActive})=>{
            return{color:isActive?'yellow':''}
          }}>
          Campaigns
          </NavLink>
        </HeaderNavLink>
        <HeaderNavLink>
        <NavLink to={'/createcampaing'} style={({isActive})=>{
            return{color:isActive?'yellow':''}
          }}>
          Create Campaign
          </NavLink>
        </HeaderNavLink>
        <HeaderNavLink>
          <NavLink to={'/dashboard'} style={({isActive})=>{
            return{color:isActive?'yellow':''}
          }}>
          
          Dashboard
          </NavLink>
        </HeaderNavLink>
      </HeaderNavWrapper>
   </>
  )
}
const HeaderNavWrapper=styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background-color: ${(props)=>props.theme.bgDiv};
padding: 6px;
height: 50%;
border-radius: 10px;

`
const HeaderNavLink=styled.div`
display: flex;
align-items: center;
justify-content: space-between;
font-family: 'Roboto';
margin: 7px;
background-color: ${(props)=>props.theme.bgSubDiv};
height: 100%;
border-radius: 10px;
padding: 0 5px 0 5px;
cursor: pointer;
text-transform:uppercase;
font-weight: bold;
font-size: small;
`

export default HeaderNav