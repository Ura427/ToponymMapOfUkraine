import { useContext, useState } from "react";

//CONTEXT
import { RegionContext } from "../../store/context/regionContext";
import { ToponymContext } from "../../store/context/toponymContext";

//MUI
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";

export default function FreeSolo({
  setNotProvokeBySearch,
  sortedSearchOptions,
  handleOpen,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const regionContext = useContext(RegionContext);
  const toponymContext = useContext(ToponymContext);

  const handleOptionChange = (event, newValue) => {
    setNotProvokeBySearch(false);
    const values = newValue.split(" ");
    const region = values[0] + " " + values[1];
    const toponym = values[2];

    //Find object in backend data
    const obj = sortedSearchOptions.find(
      (o) => o.regionName === region && o.toponymName === toponym
    );

    if (obj) {
      regionContext.setValue(region);
      toponymContext.setValue(toponym);
      setSelectedOption("");
      handleOpen();
    } else {
      setSelectedOption("Такої області або топоніма не існує");
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={sortedSearchOptions.map(
          (option) => option.regionName + " " + option.toponymName
        )}
        value={selectedOption}
        onChange={handleOptionChange}
        clearOnBlur
        renderInput={(params) => (
          <TextField
            {...params}
            label="Пошук топоніму"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Box>
  );
}
