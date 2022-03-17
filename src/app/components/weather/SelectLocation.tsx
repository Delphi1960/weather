import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { buttonOkLocation, coordLocation, nameLocation } from '../../recoil/yr_weather.state';
import GetWeatherApi from './GetWeatherApi';

// import JsonPlace from './data_ua.json';

interface LocationType {
  location: string;
  coord: string;
  url: string;
}

export default function SelectLocation() {
  // const searchLocation = JsonPlace;
  const place = useRecoilValue(nameLocation);
  const setInputValue = useSetRecoilState(nameLocation);
  const setCoord = useSetRecoilState(coordLocation);
  const setBtState = useSetRecoilState(buttonOkLocation);
  GetWeatherApi();
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
    }
    setBtState(false);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Autocomplete
        {...defaultProps}
        id="auto-select"
        autoSelect
        renderInput={(params) => (
          <TextField
            {...params}
            label="Location"
            variant="standard"
            value={place}
          />
        )}
        onInputChange={handleChange}
      />
    </Box>
  );
}

// onInputChange={(event, newInputValue) => {
//   setInputValue(newInputValue);
// }}

const searchLocation = [
  {
    location: "Одесса (home)",
    coord: "lat=46.4725&lon=30.74136&altitude=42",
    url: "",
  },
  {
    location: "Одесса",
    coord: "lat=46.4577&lon=30.7484&altitude=37",
    url: "2-698738/Ukraine/Odessa",
  },
  {
    location: "Одесса(горсовет)",
    coord: "lat=46.48572&lon=30.74383&altitude=50",
    url: "2-698740/Ukraine/Odessa/Odes’ka_Mis’krada/Odessa",
  },
  {
    location: "Покровск",
    coord: "lat=48.28198&lon=37.17585&altitude=199",
    url: "2-704422/Ukraine/Donetsk/Krasnoarmiys’ka_Mis’krada/Pokrovsk",
  },
  {
    location: "Киев",
    coord: "lat=50.45466&lon=30.5238&altitude=187",
    url: "2-703448/Ukraine/Kyiv_City/Kyiv",
  },
  {
    location: "Измаил",
    coord: "lat=45.35058&lon=28.83751&altitude=19",
    url: "2-707308/Ukraine/Odessa/Izmail’skiy_Rayon/Izmail",
  },
  {
    location: "Львов",
    coord: "lat=49.83826&lon=24.02324&altitude=284",
    url: "2-702550/Ukraine/Lviv/Lviv",
  },
];
