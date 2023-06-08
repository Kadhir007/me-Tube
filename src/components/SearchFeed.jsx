import React from 'react'
import { useState,useEffect } from 'react'
import {Box,Typography} from '@mui/material'

import Videos from './Videos'
import {fetchFromAPI} from '../utils/fetchFromAPI'
import { useParams } from 'react-router-dom'
function SearchFeed() {
  const {searchTerm} =useParams();
  const [videos,setVideos]=useState([]);
  useEffect(()=>{
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data)=>setVideos(data.items));
    
  },[searchTerm]);
  return (
      <Box pl={2} sx={{overflowY:'auto',height:'90vh',flex:2}}>
        <Typography variant ="h4" fontWeight='bold' mb={2} sx={{color:'white'}}>
          Showing Results for: <span style={{color:'#F31503'}}>{searchTerm}</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
      
  )
}

export default SearchFeed;
