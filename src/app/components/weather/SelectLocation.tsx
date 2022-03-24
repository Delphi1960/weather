import { Typography } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { buttonOkLocation, coordLocation, nameLocation } from '../../recoil/yr_weather.state'
import { searchLocation } from './ua_place'

interface LocationType {
  location: string;
  coord: string;
  url: string;
}

export default function SelectLocation() {
  const navigate = useNavigate();

  const place = useRecoilValue(nameLocation);
  const setInputValue = useSetRecoilState(nameLocation);
  const setCoord = useSetRecoilState(coordLocation);
  const setBtState = useSetRecoilState(buttonOkLocation);
  const defaultProps = {
    options: searchLocation,
    getOptionLabel: (option: LocationType) => option.location,
  };

  const handleChange = (event: any, newInputValue: any) => {
    setInputValue(newInputValue);
    const coord = searchLocation.find(
      (city) => city.location === newInputValue
    )?.coord;
    if (coord !== undefined) {
      setCoord(coord);
      navigate("/");
    }
    setBtState(false);
  };

  return (
    <Box>
      <Typography variant="body1" align="left" sx={{ m: 1 }}>
        Current Location: {place}
      </Typography>
      <Box sx={{ width: "auto", m: 2 }}>
        <Autocomplete
          {...defaultProps}
          id="auto-select"
          autoSelect
          renderInput={(params) => (
            <TextField {...params} label={place} variant="outlined" />
          )}
          onInputChange={handleChange}
        />
      </Box>
    </Box>
  );
}
