import { Box, Grid, Hidden, TableCell, TableRow } from '@mui/material'
import React from 'react'

import { Icons } from '../../../assets/icons'
import { IconsKey } from '../../types/icon.type'
import GetDirectionOfTheWind from './GetDirectionOfTheWind'

type DataForecast = {
  dataForecast: any[];
};

export default function WeatherDataTable({ dataForecast }: DataForecast) {
  // let sum = 0;
  // for (let i = 0; i < dataForecast.length; i++) {
  //   sum = sum + dataForecast[i].pricip;
  // }
  // console.log(sum);
  return (
    <React.Fragment>
      {dataForecast.map((item, ind) => (
        <TableRow key={ind}>
          {/* Время */}
          <TableCell align="center">
            <Box
              component="span"
              sx={{
                fontSize: { xs: 14, sm: 16, md: 18 },
              }}
            >
              {item.time}
            </Box>
          </TableCell>

          {/* Иконка */}
          <TableCell align="center">
            <Box
              component="img"
              sx={{ width: { xs: 30, md: 35, lg: 40 } }}
              alt="icon"
              src={Icons[item.icon as IconsKey]}
            ></Box>
          </TableCell>

          {/* Температура */}
          <TableCell align="center">
            <Box
              component="span"
              color={item.air_temperature > 0 ? "red" : "blue"}
              sx={{
                fontSize: { xs: 18 },
                fontWeight: "bold",
              }}
            >
              {item.air_temperature + "°"}
            </Box>
          </TableCell>

          {/* Осадки */}
          <TableCell align="center">
            <Box
              component="span"
              color="blue"
              sx={{
                fontSize: { xs: 16 },
              }}
            >
              {item.pricip}
            </Box>
            <Hidden smDown={true}>
              <Box
                component="span"
                sx={{
                  ml: 1,
                  fontSize: { xs: 11, sm: 13, md: 15 },
                  color: "black",
                }}
              >
                мм
              </Box>
            </Hidden>
          </TableCell>

          {/* Скорость и направление ветра */}
          <TableCell align="left">
            <Grid container>
              <Grid item>
                <Box
                  component="span"
                  width="auto"
                  sx={{
                    color: "blue",
                    fontSize: { xs: 16 },
                  }}
                >
                  {item.wind_speed}
                </Box>
              </Grid>
              <Grid item>
                {/* <Box sx={{ ml: { xs: 1.5 }, mt: { xs: -2.5 } }}> */}
                <Box sx={{ mt: 0.3 }}>
                  <GetDirectionOfTheWind
                    windDirection={item.wind_from_direction}
                  />
                </Box>
              </Grid>
            </Grid>
          </TableCell>

          {/* Влажнось */}
          <Hidden smDown={true}>
            <TableCell align="center">
              <Box
                component="span"
                color="blue"
                sx={{
                  fontSize: { xs: 16 },
                }}
              >
                {item.relative_humidity}
              </Box>
              <Hidden smDown={true}>
                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    fontSize: { xs: 11, sm: 13, md: 15 },
                    color: "black",
                  }}
                >
                  %
                </Box>
              </Hidden>
            </TableCell>
          </Hidden>

          {/* Давление */}
          <Hidden smDown={true}>
            <TableCell align="center">
              <Box
                component="span"
                color="#1f6c01"
                sx={{
                  fontSize: { xs: 16 },
                }}
              >
                {item.air_pressure_at_sea_level}
              </Box>
              <Hidden smDown={true}>
                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    fontSize: { xs: 11, sm: 13, md: 15 },
                    color: "black",
                  }}
                >
                  мм
                </Box>
              </Hidden>
            </TableCell>
          </Hidden>
        </TableRow>
      ))}
    </React.Fragment>
  );
}
