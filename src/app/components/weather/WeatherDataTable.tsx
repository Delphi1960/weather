import { Box, Hidden, TableCell, TableRow } from '@mui/material';
import React from 'react';

import { Icons } from '../../../assets/icons';
import { IconsKey } from '../../types/icon.type';
import GetDirectionOfTheWind from './GetDirectionOfTheWind';

type CellProps = {
  value: number | string;
  unit?: string;
  color?: string;
  fontWeight?: string;
};

function CellStyle({
  value,
  unit = "",
  color = "black",
  fontWeight = "normal",
}: CellProps) {
  return (
    <TableCell align="left">
      <Box
        component="span"
        sx={{
          color: { color },
          fontSize: { xs: 12, sm: 14, md: 16 },
          fontWeight: { fontWeight },
        }}
      >
        {value}{" "}
      </Box>
      <Box
        component="span"
        sx={{
          ml: -0.2,
          fontSize: { xs: 11, sm: 13, md: 15 },
          color: "black",
        }}
      >
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
              fontWeight={"bold"}
              unit={"°"}
              color={"red"}
            />
          ) : (
            <CellStyle
              value={item.air_temperature}
              fontWeight={"bold"}
              unit={"°"}
              color={"blue"}
            />
          )}
          {/* Осадки */}
          <CellStyle value={item.pricip} unit={"мм"} color={"blue"} />
          {/* Скорость и направление ветра */}
          <TableCell align="left">
            <Box
              component="span"
              sx={{
                color: "blue",
                fontSize: { xs: 12, sm: 14, md: 16 },
              }}
            >
              {item.wind_speed}
              <Box sx={{ ml: { xs: 1.5, md: 3 }, mt: { xs: -2, md: -2.5 } }}>
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
              unit={"%"}
              color={"blue"}
            />
          </Hidden>
          {/* Давление */}
          <Hidden smDown={true}>
            <CellStyle
              value={item.air_pressure_at_sea_level}
              unit={"мм"}
              color={"blue"}
            />
          </Hidden>
        </TableRow>
      ))}
    </React.Fragment>
  );
}
