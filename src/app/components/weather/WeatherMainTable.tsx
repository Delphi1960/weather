import { TableBody, TableCell, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { yrWeatherState } from '../../recoil/yr_weather.state';
import getRangeHourForecast from '../../utils/getRangeHourForecast';
import DisplayLocation from './DisplayLocation';
import WeatherDailyTable from './WeatherDailyTable';

export default function WeatherMainTable() {
  // const [open, setOpen] = React.useState(false);
  // const [header, setHeader] = React.useState("Почасовой прогноз");
  // const astroData = useRecoilValue(yrSunriseState)!;
  const weatherData = useRecoilValue(yrWeatherState)!;

  const dataForecast = getRangeHourForecast(weatherData);

  // const handleClick = () => {
  //   setOpen(!open);
  //   if (open !== true) {
  //     setHeader("Закрыть прогноз");
  //   } else {
  //     setHeader("Почасовой прогноз");
  //   }
  // };

  // console.log(dataForecast);
  return (
    <Box>
      <TableContainer component={Paper}>
        {/* Отрисуем location */}
        <DisplayLocation />

        {dataForecast.map((item, ind) => (
          <Paper
            variant="outlined"
            square={true}
            key={ind}
            sx={{
              m: 1,

              borderRadius: 3,
              // background: "#ecfbde",
              background: "#f5fded",
            }}
          >
            <Table size="small" aria-label="collapsible table" sx={{ p: -2 }}>
              <TableBody>
                <React.Fragment>
                  <TableRow>
                    <TableCell colSpan={7} sx={{ fontWeight: "bold", p: 1 }}>
                      {new Date(item.date).toLocaleString("ru-RU", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}{" "}
                      <WeatherDailyTable
                        dayForecast={item.dataTime}
                        hoursCount={item.hoursCount}
                        date={item.date}
                      />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              </TableBody>
            </Table>
          </Paper>
        ))}
      </TableContainer>
    </Box>
  );
}
