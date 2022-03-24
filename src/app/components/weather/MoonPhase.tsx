import { CircularProgress, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { toNumber } from 'lodash';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { loadState } from '../../recoil/load.state';
import { yrSunriseState } from '../../recoil/yr_sunrise.state';
import { nameLocation } from '../../recoil/yr_weather.state';
import GetSunriseApi from './GetSunriseApi';
import MoonPhaseIcon from './MoonPhaseIcon';
import MoonPhaseState from './MoonPhaseState';
import MoonCalendar from './MoonСalendar';

export default function MoonPhase() {
  // const navigate = useNavigate();
  const place = useRecoilValue(nameLocation);
  GetSunriseApi(30);
  const isLoading = useRecoilValue(loadState);
  const astroData = useRecoilValue(yrSunriseState);
  if (!astroData) return <Box>Нет данных</Box>;
  // for (let i = 0; i < 50; i++) {
  //   console.log(
  //     astroData[i].location.time[0].moonphase.desc,
  //     astroData[i].location.time[0].moonphase.time.slice(0, 10)
  //   );
  // }
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
    <Box>
      {isLoading ? (
        <Box>
          <CircularProgress />
          <br />
          <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
            Загрузка данных...
          </Box>
        </Box>
      ) : (
        <Paper
          sx={{
            margin: "auto",
            maxWidth: 800,
            flexGrow: 1,
          }}
        >
          <Box component="div" sx={{ ml: 2, textAlign: "left" }}>
            <Box component="span" sx={{ textAlign: "left", color: "black" }}>
              Location:{" "}
            </Box>
            <Box
              component="span"
              sx={{
                textAlign: "left",
                color: "blue",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              {place}
            </Box>
          </Box>

          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <MoonPhaseIcon moonPhase={phase} sizeIcon={200} />
            </Grid>

            <Grid item></Grid>
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
                  <Typography variant="h6" gutterBottom>
                    {dt}
                  </Typography>
                </Grid>
                <Grid item>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell align="left">Фаза:</TableCell>
                        <TableCell>
                          {toNumber(phase).toFixed(1)}(
                          {MoonPhaseState(phaseMoon)})
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
      )}
    </Box>
  );
}
