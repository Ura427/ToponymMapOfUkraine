import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo(props) {

  const [selectedOption, setSelectedOption] = React.useState(null);

  
  // console.log("ALL: " + allToponyms);
  // console.log("SEARCH: " + searchOptions);
  // console.log("SORTED: " + sortedSearchOptions);
  // console.log(selectedOption)
  // console.log( allToponyms.map((option) => option.regionName))

  const handleOptionChange = (event, newValue) =>{
    // setSelectedOption(newValue);
    const values = newValue.split(" ");
    const region = values[0];
    const toponym = values[1]; 
    props.setCurrRegion(region);
    props.setCurrToponym(toponym);
    props.handleOpen()

  }

  return (
    <Box sx={{ width: 300 }}>

      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={props.sortedSearchOptions.map((option) => option.regionName + " " + option.toponymName)}
        value={selectedOption}
        onChange={handleOptionChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Пошук топоніму"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Box>
  );
}
