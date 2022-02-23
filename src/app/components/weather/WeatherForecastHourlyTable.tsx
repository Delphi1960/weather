import { TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import React from 'react';

type Props = {
  time: string;
  icon: string;
  temp: number;
  pricip: number;
  wind: number;
};

export default function WeatherForecastHourlyTable({
  time,
  icon,
  temp,
  pricip,
  wind,
}: Props) {
  return (
    <TableRow>
      <TableCell align="center" sx={{ width: 10 }}>
        {time}
      </TableCell>

      <TableCell align="center" sx={{ width: 30 }}>
        <img width={30} alt="icon" src={icon} />
      </TableCell>
      {temp > 0 ? (
        <TableCell
          align="center"
          sx={{
            color: "red",
          }}
        >
          {temp}°
        </TableCell>
      ) : (
        <TableCell
          align="center"
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
        align="center"
      >
        {pricip === 0 ? "" : pricip}
      </TableCell>
      <TableCell
        sx={{
          color: "blue",
        }}
        align="center"
      >
        {wind} м
      </TableCell>
    </TableRow>
  );
}
