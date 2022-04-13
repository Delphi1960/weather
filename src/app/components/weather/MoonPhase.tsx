import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { toNumber } from 'lodash';
import { useRecoilValue } from 'recoil';

import { yrSunriseState } from '../../recoil/yr_sunrise.state';
import DisplayLocation from './DisplayLocation';
import MoonPhaseIcon from './MoonPhaseIcon';
import MoonPhaseState from './MoonPhaseState';
import MoonCalendar from './MoonСalendar';

export default function MoonPhase() {
  // const navigate = useNavigate();
  // const place = useRecoilValue(nameLocation);
  const astroData = useRecoilValue(yrSunriseState)!;
  const phaseMoon = astroData[0].location.time[0].moonphase.value;

  let date = new Date();
  let dt = date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  type CellStyle = {
    value: string;
    value1?: any;
  };
  function TableCellStyle({ value, value1 = "" }: CellStyle) {
    return (
      <TableCell align="left" sx={{ textAlign: "left", fontSize: 16 }}>
        {value}
        {value1}
      </TableCell>
    );
  }

  const phase = astroData[0].location.time[0].moonphase.value;
  const moonData = astroData[0].location.time[0];
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
              <Typography variant="h6" color={"blue"}>
                {dt}
              </Typography>
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
                    <TableCellStyle value={"Фаза:"} />
                    <TableCellStyle
                      value={toNumber(phase).toFixed(1) + " "}
                      value1={MoonPhaseState(phaseMoon)}
                    />
                  </TableRow>

                  <TableRow>
                    <TableCellStyle value={"Восход:"} />
                    <TableCellStyle
                      value={moonData.moonrise?.time.slice(11, -6)}
                      value1={" h"}
                    />
                  </TableRow>

                  <TableRow style={{ backgroundColor: "aliceblue" }}>
                    <TableCellStyle value={"Заход:"} />
                    <TableCellStyle
                      value={moonData.moonset?.time.slice(11, -6)}
                      value1={" h"}
                    />
                  </TableRow>

                  <TableRow>
                    <TableCellStyle value={"Расстояние:"} />
                    <TableCellStyle
                      value={toNumber(moonData.moonposition.range).toFixed(0)}
                      value1={" км"}
                    />
                  </TableRow>

                  <TableRow style={{ backgroundColor: "aliceblue" }}>
                    <TableCellStyle value={"Высота:"} />
                    <TableCellStyle
                      value={toNumber(moonData.moonposition.elevation).toFixed(
                        0
                      )}
                      value1={"°"}
                    />
                  </TableRow>
                  <TableRow>
                    <TableCellStyle value={"Азимут:"} />
                    <TableCellStyle
                      value={toNumber(
                        astroData[0].location.time[0].moonposition.azimuth
                      ).toFixed(0)}
                      value1={"°"}
                    />
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
