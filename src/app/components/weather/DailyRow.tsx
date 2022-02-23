import { Expand, ExpandCircleDown } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';

import HourlyRows from './HourlyRows';

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
//Вызываем   <HourlyRows open={open} dtDaily={date} /> - таблица с часовыми прогнозами

export default function DailyRow({
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
