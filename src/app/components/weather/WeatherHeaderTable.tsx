import { Hidden, TableCell, TableRow } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import React from 'react';

import { Icons } from '../../../assets/icons';
import { IconsKey } from '../../types/icon.type';

export default function WeatherHeaderTable() {
  return (
    <React.Fragment>
      <TableHead>
        <TableRow
          sx={{
            background: "#e3fbd7",
          }}
        >
          <TableCell align="left">
            <img width={20} alt="icon" src={Icons["time" as IconsKey]} />
          </TableCell>
          <TableCell align="left">
            <img
              width={30}
              alt="icon"
              src={Icons["clearsky_day" as IconsKey]}
            />
          </TableCell>

          <TableCell align="left">
            <img width={25} alt="icon" src={Icons["tplus" as IconsKey]} />
          </TableCell>

          <TableCell align="left">
            <img
              width={30}
              alt="icon"
              src={Icons["rainandthunder" as IconsKey]}
            />
          </TableCell>

          <TableCell align="left">
            <img width={25} alt="icon" src={Icons["wind" as IconsKey]} />
          </TableCell>

          <Hidden smDown={true}>
            <TableCell align="left">
              <img width={25} alt="icon" src={Icons["humidity" as IconsKey]} />
            </TableCell>
          </Hidden>
          <Hidden smDown={true}>
            <TableCell align="left">
              <img
                width={25}
                alt="icon"
                src={Icons["air_pressure" as IconsKey]}
              />
            </TableCell>
          </Hidden>
        </TableRow>
      </TableHead>
    </React.Fragment>
  );
}
