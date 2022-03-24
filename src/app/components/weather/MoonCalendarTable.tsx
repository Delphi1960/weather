import { TableBody } from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { toNumber } from 'lodash';
import React from 'react';

import MoonPhaseIcon from './MoonPhaseIcon';
import MoonPhaseState from './MoonPhaseState';

type PropsCalendar = {
  date: string;
  phase: string;
};

export default function MoonCalendarTable({ date, phase }: PropsCalendar) {
  return (
    <Table size="small" aria-label="purchases" sx={{ ml: -1, mr: -1 }}>
      <TableHead>
        <TableRow>
          <TableCell>Дата</TableCell>
          <TableCell>Вид</TableCell>
          <TableCell>Фаза</TableCell>
          <TableCell>Состояние</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
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
        </TableRow>
      </TableBody>
    </Table>
  );
}
