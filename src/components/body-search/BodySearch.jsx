import { useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { RegionContext } from '../../store/context/regionContext';
import { ToponymContext } from '../../store/context/toponymContext';

export default function FreeSolo({setNotProvokeBySearch, sortedSearchOptions, handleOpen}) {

  const [selectedOption, setSelectedOption] = useState(null);

  const region = useContext(RegionContext);
  const toponym = useContext(ToponymContext);

  const handleOptionChange = (event, newValue) => {
    setNotProvokeBySearch(false);
    const values = newValue.split(" ");
    const region = values[0] + " " + values[1];
    const toponym = values[2]; 

    const obj = sortedSearchOptions.find(o => o.regionName === region) 
    console.log(obj);

    if(obj){
      if(obj.toponymName === toponym){
        // props.setCurrRegion(region);
        region.setValue(region);
        // props.setCurrToponym(toponym);
        toponym.setValue(toponym)
        handleOpen();
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
        options={sortedSearchOptions.map((option) => option.regionName + " " + option.toponymName)}
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
