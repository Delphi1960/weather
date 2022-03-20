import { Expand, ExpandCircleDown } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { yrSunriseState } from '../../recoil/yr_sunrise.state';
import GetSunriseApi from './GetSunriseApi';
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

  const day = new Date(date).toLocaleString("ru-RU", {
    day: "numeric",
  });
  const weekday = new Date(date).toLocaleString("ru-RU", {
    weekday: "short",
  });
  let month = new Date(date).toLocaleString("ru-RU", {
    month: "numeric",
  });
  if (month.length < 2) {
    month = "0" + month;
  }

  // console.log(date);
  // GetSunriseApi(date);
  // const loadSunrise = useRecoilValue(yrSunriseState);
  // const sunRise = loadSunrise?.location?.time[0]?.sunrise?.time;
  // console.log(sunRise);

  GetSunriseApi();
  const astroData = useRecoilValue(yrSunriseState);
  if (!astroData) return <div></div>;
  console.log(astroData);

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
        <TableCell colSpan={4} sx={{ fontSize: 12, fontWeight: "bold" }}>
          Восход Солнца
        </TableCell>
        <TableCell colSpan={4} sx={{ fontSize: 12, fontWeight: "bold" }}>
          Заход Солнца
        </TableCell>
      </TableRow>

      {/* формируем раскрывающуюся таблицу с часовыми прогнозами */}
      <HourlyRows open={open} dtDaily={date} />
      {/* формируем раскрывающуюся таблицу с часовыми прогнозами */}
    </React.Fragment>
  );
}
