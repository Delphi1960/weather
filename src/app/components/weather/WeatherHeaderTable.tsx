import { Box, Hidden, TableCell, TableRow } from '@mui/material'
import TableHead from '@mui/material/TableHead'
import React from 'react'

import { Icons } from '../../../assets/icons'
import { IconsKey } from '../../types/icon.type'

type Src = {
  iconSrc: string;
};

function HeaderIcon({ iconSrc }: Src) {
  return (
    <TableCell align="center">
      <Box
        component="img"
        sx={{ width: { xs: 25, md: 35, lg: 40 } }}
        alt="icon"
        src={iconSrc}
      ></Box>
    </TableCell>
  );
}

export default function WeatherHeaderTable() {
  return (
    <React.Fragment>
      <TableHead>
        <TableRow
          sx={{
            background: "#e3fbd7",
          }}
        >
          <HeaderIcon iconSrc={Icons["time" as IconsKey]} />
          <HeaderIcon iconSrc={Icons["sun_header" as IconsKey]} />
          <HeaderIcon iconSrc={Icons["tplus" as IconsKey]} />
          <HeaderIcon iconSrc={Icons["rain_header" as IconsKey]} />
          <HeaderIcon iconSrc={Icons["wind" as IconsKey]} />
          <Hidden smDown={true}>
            <HeaderIcon iconSrc={Icons["humidity" as IconsKey]} />
          </Hidden>
          <Hidden smDown={true}>
            <HeaderIcon iconSrc={Icons["air_pressure" as IconsKey]} />
          </Hidden>
        </TableRow>
      </TableHead>
    </React.Fragment>
  );
}
