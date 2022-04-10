import { Expand, ExpandLess, ExpandMore } from '@mui/icons-material';
import { IconButton, Link, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

import SunriseSunset from './SunriseSunset';
import WeatherDataTable from './WeatherDataTable';
import WeatherHeaderTable from './WeatherHeaderTable';
import WetherHourlyCollapsedTable from './WetherHourlyCollapsedTable';

type DayForecast = {
  dayForecast: any[];
  hoursCount: number;
  date: string;
};

export default function WeatherDailyTable({
  dayForecast,
  hoursCount,
  date,
}: DayForecast) {
  const [open, setOpen] = React.useState(false);
  const [header, setHeader] = React.useState("Подробно");
  const handleClick = () => {
    setOpen(!open);
    if (open !== true) {
      setHeader("Закрыть");
    } else {
      setHeader("Подробно");
    }
  };

  const handleCloseClick = () => {
    setOpen(false);
    setHeader("Подробно");
  };

  // console.log(hoursCount);
  // console.log(date, dayForecast);
  return (
    <React.Fragment>
      <Table size="small" sx={{ ml: 0, mr: -2 }}>
        <WeatherHeaderTable />
        <TableBody>
          <WeatherDataTable dataForecast={dayForecast} />

          {/* Восход и заход Солнца */}
          <SunriseSunset date={date} />

          {hoursCount > 4 ||
          new Date(date).toLocaleDateString() ===
            new Date().toLocaleDateString() ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Link
                  underline="none"
                  component="button"
                  variant="body2"
                  onClick={handleClick}
                >
                  {header}
                </Link>
                <IconButton
                  sx={{ width: 20 }}
                  aria-label="expand row"
                  size="small"
                  onClick={handleClick}
                >
                  {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>{" "}
              </TableCell>
            </TableRow>
          ) : null}
          {/* формируем раскрывающуюся таблицу с часовыми прогнозами */}
          <WetherHourlyCollapsedTable open={open} dtDaily={date} />
          {/* формируем раскрывающуюся таблицу с часовыми прогнозами */}

          {/* Иконка "Закрыть" в конце раскрывающейся таблицы*/}
          {open ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Link
                  underline="none"
                  component="button"
                  variant="body2"
                  onClick={handleCloseClick}
                >
                  Закрыть
                </Link>
                <IconButton
                  sx={{ width: 20 }}
                  aria-label="expand row"
                  size="small"
                  onClick={handleCloseClick}
                >
                  {open ? <ExpandLess /> : <Expand />}
                </IconButton>{" "}
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
