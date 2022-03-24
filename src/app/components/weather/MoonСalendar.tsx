import { Expand, ExpandCircleDown } from '@mui/icons-material';
import { Collapse, IconButton, TableBody, TableCell } from '@mui/material';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/system/Box';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { yrSunriseState } from '../../recoil/yr_sunrise.state';
import MoonCalendarTable from './MoonCalendarTable';

// type PropsCalendar = {
//   date: string;
//   icon: string;
//   phase: string;
//   state: string;
// };

export default function MoonСalendar() {
  const [open, setOpen] = React.useState(false);
  const astroData = useRecoilValue(yrSunriseState);
  if (!astroData) return <Box>Нет данных</Box>;
  // const date = astroData[0].location.time[0].date.slice(0, 10);
  function dt(date: string) {
    return date.slice(8, 10) + "." + date.slice(5, 7);
  }
  // const phase = astroData[0].location.time[0].moonphase.value;

  return (
    <Box>
      <Table aria-label="collapsible table">
        <TableBody>
          <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell>
                <IconButton
                  sx={{ width: 30 }}
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <Expand /> : <ExpandCircleDown />}
                </IconButton>
              </TableCell>
              <TableCell colSpan={4}>Лунный календарь</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={10}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  {astroData.map((item, i) => (
                    <MoonCalendarTable
                      key={i}
                      date={dt(item.location.time[0].moonphase.time)}
                      phase={item.location.time[0].moonphase.value}
                    />
                  ))}
                </Collapse>
              </TableCell>
            </TableRow>

            {/*  */}
          </React.Fragment>
        </TableBody>
      </Table>
    </Box>
  );
}
