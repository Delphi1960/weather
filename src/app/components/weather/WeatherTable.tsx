import Box from '@mui/material/Box'
import Hidden from '@mui/material/Hidden'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useRecoilValue } from 'recoil'

import { Icons } from '../../assets/icons'
import { yrSunriseState } from '../../recoil/yr_sunrise.state'
import { nameLocation, yrWeatherState } from '../../recoil/yr_weather.state'
import { IconsKey } from '../../types/icon.type'
import dailyReport from '../../utils/dailyReport'
import DailyRow from './DailyRow'

export default function WeatherTable() {
  const place = useRecoilValue(nameLocation);
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
  return (
    <Box sx={{ p: 4 }}>
      <TableContainer component={Paper}>
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

        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left" sx={{ fontSize: 12, fontWeight: "bold" }}>
                Дата
              </TableCell>
              <Hidden smDown={true}>
                <TableCell
                  align="left"
                  sx={{ fontSize: 12, fontWeight: "bold" }}
                >
                  Ночь
                </TableCell>
              </Hidden>
              <Hidden smDown={true}>
                <TableCell
                  align="left"
                  sx={{ fontSize: 12, fontWeight: "bold" }}
                >
                  Утро
                </TableCell>
              </Hidden>
              <Hidden smDown={true}>
                <TableCell
                  align="left"
                  sx={{ fontSize: 12, fontWeight: "bold" }}
                >
                  День
                </TableCell>
              </Hidden>
              <Hidden smDown={true}>
                <TableCell
                  align="left"
                  sx={{ fontSize: 12, fontWeight: "bold" }}
                >
                  Вечер
                </TableCell>
              </Hidden>
              <TableCell align="left" sx={{ fontSize: 12, fontWeight: "bold" }}>
                Темп C°
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 12, fontWeight: "bold" }}>
                Осадки мм
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 12, fontWeight: "bold" }}>
                Ветер м/с
              </TableCell>
              <Hidden smDown={true}>
                <TableCell
                  align="left"
                  sx={{ fontSize: 12, fontWeight: "bold" }}
                >
                  Влажность %
                </TableCell>
              </Hidden>
              <Hidden smDown={true}>
                <TableCell
                  align="left"
                  sx={{ fontSize: 12, fontWeight: "bold" }}
                >
                  Давление мм
                </TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {weatherData?.properties.timeseries
              .filter(function (item, ind) {
                let dt1;
                let dt2;
                if (ind === 0) {
                  dt1 = new Date(weatherData?.properties.timeseries[ind].time);
                  return dt1.toLocaleDateString();
                } else {
                  dt1 = new Date(
                    weatherData?.properties.timeseries[ind - 1].time
                  );
                }
                dt2 = new Date(weatherData?.properties.timeseries[ind].time);
                return dt1.toLocaleDateString() !== dt2.toLocaleDateString();
              })
              .map((daily, ind) =>
                //прогноз на 9 дней. 10-й день отсекаем. Приходят не полные данные
                ind < 10 ? (
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
                ) : null
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
