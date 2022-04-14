import { Box, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { toNumber } from 'lodash';
import { useRecoilValue } from 'recoil';

import { yrSunriseState } from '../../recoil/yr_sunrise.state';
import DisplayLocation from './DisplayLocation';
import MoonPhaseIcon from './MoonPhaseIcon';
import MoonPhaseState from './MoonPhaseState';
import MoonCalendar from './MoonСalendar';

type RowDataProps = {
  cell1: any;
  cell2: any;
  ind: number;
};
function RowData({ cell1, cell2, ind }: RowDataProps) {
  return (
    <TableRow style={{ backgroundColor: ind % 2 ? "aliceblue" : "" }}>
      <TableCell align="left">
        <Box component="span" sx={{ textAlign: "left", fontSize: 16 }}>
          {cell1}
        </Box>
      </TableCell>
      <TableCell align="left">
        <Box
          component="span"
          sx={{ textAlign: "left", fontSize: 16, fontWeight: "bold" }}
        >
          {cell2}
        </Box>
      </TableCell>
    </TableRow>
  );
}

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

  // const phase = astroData[0].location.time[0].moonphase.value;
  const moonData = astroData[0].location.time[0];
  const arTableHead = [
    "Фаза",
    "Состояние",
    "Восход",
    "Заход",
    "Расстояние",
    "Высота",
    "Азимут",
  ];

  const arTableData = [
    toNumber(phaseMoon).toFixed(1),
    MoonPhaseState(phaseMoon),
    moonData.moonrise?.time.slice(11, -6) + " h",
    moonData.moonset?.time.slice(11, -6) + " h",
    toNumber(moonData.moonposition.range).toFixed(0) + " km",
    toNumber(moonData.moonposition.elevation).toFixed(0) + "°",
    toNumber(astroData[0].location.time[0].moonposition.azimuth).toFixed(0) +
      "°",
  ];

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
            <MoonPhaseIcon moonPhase={phaseMoon} sizeIcon={200} />
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
                  {/* Лунная таблица */}
                  {arTableHead.map((item, ind) => (
                    <RowData
                      key={ind}
                      cell1={item}
                      cell2={arTableData[ind]}
                      ind={ind}
                    />
                  ))}
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
