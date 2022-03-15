import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Hidden from '@mui/material/Hidden';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useRecoilValue } from 'recoil';

import { loadState } from '../../recoil/load.state';
import { yrWeatherState } from '../../recoil/yr_weather.state';
import DailyReport from './DailyReport';
import DailyRow from './DailyRow';
import GetWeatherApi from './GetWeatherApi';
import { Icons } from './weathericon';

type IconsKey = keyof typeof Icons;

//============================================================================

export default function WeatherTable() {
  const isLoading = useRecoilValue(loadState);
  GetWeatherApi();
  const loadWeather = useRecoilValue(yrWeatherState);
  const {
    minDayTemp,
    maxDayTemp,
    maxDayWind,
    // minDayWind,
    maxDayPrecip,
    averageHumidity,
    ico00,
    ico06,
    ico12,
    ico18,
  } = DailyReport();
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
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">Дата</TableCell>
                <Hidden smDown={true}>
                  <TableCell align="left">Ночь</TableCell>
                </Hidden>
                <Hidden smDown={true}>
                  <TableCell align="left">Утро</TableCell>
                </Hidden>
                <Hidden smDown={true}>
                  <TableCell align="left">День</TableCell>
                </Hidden>
                <Hidden smDown={true}>
                  <TableCell align="left">Вечер</TableCell>
                </Hidden>
                <TableCell align="left">Темп C°</TableCell>
                <TableCell align="left">Осадки мм</TableCell>
                <TableCell align="left">Ветер м/с</TableCell>
                <Hidden smDown={true}>
                  <TableCell align="left">Влажность %</TableCell>
                </Hidden>
                <Hidden smDown={true}>
                  <TableCell align="left">Давление мм</TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadWeather?.properties.timeseries
                .filter(function (item, ind) {
                  let dt1;
                  let dt2;
                  if (ind === 0) {
                    dt1 = new Date(
                      loadWeather?.properties.timeseries[ind].time
                    );
                    return dt1.toLocaleDateString();
                  } else {
                    dt1 = new Date(
                      loadWeather?.properties.timeseries[ind - 1].time
                    );
                  }
                  dt2 = new Date(loadWeather?.properties.timeseries[ind].time);
                  return dt1.toLocaleDateString() !== dt2.toLocaleDateString();
                })
                .map((daily, ind) => (
                  <DailyRow
                    key={ind}
                    date={daily.time}
                    icon={[
                      Icons[ico00[ind] as IconsKey],
                      Icons[ico06[ind] as IconsKey],
                      Icons[ico12[ind] as IconsKey],
                      Icons[ico18[ind] as IconsKey],
                    ]}
                    tempMin={minDayTemp[ind] || "-"}
                    tempMax={maxDayTemp[ind] || "-"}
                    pricip={maxDayPrecip[ind]}
                    windMax={Math.round(maxDayWind[ind]) || 0}
                    relative_humidity={Math.round(averageHumidity[ind]) || 0}
                    pres={Math.round(
                      daily.data.instant.details.air_pressure_at_sea_level *
                        0.75
                    )}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
