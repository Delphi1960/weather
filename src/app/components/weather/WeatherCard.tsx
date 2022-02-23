import { ThemeProvider } from '@emotion/react';
import { Box, Card, Grid, Typography } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';

import { yrWeatherState } from '../../recoil/yr_weather.state';
import { Icons } from './weathericon';

let theme = createTheme();
theme = responsiveFontSizes(theme);

type IconsKey = keyof typeof Icons;

export default function WeatherCard(): ReactElement {
  const loadWeather = useRecoilValue(yrWeatherState);
  console.log(loadWeather);

  const currentTemp =
    loadWeather?.properties.timeseries[0].data.instant.details.air_temperature;
  let tempIcon = Icons.tplus;
  currentTemp >= 0 ? (tempIcon = Icons.tplus) : (tempIcon = Icons.tminus);

  const cards = [0, 1, 2, 3];
  const title = ["Облачность", "Температура", "Ветер", "Влажность"];
  const icon = [
    Icons[
      loadWeather.properties.timeseries[0].data.next_1_hours.summary
        .symbol_code as IconsKey
    ],
    tempIcon,
    Icons.wind,
    Icons.humidity,
  ];

  const value = [
    loadWeather?.properties.timeseries[0].data.instant.details
      .cloud_area_fraction + "%",
    loadWeather?.properties.timeseries[0].data.instant.details.air_temperature +
      "°",
    loadWeather?.properties.timeseries[0].data.instant.details.wind_speed +
      "м/сек",
    loadWeather?.properties.timeseries[0].data.instant.details
      .relative_humidity + "%",
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          ml: 1.5,
        }}
      >
        {cards.map((ind) => (
          <Card key={ind} sx={{ width: 160, height: 200, m: 1 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {title[ind]}
            </Typography>
            {/* <CardActionArea></CardActionArea> */}
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <img width={60} alt="cloud" src={icon[ind]} />
              <Box
                sx={{
                  mt: 1,
                  fontSize: 22,
                  color: "blue",
                }}
              >
                {value[ind]}
              </Box>
            </Grid>
          </Card>
        ))}
      </Box>
    </ThemeProvider>
  );
}
