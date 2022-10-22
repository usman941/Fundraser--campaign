import React from 'react';
import Header from './Header';
import Themes from './Themes';
import styled, {ThemeProvider,createGlobalStyle} from 'styled-components';
import {useState,createContext} from 'react';
import Dashboard from '../../pages/Dashboard';
import Createcampaing from '../../pages/Createcampaing';
import { Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Index from '../../pages/Index';
import Details from '../../pages/Details';

const App=createContext(); // creating context 

const Layout = ({children}) => {
    const[theme,setthemes]=useState('light');
    const changeTheme=()=>{
        setthemes(theme=='light'?"dark":'light');
    }
  return (
    <>
    <App.Provider value={{changeTheme,theme}}>
    <ThemeProvider theme={Themes[theme]}>
      <ToastContainer/>
        <LayoutWrapper >
            <GlobalStyle/>
            
    <Header/>
    <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/createcampaing' element={<Createcampaing/>}/>
          <Route path="details" element={<Details/>}/>
        </Routes>
    {children}
    </LayoutWrapper>
    </ThemeProvider>
    </App.Provider>
    </>
  )
}
const GlobalStyle=createGlobalStyle`
body{

    margin: 0;
    padding:0;
    overflow-x: hidden;
}
`
// defining own layoutwrapper
const LayoutWrapper=styled.div`

    min-height: 100vh; // a screen height
    background-color: ${(props)=>props.theme.bgColor};
    background-image: ${(props)=>props.theme.bgImage};  
    color   : ${(props)=>props.theme.color} ;
`
   
export default Layout
export {App};