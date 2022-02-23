import { Grid } from '@mui/material';

import GetWeatherApi from './GetWeatherApi';
import WeatherCard from './WeatherCard';

export default function CurrentСonditions() {
  GetWeatherApi();

  return (
    <Grid item xs={12}>
      {/* <Box sx={{ m: 0 }}> */}
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <WeatherCard />
      </Grid>
      {/* </Box> */}
    </Grid>
  );
}
