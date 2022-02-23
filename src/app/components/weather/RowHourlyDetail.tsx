import Hidden from '@mui/material/Hidden';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';

type PropsDetail = {
  time: string;
  icon: string;
  temp: number;
  pricip: number;
  wind: number;
  relative_humidity: number;
};

//Формируем одну строку с часовым прогнозом
export default function RowHourlyDetail({
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
