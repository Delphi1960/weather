import styled from '@emotion/styled'
import { Box, Grid, Paper, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useRecoilValue } from 'recoil'

import { loadState } from '../../recoil/load.state'
import { nameLocation, yrWeatherState } from '../../recoil/yr_weather.state'
import GetWeatherApi from './GetWeatherApi'
import { Icons } from './weathericon'

type IconsKey = keyof typeof Icons;

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

// let date = new Date(loadWeather.daily[0].dt * 1000);
// let dt = date.toLocaleString("ru-RU", {
//   day: "numeric",
//   month: "long",
//   year: "numeric",
//   weekday: "long",
//   era: "long",
//   hour: "2-digit",
//   minute: "2-digit",
//   second: "2-digit",
// });

export default function WeatherNow() {
  GetWeatherApi();
  const loadWeather = useRecoilValue(yrWeatherState);
  const place = useRecoilValue(nameLocation);
  const isLoading = useRecoilValue(loadState);
  if (!loadWeather) return <div></div>;

  let date = new Date(loadWeather!.properties.timeseries[0].time);
  let dt = date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  return (
    <Box>
      {isLoading ? (
        <Box>
          <CircularProgress />
          <br />
          <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
            Загрузка данных...
          </Box>
        </Box>
      ) : (
        <Paper
          sx={{
            margin: "auto",
            maxWidth: 800,
            flexGrow: 1,
            // backgroundColor: (theme) =>
            //   theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <Box component="div" sx={{ ml: 2, textAlign: "left" }}>
            <Box component="span" sx={{ textAlign: "left", color: "black" }}>
              Location:{" "}
            </Box>
            <Box
              component="span"
              sx={{
                textAlign: "left",
                color: "blue",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              {place}
            </Box>
          </Box>
          {/* <Typography variant="body1" align="left" sx={{ ml: 1 }}>
             {place}
          </Typography> */}
          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Box>
                <Img
                  alt="wether"
                  width={250}
                  src={
                    Icons[
                      loadWeather!.properties.timeseries[0].data.next_1_hours
                        .summary.symbol_code as IconsKey
                    ]
                  }
                />
              </Box>
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
                  <Typography variant="h6" gutterBottom>
                    {dt}
                  </Typography>
                </Grid>
                <Grid item>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
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
                              loadWeather!.properties.timeseries[0].data.instant
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
                              loadWeather!.properties.timeseries[0].data.instant
                                .details.air_temperature
                            ) + "°"}
                          </Box>
                        </TableCell>
                      </TableRow>

                      <TableRow>
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
                              loadWeather!.properties.timeseries[0].data.instant
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
                              loadWeather!.properties.timeseries[0].data.instant
                                .details.wind_from_direction
                            ) + "°"}
                          </Box>
                        </TableCell>
                      </TableRow>

                      <TableRow>
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
                            {loadWeather?.properties.timeseries[0].data
                              .next_1_hours.details.precipitation_amount +
                              " мм"}
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
                              loadWeather!.properties.timeseries[0].data.instant
                                .details.relative_humidity
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
                            Давление:
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          <Box
                            component="span"
                            sx={{ textAlign: "left", fontSize: 16 }}
                          >
                            {Math.round(
                              loadWeather!.properties.timeseries[0].data.instant
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
      )}
    </Box>
  );
}
