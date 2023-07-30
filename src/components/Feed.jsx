import React from 'react'
import { useState,useEffect } from 'react'
import {Box,Stack,Typography} from '@mui/material'
import Sidebar from '../components/Sidebar'
import Videos from './Videos'
import {fetchFromAPI} from '../utils/fetchFromAPI'
import { AiFillGithub } from "react-icons/ai";
import voidify from "../Icons/spotify.png"
import "./Feed.css"
function Feed() {
  const [selectedCategory,setSelectedCategory]=useState('New');
  const [videos,setVideos]=useState([]);
  useEffect(()=>{
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data)=>setVideos(data.items));
    
  },[selectedCategory]);
  return (
    <Stack 
      sx={{flexDirection:{sx:'column',md:"row"}}}>
      <Box 
       sx={{height:{sx:'auto',md:'92vh'},
            borderRight:'1px solid #3d3d3d',
            px:{sx:0,md:2}
      }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
      <Typography className='"copyright' 
      variant="body2"
      sx={{mt:1.5,color:"#fff",opacity:"0.6"}}
        >
        <div
          className="button-container"
         >
          <button
            className="github"
            style={{ textAlign: "center", display: "flex" }}
            onClick={() =>
              window.open("https://github.com/Kadhir007/me-Tube", "_blank")
            }
            
            
          >
            <AiFillGithub style={{ height: "21px", width: "21px",marginTop:"6px" }} />
            <p >Source</p>
          </button>
          <button
            className="github"
            style={{ textAlign: "center", display: "flex" }}
            onClick={() =>
              window.open("https://voidify-kad.netlify.app/", "_blank")
            }
          >
            <img
              src={voidify}
              alt="voidify/png"
              style={{ width: "19px", height: "19px",marginTop:'8px'}}
            />
            <p style={{ paddingLeft: "4px" }}>Voidify</p>
          </button>
        </div>
      </Typography>
      </Box>
      <Box p={2} sx={{overflowY:'auto',height:'90vh',flex:2}}>
        <Typography variant ="h4" fontWeight='bold' mb={2} sx={{color:'white'}}>
          {selectedCategory} <span style={{color:'#F31503'}}>Videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
      
    </Stack>
  )
}

export default Feed
