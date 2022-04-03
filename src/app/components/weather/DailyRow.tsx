import { Expand, ExpandMore } from '@mui/icons-material';
import { IconButton, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
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
  sunrise: string;
  sunset: string;
};

// Формируем одну строку с дневным прогнозом
// Вызываем   <HourlyRows open={open} dtDaily={date} /> - таблица с часовыми прогнозами

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
  sunrise,
  sunset,
}: PropsDaily) {
  const [open, setOpen] = React.useState(false);
  const [header, setHeader] = React.useState("Почасовой прогноз");
  const handleClick = () => {
    setOpen(!open);
    if (open !== true) {
      setHeader("Закрыть прогноз");
    } else {
      setHeader("Почасовой прогноз");
    }
  };

  // console.log(new Date(date).toLocaleDateString("ru-RU"));

  return (
    <React.Fragment>
      <TableRow>
        <TableCell colSpan={6}>
          {/* <Link
            underline="none"
            component="button"
            variant="body2"
            onClick={handleClick}
          > */}
          {new Date(date).toLocaleString("ru-RU", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}{" "}
          {/* </Link> */}
        </TableCell>
      </TableRow>

      <TableRow>
        {icon.map((ico, i) => (
          <Hidden smDown={true} key={i}>
            <TableCell align="left" sx={{ width: 30 }}>
              <img width={30} alt="icon" src={ico} />
            </TableCell>
          </Hidden>
        ))}

        {/* Температура min/mx */}
        <TableCell>
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
        {/* Температура min/mx */}

        {/* Осадки мм */}
        <TableCell>
          <Box component="span" sx={{ color: "blue" }}>
            {pricip === 0 || pricip === undefined ? "0.0" : pricip.toFixed(1)}
          </Box>
        </TableCell>

        {/* Скорость ветра м */}
        <TableCell>
          <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
            {windMax}
          </Box>
        </TableCell>

        {/* Влажность % */}
        <Hidden smDown={true}>
          <TableCell align="left">{relative_humidity} %</TableCell>
        </Hidden>

        {/* Давление мм */}
        <Hidden smDown={true}>
          <TableCell align="left">{pres}мм</TableCell>
        </Hidden>
      </TableRow>

      {/* Показать таблицу почасового прогноза */}
      <TableRow>
        <TableCell colSpan={10} align="center">
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

      {/* формируем раскрывающуюся таблицу с часовыми прогнозами */}
      <HourlyRows
        open={open}
        dtDaily={date}
        sunrise={sunrise}
        sunset={sunset}
      />
      {/* формируем раскрывающуюся таблицу с часовыми прогнозами */}
    </React.Fragment>
  );
}
