import Hidden from '@mui/material/Hidden';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { toNumber } from 'lodash';
import React from 'react';

import MoonPhaseIcon from './MoonPhaseIcon';
import MoonPhaseState from './MoonPhaseState';

type PropsCalendar = {
  date: string;
  phase: string;
  range: string;
};

export default function MoonCalendarTable({
  date,
  phase,
  range,
}: PropsCalendar) {
  return (
    <TableRow>
      <TableCell width={30} align="left">
        {date}
      </TableCell>
      <TableCell width={30}>
        <MoonPhaseIcon moonPhase={phase} sizeIcon={30} />
      </TableCell>
      <TableCell width={20} align="left">
        {toNumber(phase).toFixed(0)}
      </TableCell>
      <TableCell align="left">{MoonPhaseState(phase)}</TableCell>
      <Hidden smDown={true}>
        <TableCell align="left">{toNumber(range).toFixed(0)}</TableCell>
      </Hidden>
    </TableRow>
  );
}
