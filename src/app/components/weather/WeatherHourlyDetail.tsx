import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';

import GetDirectionOfTheWind from './GetDirectionOfTheWind';

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

type PropsDetail = {
  time: string;
  icon: string;
  temp: number;
  pricip: number;
  wind: number;
  windDirection: number;
  relative_humidity: number;
  pres: number;
  nRow: number;
};

//Формируем одну строку с часовым прогнозом
export default function WeatherHourlyDetail({
  time,
  icon,
  temp,
  pricip,
  wind,
  windDirection,
  relative_humidity,
  pres,
  nRow,
}: PropsDetail) {
  return (
    <TableRow style={{ backgroundColor: nRow % 2 ? "aliceblue" : "" }}>
      <CellStyle value={time} />

      <TableCell align="left">
        <img width={30} alt="icon" src={icon} />
      </TableCell>

      {/* Температура */}
      {temp > 0 ? (
        <CellStyle
          value={temp}
          fontValue={14}
          fontWeight={"bold"}
          // width={30}
          unit={"°"}
          fontUnit={16}
          color={"red"}
        />
      ) : (
        <CellStyle
          value={temp}
          fontWeight={"bold"}
          // width={30}
          unit={"°"}
          fontUnit={16}
          color={"blue"}
        />
      )}

      {/* Осадки */}
      <CellStyle
        value={pricip}
        // fontValue={14}
        // width={50}
        unit={"мм"}
        fontUnit={10}
        color={"blue"}
      />

      {/* Скорость и направление ветра */}
      <TableCell align="left">
        <Box component="span" sx={{ color: "blue", fontSize: 12 }}>
          {wind}
          <Box sx={{ ml: 1, mt: -2.2 }}>
            <GetDirectionOfTheWind windDirection={windDirection} />
          </Box>
        </Box>
      </TableCell>

      {/* Влажнось */}
      <Hidden smDown={true}>
        <CellStyle
          value={relative_humidity}
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
          value={pres}
          // fontValue={14}
          // width={50}
          unit={"мм"}
          fontUnit={10}
          color={"blue"}
        />
      </Hidden>
    </TableRow>
  );
}
