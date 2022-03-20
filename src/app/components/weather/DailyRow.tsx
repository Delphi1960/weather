import { Expand, ExpandCircleDown } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';

import HourlyRows from './HourlyRows';
import { Icons } from './weathericon';

type IconsKey = keyof typeof Icons;

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
  sunrise,
  sunset,
}: PropsDaily) {
  const [open, setOpen] = React.useState(false);

  const day = new Date(date).toLocaleString("ru-RU", {
    day: "numeric",
  });
  const weekday = new Date(date).toLocaleString("ru-RU", {
    weekday: "short",
  });
  let month = new Date(date).toLocaleString("ru-RU", {
    month: "numeric",
  });
  if (month.length < 2) month = "0" + month;

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

        <TableCell>
          {weekday}.{day}.{month}
          {/* {console.log(new Date(date), date)} */}
        </TableCell>

        {icon.map((ico, i) => (
          <Hidden smDown={true} key={i}>
            <TableCell align="left" sx={{ width: 30 }}>
              <img width={30} alt="icon" src={ico} />
            </TableCell>
          </Hidden>
        ))}

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

        <TableCell>
          <Box component="span" sx={{ color: "blue" }}>
            {pricip === 0 || pricip === undefined ? "0.0" : pricip.toFixed(1)}
          </Box>
        </TableCell>

        <TableCell>
          <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
            {windMax}
          </Box>
        </TableCell>

        <Hidden smDown={true}>
          <TableCell align="left">{relative_humidity} %</TableCell>
        </Hidden>
        <Hidden smDown={true}>
          <TableCell align="left">{pres}мм</TableCell>
        </Hidden>
      </TableRow>

      <TableRow>
        <TableCell colSpan={10} sx={{ fontSize: 12, fontWeight: "bold" }}>
          Восход <img width={30} alt="icon" src={Icons.sunrise as IconsKey} />
          <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
            {sunrise}
          </Box>{" "}
          <Box component="span" sx={{ width: 150 }}>
            ..........
          </Box>
          . Заход <img width={30} alt="icon" src={Icons.sunset as IconsKey} />
          <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
            {" "}
            {sunset}
          </Box>
        </TableCell>
      </TableRow>

      {/* формируем раскрывающуюся таблицу с часовыми прогнозами */}
      <HourlyRows open={open} dtDaily={date} />
      {/* формируем раскрывающуюся таблицу с часовыми прогнозами */}
    </React.Fragment>
  );
}
