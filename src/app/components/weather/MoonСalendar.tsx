import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Hidden, IconButton, Link, TableBody, TableCell, TableHead } from '@mui/material';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/system/Box';
import React from 'react';

import MoonCalendarTable from './MoonCalendarTable';

export default function MoonСalendar() {
  const [open, setOpen] = React.useState(false);
  const [header, setHeader] = React.useState(
    "Лунный календарь (для 00h 00m 00s)"
  );
  const handleClick = () => {
    setOpen(!open);
    if (open !== true) {
      setHeader("Закрыть");
    } else {
      setHeader("Лунный календарь (для 00h 00m 00s)");
    }
  };

  return (
    <Box>
      <Table aria-label="collapsible table">
        <TableBody>
          <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell align="center">
                <Link
                  underline="none"
                  component="button"
                  variant="body2"
                  onClick={handleClick}
                >
                  {header}
                </Link>
                <IconButton
                  sx={{ width: 30 }}
                  aria-label="expand row"
                  size="small"
                  onClick={handleClick}
                >
                  {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
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
                      <TableRow style={{ backgroundColor: "lightcyan" }}>
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
            {/* Иконка "Закрыть" в конце раскрывающейся таблицы*/}
            {open ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Link
                    underline="none"
                    component="button"
                    variant="body2"
                    onClick={handleClick}
                  >
                    Закрыть
                  </Link>
                  <IconButton
                    sx={{ width: 20 }}
                    aria-label="expand row"
                    size="small"
                    onClick={handleClick}
                  >
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>{" "}
                </TableCell>
              </TableRow>
            ) : null}

            {/*  */}
          </React.Fragment>
        </TableBody>
      </Table>
    </Box>
  );
}
