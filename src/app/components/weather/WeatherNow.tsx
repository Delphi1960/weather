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

type RowDataProps = {
  cell1: any;
  cell2: any;
  ind: number;
};
function RowData({ cell1, cell2, ind }: RowDataProps) {
  return (
    <TableRow style={{ backgroundColor: ind % 2 ? "aliceblue" : "" }}>
      <TableCell align="left">
        <Box component="span" sx={{ textAlign: "left", fontSize: 16 }}>
          {cell1}
        </Box>
      </TableCell>
      <TableCell align="left">
        <Box
          component="span"
          sx={{ textAlign: "left", fontSize: 16, fontWeight: "bold" }}
        >
          {cell2}
          {ind === 3 ? (
            <Box sx={{ ml: 5, mt: -2.7 }}>
              <GetDirectionOfTheWind windDirection={cell2.slice(0, -1)} />
            </Box>
          ) : null}
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default function WeatherNow() {
  const weatherData = useRecoilValue(yrWeatherState)!;

  let date = new Date(weatherData.properties.timeseries[0].time);
  let dt = date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const arTableHead = [
    "Облачность",
    "Температура",
    "Скорость ветра",
    "Направление ветра",
    "Осадки",
    "Относительная влажность",
    "Атмосферное давление",
  ];

  const data = weatherData!.properties.timeseries[0].data.next_1_hours;
  const details = weatherData!.properties.timeseries[0].data.instant.details;
  const arTableData = [
    Math.round(details.cloud_area_fraction) + " %",
    Math.round(details.air_temperature) + "°",
    Math.round(details.wind_speed) + " м/сек",
    Math.round(details.wind_from_direction) + "°",
    data.details.precipitation_amount + " мм",
    Math.round(details.relative_humidity) + " %",
    Math.round(details.air_pressure_at_sea_level * 0.75) + " мм",
  ];
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
                src={Icons[data.summary.symbol_code as IconsKey]}
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
                    {/* Таблица погоды */}
                    {arTableHead.map((item, ind) => (
                      <RowData
                        key={ind}
                        cell1={item}
                        cell2={arTableData[ind]}
                        ind={ind}
                      />
                    ))}
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
