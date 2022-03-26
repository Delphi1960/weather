import { Expand, ExpandCircleDown } from '@mui/icons-material';
import { Collapse, Hidden, IconButton, TableBody, TableCell, TableHead } from '@mui/material';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/system/Box';
import React from 'react';

import MoonCalendarTable from './MoonCalendarTable';

export default function MoonСalendar() {
  const [open, setOpen] = React.useState(false);

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
              <TableCell
                colSpan={4}
                align="left"
                sx={{ fontSize: 14, fontWeight: "bold" }}
              >
                Лунный календарь (для 00h 00m 00s)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={10}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Table
                    size="small"
                    aria-label="purchases"
                    sx={{ ml: -1, mr: -1 }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          sx={{ fontSize: 14, fontWeight: "bold" }}
                        >
                          Дата
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ fontSize: 14, fontWeight: "bold" }}
                        >
                          Вид
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ fontSize: 14, fontWeight: "bold" }}
                        >
                          Фаза
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ fontSize: 14, fontWeight: "bold" }}
                        >
                          Состояние
                        </TableCell>
                        <Hidden smDown={true}>
                          <TableCell
                            align="left"
                            sx={{ fontSize: 14, fontWeight: "bold" }}
                          >
                            Восход
                          </TableCell>
                        </Hidden>
                        <Hidden smDown={true}>
                          <TableCell
                            align="left"
                            sx={{ fontSize: 14, fontWeight: "bold" }}
                          >
                            Заход
                          </TableCell>
                        </Hidden>
                        <Hidden smDown={true}>
                          <TableCell
                            align="left"
                            sx={{ fontSize: 14, fontWeight: "bold" }}
                          >
                            Расстояние
                          </TableCell>
                        </Hidden>
                      </TableRow>
                    </TableHead>

                    <MoonCalendarTable />
                  </Table>
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
