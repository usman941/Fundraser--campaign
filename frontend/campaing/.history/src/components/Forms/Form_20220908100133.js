import React, { useState } from 'react'
import styled from 'styled-components'
import FormLeftWrapper from './components/FormLeftWrapper';
import FromRightWrapper from './components/FromRightWrapper';
import { createContext  } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import CampaignFactory from '../../utils/CampaignFactory.json';

let NEXT_PUBLIC_ADDRESS='0xCD4b4f4bf5550255a6E02aAF704C5478c76a7e39';

const FormState=createContext();
const Form = () => {
    const[form,setform]=useState({
        campaignTitle:"",
        story:"",
        requiredAmount:"",
        category:"Education",
    });
    const[storyUrl,setStoryUrl]=useState('QmPXdhK5JLiZjZ4ULnES7SMus7xQNA3SdjDkJC1awxwbDK');
    const[imageUrl,setImageUrl]=useState('QmXev4dSRSY2iZX3pRNheEvwrh5YpxHtkdWnSsTkhMwkqr');

    const[loading,setLoading]=useState(false);
    const[campAddress,setcampAddress]=useState("");
    const[uploaded,setUploaded]=useState(false);
    const FormHandler=(e)=>{
        setform({
            ...form, // it the property of object meant another things will be same aspect things are passing
            [e.target.name]:e.target.value
        })
    }
    const[image,setImage]=useState(null);
    const ImageHandler=(e)=>{ // taking event
        // setImage(e.target.files[0]);
        
    }
    const startCampaign=async (e)=>{
        e.preventDefault(); // not able to reload the form otherwise the data will be lost
       console.log(form.category);
        const provider=new ethers.providers.Web3Provider(window.ethereum);
        const signer=provider.getSigner();

        if(form.campaignTitle===""){
            toast.warn("Title Field Is Empty");

        }else if(form.story===""){
            toast.warn("Story Field Is Empty");
        }
        else if(form.requiredAmount===""){
            toast.warn("Required Amount Field Is Empty");
        }else if(uploaded===false){
            toast.warn("Files upload required");
        }
        else{
            setLoading(true);
            const contract=new ethers.Contract(
                //process.env.NEXT_PUBLIC_ADDRESS
                NEXT_PUBLIC_ADDRESS,
                CampaignFactory.abi,
                signer // it hold wallet instance/address
            );
            // console.log(contract) 
            // console.log("starting new campaign..... ");
            const campaignData=await contract.createCampaign(
                form.campaignTitle,
                parseInt(form.requiredAmount),
                imageUrl,
                form.category,
                storyUrl
                // "abc",
                // 1,
                // "abc",
                // "abc",
                // "abc ded"


            );
                await campaignData.wait(); // wit untill it will deploy successfull
                setcampAddress(campaignData.to);
                // setLoading(false)
        }

    }
  return (
    <>
    <FormState.Provider value={{form,setform,image,setImage,ImageHandler,
        FormHandler,setImageUrl,setStoryUrl,startCampaign,setUploaded}}>
    <FormWrapper>
        <FormMain>
        {loading==true?
           campAddress ==""?
            <Spinner>
                <TailSpin height={60}/>
            </Spinner>:
            <Address>
                <h1>Campaign Started Successfully!</h1>
                <h1>{campAddress}</h1>
                <MyButton>
                    Go To Campaign
                </MyButton>
            </Address>
            :<>
            <FormTitle>
                Create Campaign
            </FormTitle>
            <FormInputWrapper>
                <FormLeftWrapper/>
                <FromRightWrapper/>
            </FormInputWrapper>
            </>
            
}
        </FormMain>
        
    </FormWrapper>
    
    </FormState.Provider>
    
    </>
  )
}
const FormWrapper=styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

`
const FormMain=styled.div`
    width: 80%;

`
const FormTitle=styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
    font-weight: bold;
    color: ${(props)=>props.theme.color};
    font-size: 40px;
    font-family: 'poppins';
    margin-top: 20px;
`
const FormInputWrapper=styled.div`
display: flex;
justify-content: space-between;
margin-top: 45px;
`
const Spinner=styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
   
`
const Address=styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props)=>props.theme.bgSubDiv};
    border-radius: 8px;

`
const MyButton=styled.button`
    display: flex;
    justify-content: center;
    width: 30%;
    padding: 15px;
    color: white;
    background-color: #00b700;
    background-image:linear-gradient(180deg,#00b700 0%,#5aff5a 80%);
    border: none;
    margin-top: 30px;
    cursor: pointer;
    font-size: large;
    font-weight: bold;
`
export default Form
export {FormState};