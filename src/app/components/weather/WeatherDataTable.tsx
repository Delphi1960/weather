import { Box, Hidden, TableCell, TableRow } from '@mui/material';
import React from 'react';

import { Icons } from '../../../assets/icons';
import { IconsKey } from '../../types/icon.type';
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

type DataForecast = {
  dataForecast: any[];
};

export default function WeatherDataTable({ dataForecast }: DataForecast) {
  return (
    <React.Fragment>
      {dataForecast.map((item, ind) => (
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
    </React.Fragment>
  );
}
