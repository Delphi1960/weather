import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { toNumber } from 'lodash';
import { useRecoilValue } from 'recoil';

import { nameLocation } from '../../recoil/location.state';
import { yrSunriseState } from '../../recoil/yr_sunrise.state';
import DisplayLocation from './DisplayLocation';
import MoonPhaseIcon from './MoonPhaseIcon';
import MoonPhaseState from './MoonPhaseState';
import MoonCalendar from './MoonСalendar';

export default function MoonPhase() {
  // const navigate = useNavigate();
  const place = useRecoilValue(nameLocation);
  const astroData = useRecoilValue(yrSunriseState)!;
  const phaseMoon = astroData[0].location.time[0].moonphase.value;

  let date = new Date();
  let dt = date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const phase = astroData[0].location.time[0].moonphase.value;
  return (
    <Paper
      sx={{
        margin: "auto",
        maxWidth: 800,
        flexGrow: 1,
      }}
    >
      <DisplayLocation />

      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm container>
          <Grid
            item
            xs
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <MoonPhaseIcon moonPhase={phase} sizeIcon={200} />
          </Grid>
        </Grid>

        <Grid item xs={12} sm container>
          <Grid
            item
            xs
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <Grid item xs>
              <Typography variant="h6">{dt}</Typography>
              <Typography
                variant="body2"
                textAlign={"center"}
                fontStyle={"italic"}
              >
                (для 00h 00m 00s)
              </Typography>
            </Grid>
            <Grid item>
              <Table size="small">
                <TableBody>
                  <TableRow style={{ backgroundColor: "aliceblue" }}>
                    <TableCell
                      align="left"
                      sx={{ textAlign: "left", fontSize: 16 }}
                    >
                      Фаза:
                    </TableCell>
                    <TableCell sx={{ textAlign: "left", fontSize: 16 }}>
                      {toNumber(phase).toFixed(1)}({MoonPhaseState(phaseMoon)})
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{ textAlign: "left", fontSize: 16 }}
                    >
                      Восход:
                    </TableCell>
                    <TableCell sx={{ textAlign: "left", fontSize: 16 }}>
                      {astroData[0].location.time[0].moonrise?.time.slice(
                        11,
                        -6
                      )}{" "}
                      h
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ backgroundColor: "aliceblue" }}>
                    <TableCell
                      align="left"
                      sx={{ textAlign: "left", fontSize: 16 }}
                    >
                      Заход:
                    </TableCell>
                    <TableCell sx={{ textAlign: "left", fontSize: 16 }}>
                      {astroData[0].location.time[0].moonset?.time.slice(
                        11,
                        -6
                      )}{" "}
                      h
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{ textAlign: "left", fontSize: 16 }}
                    >
                      Расстояние:
                    </TableCell>
                    <TableCell sx={{ textAlign: "left", fontSize: 16 }}>
                      {toNumber(
                        astroData[0].location.time[0].moonposition.range
                      ).toFixed(0)}{" "}
                      км
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ backgroundColor: "aliceblue" }}>
                    <TableCell
                      align="left"
                      sx={{ textAlign: "left", fontSize: 16 }}
                    >
                      Высота:
                    </TableCell>
                    <TableCell sx={{ textAlign: "left", fontSize: 16 }}>
                      {toNumber(
                        astroData[0].location.time[0].moonposition.elevation
                      ).toFixed(0)}
                      °
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{ textAlign: "left", fontSize: 16 }}
                    >
                      Азимут:
                    </TableCell>
                    <TableCell sx={{ textAlign: "left", fontSize: 16 }}>
                      {toNumber(
                        astroData[0].location.time[0].moonposition.azimuth
                      ).toFixed(0)}
                      °
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MoonCalendar />
    </Paper>
  );
}
