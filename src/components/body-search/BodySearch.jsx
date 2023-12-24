import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo(props) {

  const [selectedOption, setSelectedOption] = React.useState(null);



  const handleOptionChange = (event, newValue) => {
    props.setNotProvokeBySearch(false);
    const values = newValue.split(" ");
    const region = values[0] + " " + values[1];
    const toponym = values[2]; 

    const obj = props.sortedSearchOptions.find(o => o.regionName === region) 
    console.log(obj);

    if(obj){
      if(obj.toponymName === toponym){
        props.setCurrRegion(region);
        props.setCurrToponym(toponym);
        props.handleOpen();
        return;
      }
      setSelectedOption("Такого топоніма ще немає(");
      return;
    }
   
    setSelectedOption("Дана область не належить Україні......поки що");
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
        clearOnBlur
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
