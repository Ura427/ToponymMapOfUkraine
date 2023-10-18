import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import SearchIcon from '@mui/icons-material/Search';

import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import BodySearch from "../body-search/BodySearch";



// const listItemClickHandler = (toponym) => {
//     setCurrToponym(toponym);
//     handleOpen();
//   }

const BodyList = ({currRegion, toponyms, listItemClickHandler}) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", bgcolor: "red" }}>
          <List>
            <ListItem>
              <ListItemText primary={currRegion}/>
            </ListItem>
          </List>
          <Divider />
          <nav aria-label="secondary mailbox folders">
          <List>
            {toponyms.map( toponym => 
               <ListItem disablePadding>
               <ListItemButton onClick={() => listItemClickHandler(toponym)} >
                 <ListItemText primary={toponym} />
               </ListItemButton>
             </ListItem>
              )}
            </List>
          </nav>
        </Box>
  )
}

export default BodyList;
