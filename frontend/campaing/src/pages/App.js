import Layout from "../components/layout/Layout";
import '../styles/global.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Createcampaing from './Createcampaing';
import  Dashboard  from "./Dashboard";
import '../App.css'
function App() {
  return (
   <>
   <BrowserRouter>
      <Layout/>
       
      
      </BrowserRouter>
   </>
  );
}

export default App;
