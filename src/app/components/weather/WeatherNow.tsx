import styled from '@emotion/styled';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { Icons } from '../../../assets/icons';
import { yrWeatherState } from '../../recoil/yr_weather.state';
import { IconsKey } from '../../types/icon.type';
import DisplayLocation from './DisplayLocation';
import GetDirectionOfTheWind from './GetDirectionOfTheWind';

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  align: "center",
});

export default function WeatherNow() {
  const weatherData = useRecoilValue(yrWeatherState)!;

  let date = new Date(weatherData.properties.timeseries[0].time);
  let dt = date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  return (
    <Box>
      <DisplayLocation />
      <Paper
        sx={{
          margin: "auto",
          maxWidth: 800,
          flexGrow: 1,
        }}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm container>
            <Grid
              item
              xs
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={0}
            >
              <Img
                alt="wether"
                width={250}
                src={
                  Icons[
                    weatherData!.properties.timeseries[0].data.next_1_hours
                      .summary.symbol_code as IconsKey
                  ]
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid
              item
              xs
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={0}
            >
              <Grid item xs>
                <Typography variant="h6" gutterBottom color={"blue"}>
                  {dt}
                </Typography>
              </Grid>
              <Grid item>
                <Table size="small">
                  <TableBody>
                    <TableRow style={{ backgroundColor: "aliceblue" }}>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{ textAlign: "left", fontSize: 16 }}
                        >
                          Облачность:
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{ textAlign: "left", fontSize: 16 }}
                        >
                          {Math.round(
                            weatherData!.properties.timeseries[0].data.instant
                              .details.cloud_area_fraction
                          ) + " %"}
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{ textAlign: "left", fontSize: 16 }}
                        >
                          Температура:
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{
                            textAlign: "left",
                            fontSize: 16,
                            color: "red",
                          }}
                        >
                          {Math.round(
                            weatherData!.properties.timeseries[0].data.instant
                              .details.air_temperature
                          ) + "°"}
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow style={{ backgroundColor: "aliceblue" }}>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{ textAlign: "left", fontSize: 16 }}
                        >
                          Скорость ветра:
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{
                            textAlign: "left",
                            fontSize: 16,
                            color: "blue",
                          }}
                        >
                          {Math.round(
                            weatherData!.properties.timeseries[0].data.instant
                              .details.wind_speed
                          ) + " м/сек"}
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{ textAlign: "left", fontSize: 16 }}
                        >
                          Направление ветра:
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{ textAlign: "left", fontSize: 16 }}
                        >
                          {Math.round(
                            weatherData!.properties.timeseries[0].data.instant
                              .details.wind_from_direction
                          ) + "°"}
                          <Box sx={{ ml: 5, mt: -2.7 }}>
                            <GetDirectionOfTheWind
                              windDirection={Math.round(
                                weatherData!.properties.timeseries[0].data
                                  .instant.details.wind_from_direction
                              )}
                            />
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow style={{ backgroundColor: "aliceblue" }}>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{ textAlign: "left", fontSize: 16 }}
                        >
                          Осадки:
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{
                            textAlign: "left",
                            fontSize: 16,
                            color: "blue",
                          }}
                        >
                          {weatherData?.properties.timeseries[0].data
                            .next_1_hours.details.precipitation_amount + " мм"}
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{ textAlign: "left", fontSize: 16 }}
                        >
                          Относительная влажность:
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{ textAlign: "left", fontSize: 16 }}
                        >
                          {Math.round(
                            weatherData!.properties.timeseries[0].data.instant
                              .details.relative_humidity
                          ) + " %"}
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow style={{ backgroundColor: "aliceblue" }}>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{ textAlign: "left", fontSize: 16 }}
                        >
                          Давление:
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Box
                          component="span"
                          sx={{ textAlign: "left", fontSize: 16 }}
                        >
                          {Math.round(
                            weatherData!.properties.timeseries[0].data.instant
                              .details.air_pressure_at_sea_level * 0.75
                          )}{" "}
                          мм
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
