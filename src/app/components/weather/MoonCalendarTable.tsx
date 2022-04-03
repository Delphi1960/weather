import { Box, TableBody } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { toNumber } from 'lodash';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { yrSunriseState } from '../../recoil/yr_sunrise.state';
import Loading from '../load/Loading';
import MoonPhaseIcon from './MoonPhaseIcon';
import MoonPhaseState from './MoonPhaseState';

export default function MoonCalendarTable() {
  const astroData = useRecoilValue(yrSunriseState);
  if (!astroData)
    return (
      <Box>
        <Loading />
      </Box>
    );

  function dt(date: string) {
    return date.slice(8, 10) + "." + date.slice(5, 7);
  }
  return (
    <TableBody>
      {astroData.map((item, i) => (
        // i % 2 !==0?
        // <TableRow key={i} style={{ backgroundColor: "aliceblue" }}>:
        <TableRow key={i}>
          <TableCell width={30} align="left">
            {dt(item.location.time[0].moonposition.time)}
          </TableCell>
          <TableCell width={30}>
            <MoonPhaseIcon
              moonPhase={item.location.time[0].moonposition.phase}
              sizeIcon={30}
            />
          </TableCell>
          <TableCell width={20} align="left">
            {toNumber(item.location.time[0].moonposition.phase).toFixed(0)}
          </TableCell>
          <TableCell align="left">
            {MoonPhaseState(item.location.time[0].moonposition.phase)}
          </TableCell>

          <Hidden smDown={true}>
            <TableCell align="left">
              {item.location.time[0].moonrise?.time.slice(11, -6)}
            </TableCell>
          </Hidden>

          <Hidden smDown={true}>
            <TableCell align="left">
              {item.location.time[0].moonset?.time.slice(11, -6)}
            </TableCell>
          </Hidden>
          <Hidden smDown={true}>
            <TableCell align="left">
              {toNumber(item.location.time[0].moonposition.range).toFixed(0)} км
            </TableCell>
          </Hidden>
        </TableRow>
      ))}
    </TableBody>
  );
}
