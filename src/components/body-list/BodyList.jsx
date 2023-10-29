import React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";


import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";




const BodyList = ({currRegion, toponyms, listItemClickHandler}) => {

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", border: "black 1px solid" }}>
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
