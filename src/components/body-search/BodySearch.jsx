import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo({sortedSearchOptions}) {

  const [selectedOption, setSelectedOption] = React.useState(null);

  
  // console.log("ALL: " + allToponyms);
  // console.log("SEARCH: " + searchOptions);
  // console.log("SORTED: " + sortedSearchOptions);
  // console.log(selectedOption)
  // console.log( allToponyms.map((option) => option.regionName))

  const handleOptionChange = (event, newValue) =>{
    setSelectedOption(newValue);
  }

  return (
    <Box sx={{ width: 300 }}>

      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        // options={searchOptions.map((option) => option.regionName + " " + option.toponymName)}
        options={sortedSearchOptions.map((option) => option.regionName + " " + option.toponymName)}
        // options={top100Films.map((option) => option.title)}
        value={selectedOption}
        onChange={handleOptionChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
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
