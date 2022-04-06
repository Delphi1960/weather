import { Expand, ExpandMore } from '@mui/icons-material';
import { Box, Hidden, IconButton, Link, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

import { Icons } from '../../../assets/icons';
import { IconsKey } from '../../types/icon.type';
import GetDirectionOfTheWind from './GetDirectionOfTheWind';
import SunriseSunset from './SunriseSunset';
import WetherHourlyCollapsedTable from './WetherHourlyCollapsedTable';

type CellProps = {
  value: number | string;
  fontValue?: number;
  unit?: string;
  fontUnit?: number;
  color?: string;
  fontWeight?: string;
};

function CellStyle({
  value,
  fontValue = 12,
  unit = "",
  fontUnit = 12,
  color = "black",
  fontWeight = "normal",
}: CellProps) {
  return (
    <TableCell align="left">
      <Box
        component="span"
        sx={{
          color: { color },
          fontSize: fontValue,
          fontWeight: { fontWeight },
        }}
      >
        {value}{" "}
      </Box>
      <Box component="span" sx={{ fontSize: fontUnit, color: "black" }}>
        {unit}
      </Box>
    </TableCell>
  );
}

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
      setHeader("Кратко");
    } else {
      setHeader("Подробно");
    }
  };
  // console.log(date, dayForecast);
  return (
    <React.Fragment>
      <Table size="small" sx={{ ml: 0, mr: -2 }}>
        <TableBody>
          {dayForecast.map((item, ind) => (
            <TableRow key={ind}>
              {/* Время */}
              <CellStyle value={item.time} />

              {/* Иконка */}
              <TableCell>
                <img width={30} alt="icon" src={Icons[item.icon as IconsKey]} />
              </TableCell>

              {/* Температура */}
              {item.air_temperature > 0 ? (
                <CellStyle
                  value={item.air_temperature}
                  fontValue={14}
                  fontWeight={"bold"}
                  // width={30}
                  unit={"°"}
                  fontUnit={16}
                  color={"red"}
                />
              ) : (
                <CellStyle
                  value={item.air_temperature}
                  fontWeight={"bold"}
                  // width={30}
                  unit={"°"}
                  fontUnit={16}
                  color={"blue"}
                />
              )}

              {/* Осадки */}
              <CellStyle
                value={item.pricip}
                // fontValue={14}
                // width={50}
                unit={"мм"}
                fontUnit={10}
                color={"blue"}
              />

              {/* Скорость и направление ветра */}
              <TableCell align="left">
                <Box component="span" sx={{ color: "blue", fontSize: 12 }}>
                  {item.wind_speed}
                  <Box sx={{ ml: 1, mt: -2.2 }}>
                    <GetDirectionOfTheWind
                      windDirection={item.wind_from_direction}
                    />
                  </Box>
                </Box>
              </TableCell>

              {/* Влажнось */}
              <Hidden smDown={true}>
                <CellStyle
                  value={item.relative_humidity}
                  // fontValue={14}
                  // width={50}
                  unit={"%"}
                  fontUnit={10}
                  color={"blue"}
                />
              </Hidden>

              {/* Давление */}
              <Hidden smDown={true}>
                <CellStyle
                  value={item.air_pressure_at_sea_level}
                  // fontValue={14}
                  // width={50}
                  unit={"мм"}
                  fontUnit={10}
                  color={"blue"}
                />
              </Hidden>
            </TableRow>
          ))}

          {/* Восход и заход Солнца */}
          <SunriseSunset date={date} />

          {hoursCount > 4 ||
          (new Date(date).toLocaleDateString(),
          new Date().toLocaleDateString()) ? (
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
                  {open ? <Expand /> : <ExpandMore />}
                </IconButton>{" "}
              </TableCell>
            </TableRow>
          ) : null}
          {/* формируем раскрывающуюся таблицу с часовыми прогнозами */}
          <WetherHourlyCollapsedTable
            open={open}
            dtDaily={date}
            // sunrise={sunrise}
            // sunset={sunset}
          />
          {/* формируем раскрывающуюся таблицу с часовыми прогнозами */}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
