import { Expand, ExpandCircleDown } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useRecoilValue } from 'recoil';

import { yrWeatherState } from '../../recoil/yr_weather.state';
import DailyReport from './DailyReport';
import GetWeatherApi from './GetWeatherApi';
import { Icons } from './weathericon';

type IconsKey = keyof typeof Icons;

type PropsHourly = {
  open: boolean;
  dtDaily: string;
};

//============================================================================
type PropsDetail = {
  time: string;
  icon: string;
  temp: number;
  pricip: number;
  wind: number;
  relative_humidity: number;
};
//Формируем одну строку с часовым прогнозом
function RowDetail({
  time,
  icon,
  temp,
  pricip,
  wind,
  relative_humidity,
}: PropsDetail) {
  return (
    <TableRow>
      <TableCell align="left">{time}</TableCell>

      <TableCell align="left">
        <img width={30} alt="icon" src={icon} />
      </TableCell>

      {temp > 0 ? (
        <TableCell
          align="left"
          sx={{
            color: "red",
          }}
        >
          {temp}°
        </TableCell>
      ) : (
        <TableCell
          align="left"
          sx={{
            color: "blue",
          }}
        >
          {temp}°
        </TableCell>
      )}
      <TableCell
        sx={{
          color: "blue",
        }}
        align="left"
      >
        {pricip === 0 ? "0.0" : pricip}
      </TableCell>
      <TableCell
        sx={{
          color: "blue",
        }}
        align="left"
      >
        {wind} м
      </TableCell>

      <Hidden smDown={true}>
        <TableCell
          sx={{
            color: "blue",
          }}
          align="left"
        >
          {relative_humidity} %
        </TableCell>
      </Hidden>
    </TableRow>
  );
}

//============================================================================
//Формируем строки с часовым прогнозом
//и формируем раскрывающуюся таблицу с часовыми прогнозами
function HourlyRows({ open, dtDaily }: PropsHourly) {
  const loadWeather = useRecoilValue(yrWeatherState);
  let dt = new Date(dtDaily);
  return (
    <TableRow>
      <TableCell colSpan={10}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body1" gutterBottom component="div">
              Почасовой прогноз
            </Typography>
            <Table size="small" aria-label="purchases" sx={{ ml: -2, mr: -2 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Время</TableCell>
                  <TableCell align="left">Небо</TableCell>
                  <TableCell align="left">C°</TableCell>
                  <TableCell align="left">Осадки</TableCell>
                  <TableCell align="left">Ветер</TableCell>
                  <Hidden smDown={true}>
                    <TableCell align="left">Влажность</TableCell>
                  </Hidden>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadWeather?.properties.timeseries
                  .filter((item) => {
                    let dt1 = new Date(item.time);
                    return dt1.toLocaleDateString() === dt.toLocaleDateString();
                  })
                  .map((hourly, ind) => (
                    <RowDetail
                      key={ind}
                      time={new Date(hourly.time).toLocaleString("ru-RU", {
                        hour: "2-digit",
                      })}
                      icon={
                        Icons[
                          (hourly?.data.next_1_hours?.summary
                            ?.symbol_code as IconsKey) ||
                            (hourly?.data.next_6_hours?.summary
                              ?.symbol_code as IconsKey) ||
                            (hourly?.data.next_12_hours?.summary
                              ?.symbol_code as IconsKey) ||
                            "null1"
                        ]
                      }
                      temp={Math.round(
                        hourly.data.instant.details.air_temperature
                      )}
                      pricip={
                        hourly?.data.next_1_hours?.details
                          ?.precipitation_amount !== undefined
                          ? hourly?.data.next_1_hours?.details
                              ?.precipitation_amount
                          : hourly?.data.next_6_hours?.details
                              ?.precipitation_amount
                      }
                      wind={Math.round(hourly.data.instant.details.wind_speed)}
                      relative_humidity={Math.round(
                        hourly.data.instant.details.relative_humidity
                      )}
                    />
                  ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

//============================================================================
type PropsDaily = {
  date: string;
  icon: string[];
  tempMin: number;
  tempMax: number;
  pricip: number;
  // windMin: number;
  windMax: number;
  relative_humidity: number;
  pres: number;
};
//Формируем одну строку с дневным прогнозом
//Вызываем   <HourlyRows open={open} dtDaily={date} /> - таблиа с часовыми прогнозами
function DailyRow({
  date,
  icon,
  tempMin,
  tempMax,
  pricip,
  // windMin,
  windMax,
  relative_humidity,
  pres,
}: PropsDaily) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            sx={{ width: 30 }}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <Expand /> : <ExpandCircleDown />}
          </IconButton>
        </TableCell>

        <TableCell sx={{ width: 50 }}>
          {new Date(date).toLocaleString("ru-RU", {
            day: "numeric",
            month: "short",
            weekday: "short",
          })}
        </TableCell>

        {icon.map((ico, i) => (
          <Hidden smDown={true} key={i}>
            <TableCell align="left" sx={{ width: 30 }}>
              <img width={30} alt="icon" src={ico} />
            </TableCell>
          </Hidden>
        ))}

        <TableCell sx={{ width: 35 }}>
          {tempMin > 0 ? (
            <Box component="span" sx={{ color: "red", fontWeight: "bold" }}>
              {tempMin}°
            </Box>
          ) : (
            <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
              {tempMin}°
            </Box>
          )}
          /
          {tempMax > 0 ? (
            <Box component="span" sx={{ color: "red", fontWeight: "bold" }}>
              {tempMax}°
            </Box>
          ) : (
            <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
              {tempMax}°
            </Box>
          )}
        </TableCell>

        <TableCell sx={{ width: 20 }}>
          <Box component="span" sx={{ color: "blue" }}>
            {pricip === 0 || pricip === undefined ? "0.0" : pricip.toFixed(1)}
          </Box>
        </TableCell>

        <TableCell sx={{ width: "auto" }}>
          {/* <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
                {windMin}
              </Box>
              / */}
          <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
            {windMax}
          </Box>{" "}
          м
        </TableCell>

        <Hidden smDown={true}>
          <TableCell align="left" size="small" width={"auto"}>
            {relative_humidity} %
          </TableCell>
        </Hidden>
        <Hidden smDown={true}>
          <TableCell align="left" size="small" width={"auto"}>
            {pres}мм
          </TableCell>
        </Hidden>
      </TableRow>

      {/* формируем раскрывающуюся таблицу с часовыми прогнозами */}
      <HourlyRows open={open} dtDaily={date} />
      {/* формируем раскрывающуюся таблицу с часовыми прогнозами */}
    </React.Fragment>
  );
}

export default function WeatherTable() {
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
            <TableCell align="left">Темп</TableCell>
            <TableCell align="left">Дождь</TableCell>
            <TableCell align="left">Ветер</TableCell>
            <Hidden smDown={true}>
              <TableCell align="left">Влажность</TableCell>
            </Hidden>
            <Hidden smDown={true}>
              <TableCell align="left">Давление</TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadWeather?.properties.timeseries
            .filter(function (item, ind) {
              let dt1;
              let dt2;
              if (ind === 0) {
                dt1 = new Date(loadWeather?.properties.timeseries[ind].time);
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
                tempMin={minDayTemp[ind]}
                tempMax={maxDayTemp[ind]}
                pricip={maxDayPrecip[ind]}
                windMax={Math.round(maxDayWind[ind])}
                relative_humidity={Math.round(averageHumidity[ind])}
                pres={Math.round(
                  daily.data.instant.details.air_pressure_at_sea_level * 0.75
                )}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
