import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';

import GetDirectionOfTheWind from './GetDirectionOfTheWind';

type CellProps = {
  value: number | string;
  unit?: string;
  color?: string;
};

function CellStyle({ value, unit = "", color = "black" }: CellProps) {
  return (
    <TableCell align="left">
      <Box component="span" sx={{ color: { color } }}>
        {value}{" "}
      </Box>
      <Box component="span" sx={{ color: "black" }}>
        {unit}
      </Box>
    </TableCell>
  );
}

type PropsDetail = {
  time: string;
  icon: string;
  temp: number;
  pricip: number;
  wind: number;
  windDirection: number;
  relative_humidity: number;
  nRow: number;
};

//Формируем одну строку с часовым прогнозом
export default function RowHourlyDetail({
  time,
  icon,
  temp,
  pricip,
  wind,
  windDirection,
  relative_humidity,
  nRow,
}: PropsDetail) {
  return (
    <TableRow style={{ backgroundColor: nRow % 2 ? "aliceblue" : "" }}>
      <CellStyle value={time} />

      <TableCell align="left">
        <img width={30} alt="icon" src={icon} />
      </TableCell>

      {temp > 0 ? (
        <CellStyle value={temp} unit={"°"} color={"red"} />
      ) : (
        <CellStyle value={temp} unit={"°"} color={"blue"} />
      )}

      <CellStyle
        value={pricip === 0 ? "0.0" : pricip}
        unit={"мм"}
        color={"blue"}
      />
      {/* <CellStyle value={wind} unit={"м/c"} color={"blue"} /> */}
      <TableCell align="left">
        <Box component="span" sx={{ color: "blue" }}>
          {wind}
          <Box sx={{ ml: 1, mt: -2.2 }}>
            <GetDirectionOfTheWind windDirection={windDirection} />
          </Box>
        </Box>
      </TableCell>

      <Hidden smDown={true}>
        <CellStyle value={relative_humidity} unit={"%"} color={"blue"} />
      </Hidden>
    </TableRow>
  );
}
