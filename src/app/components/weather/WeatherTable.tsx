import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { useRecoilValue } from 'recoil';

import { Icons } from '../../../assets/icons';
import { yrSunriseState } from '../../recoil/yr_sunrise.state';
import { yrWeatherState } from '../../recoil/yr_weather.state';
import { IconsKey } from '../../types/icon.type';
import dailyReport from '../../utils/dailyReport';
import getRangeHourForecast from '../../utils/getRangeHourForecast';
import DailyRow from './DailyRow';
import DisplayLocation from './DisplayLocation';

export default function WeatherTable() {
  const weatherData = useRecoilValue(yrWeatherState)!;
  const astroData = useRecoilValue(yrSunriseState)!;
  const {
    minDayTemp,
    maxDayTemp,
    maxDayWind,
    maxDayPrecip,
    averageHumidity,
    ico00,
    ico06,
    ico12,
    ico18,
  }: any = dailyReport(weatherData);
  //
  console.log(getRangeHourForecast(weatherData));
  //
  return (
    <Box sx={{ mt: -2 }}>
      <TableContainer component={Paper}>
        {/* Отрисуем location */}
        <DisplayLocation />

        <Table aria-label="collapsible table">
          {/*
          <TableHead>
            <TableRow>
              <Hidden smDown={true}>
                <TableCell
                  align="left"
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                >
                  Ночь
                </TableCell>
              </Hidden>
              <Hidden smDown={true}>
                <TableCell
                  align="left"
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                >
                  Утро
                </TableCell>
              </Hidden>
              <Hidden smDown={true}>
                <TableCell
                  align="left"
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                >
                  День
                </TableCell>
              </Hidden>
              <Hidden smDown={true}>
                <TableCell
                  align="left"
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                >
                  Вечер
                </TableCell>
              </Hidden>
              <TableCell align="left" sx={{ fontSize: 14, fontWeight: "bold" }}>
                Темп C°
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 14, fontWeight: "bold" }}>
                Осадки мм
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 14, fontWeight: "bold" }}>
                Ветер м/с
              </TableCell>
              <Hidden smDown={true}>
                <TableCell
                  align="left"
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                >
                  Влажность %
                </TableCell>
              </Hidden>
              <Hidden smDown={true}>
                <TableCell
                  align="left"
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                >
                  Давление мм
                </TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
 */}
          <TableBody>
            {weatherData?.properties.timeseries
              .filter(function (item, ind) {
                let dt1;
                let dt2;
                if (ind === 0) {
                  dt1 = new Date(
                    weatherData?.properties.timeseries[ind].time
                  ).toLocaleDateString("ru-RU");
                  return dt1;
                } else {
                  dt1 = new Date(
                    weatherData?.properties.timeseries[ind - 1].time
                  ).toLocaleDateString("ru-RU");
                }
                dt2 = new Date(
                  weatherData?.properties.timeseries[ind].time
                ).toLocaleDateString("ru-RU");
                return dt1 !== dt2;
              })
              .map((daily, ind) =>
                // Прогноз на 9 дней. 10-й день отсекаем. Приходят неполные данные.

                ind < 10 ? (
                  // ind < 4 ? (

                  <DailyRow
                    key={ind}
                    date={daily.time}
                    icon={[
                      Icons[ico00[ind] as IconsKey],
                      Icons[ico06[ind] as IconsKey],
                      Icons[ico12[ind] as IconsKey],
                      Icons[ico18[ind] as IconsKey],
                    ]}
                    tempMin={minDayTemp[ind]}
                    tempMax={maxDayTemp[ind]}
                    pricip={maxDayPrecip[ind]}
                    windMax={Math.round(maxDayWind[ind]) || 0}
                    relative_humidity={Math.round(averageHumidity[ind]) || 0}
                    pres={Math.round(
                      daily.data.instant.details.air_pressure_at_sea_level *
                        0.75
                    )}
                    sunrise={astroData[ind].location.time[0].sunrise.time.slice(
                      11,
                      -6
                    )}
                    sunset={astroData[ind].location.time[0].sunset.time.slice(
                      11,
                      -6
                    )}
                  />
                ) : // ) : (
                //   <HourlyRows
                //     key={ind}
                //     open={true}
                //     dtDaily={daily.time}
                //     sunrise={astroData[
                //       ind
                //     ].location.time[0].sunrise.time.slice(11, -6)}
                //     sunset={astroData[ind].location.time[0].sunset.time.slice(
                //       11,
                //       -6
                //     )}
                //   />
                // )
                null
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
