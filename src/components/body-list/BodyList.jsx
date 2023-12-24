import React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const BodyList = ({ currRegion, toponyms, listItemClickHandler }) => {
  // console.log(toponyms);
  return (
    <Box
      sx={{
        // width: "100%",
        minWidth: "20ch",
        maxWidth: 360,
        bgcolor: "background.paper",
        border: "#f5f5f5 1px solid",
        position: "absolute", top: "220px", left: "10px"
      }}
    >
      <List>
        <ListItem>
          <ListItemText primary={currRegion} 
          // sx={{ fontWeight: "bold"}}
          />
        </ListItem>
      </List>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          {toponyms.map((toponym) => (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => listItemClickHandler(toponym.toponymName)}
              >
                <ListItemText primary={toponym.toponymName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default BodyList;
