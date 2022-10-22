import { Select } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import {FormState} from '../Form';
import { useContext } from 'react';
import { UploadRounded } from '@mui/icons-material';
import {toast} from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import {create as IPFSHTTPClient} from 'ipfs-http-client';

//calling IPFS
 const client=IPFSHTTPClient("https://ipfs.infura.io:5001/api/v0"); // passing the url of ipfs infura
// const projectID='151fc07e5c56aa6867c1';
// const projectSecret='c32cf68130344ab3507234b7cad469b62a0222b18d55e58cdc225d91c368e76b';
// when we call then we pass a authorization
// const auth='Basic'+Buffer.from(projectID+":"+projectSecret).toString('base64');
// const client=IPFSHTTPClient({
//     host: ,
//     port: ,
//     protocolL: ,
//     headers: {

//     }
// })
const FromRightWrapper = () => {
    const Handler=useContext(FormState);

    const uploadFiles= async (e)=>{
        e.preventDefault(); // will not allow to refresh the page
        setuploadLoading(true);
        if(Handler.form.story !==""){
            try{
                const added=await client.add(Handler.form.story);
                 Handler.setStoryUrl(added.path)
                //Handler.setStoryUrl('QmPXdhK5JLiZjZ4ULnES7SMus7xQNA3SdjDkJC1awxwbDK');
            } catch(error){
                toast.warn('Error Uploading story');
            }
        }
        if(Handler.image!==null){
            try{
                const added=await client.add(Handler.image);
                Handler.setImageUrl(added.path);
              //  Handler.setImageUrl('QmXev4dSRSY2iZX3pRNheEvwrh5YpxHtkdWnSsTkhMwkqr');
            }catch(error){
                toast.warn('Error Uploading Image');
            }
        }
        setuploadLoading(false);
        setUploaded(true);
        Handler.setUploaded(true);
        toast.success("Files Uploaded Successfully");
    }

    const[uploadLoading,setuploadLoading]=useState(false);
    const[uploaded,setUploaded]=useState(false);
  return (
   <>
   <FormRight>
        <FormInput>
            <FormRow>
                <RowFirstInput>
                <label>Required Amount</label>
                <Input onChange={Handler.FormHandler} value={Handler.form.requiredAmount}
              name="requiredAmount"
               type={'number'} placeholder='Required Amount'></Input>
                </RowFirstInput>
                <RowSeconedInput>
                <label>Choose Category</label>
                <MySelect onChange={Handler.FormHandler}  name="category">
                    <option value={Handler.form.category}>Education</option>
                    <option value='health'>Health</option>
                    <option value='animal'>Animal</option>
                </MySelect>
                </RowSeconedInput>
               
            </FormRow>
        </FormInput>
        {/* Image */}
        <FormInput>
            <label>Select Image</label>
            <Image onChange={Handler.ImageHandler} 
             type={'file'} accept='image/*'>

            </Image>
        </FormInput>
        {uploadLoading==true? <TailSpin color='#fff' height={20}/> :
       uploaded==false?
        <Button onClick={uploadFiles}>
       Upload file to IPFS
   </Button> : <Button>Files uploaded successfuly</Button>
}
        <Button onClick={Handler.startCampaign}>
            Start Campaign
        </Button>
   </FormRight>

   </>
  )
}
const FormRight=styled.div`
width: 45%;
`
const FormInput=styled.div`
font-family: 'poppins';
display: flex;
flex-direction: column;
margin-top: 10px;
`
const FormRow=styled.div`
display: flex;
justify-content: space-between;
width: 100%;
`
const Input=styled.input`
padding: 15px;
background-color: ${(props)=>props.theme.bgDiv};
color: ${(props)=>props.theme.color};
margin-top: 4px;
border: none;
border-radius: 8px;
outline: none;
font-size: large;
width: 100%;
`
const RowFirstInput=styled.div`
    display: flex;
    flex-direction: column;
    width: 45%;
`
const RowSeconedInput=styled.div`
    display: flex;
    flex-direction: column;
    width: 45%;
`
const MySelect=styled.select`
padding: 15px;
background-color: ${(props)=>props.theme.bgDiv};
color: ${(props)=>props.theme.color};
margin-top: 4px;
border: none;
border-radius: 8px;
outline: none;
font-size: large;
width: 100%;
`
const Image=styled.input`
background-color: ${(props)=>props.theme.bgDiv};
color: ${(props)=>props.theme.color};
margin-top: 4px;
border: none;
border-radius: 8px;
outline: none;
font-size: large;
width: 100%;

&::-webkit-file-upload-button{
    padding: 15px;
    background-color: ${(props)=>props.theme.bgSubDiv};
    color: ${(props)=>props.theme.color};
    outline: none;
    border: none;
    font-weight: bold;
}
`
const Button=styled.button`
    width: 100%;
    padding: 15px;
    color: white;
    background-color: #00b712;
    background-image: 
    linear-gradient(180deg,#00b712 0%,#5aff15 80%);
    border: none;
    margin-top: 30px;
    cursor: pointer;
    font-weight: bold;
    font-size: large;
`



export default FromRightWrapper