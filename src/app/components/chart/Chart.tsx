import { ArrowLeft, ArrowRight, CloseFullscreen, OpenInFull } from '@mui/icons-material'
import { Box, createTheme, Grid, IconButton, responsiveFontSizes, ThemeProvider } from '@mui/material'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

import { chartDateState } from '../../recoil/chartDate.state'
import DisplayLocation from '../weather/DisplayLocation'
import ChartAveraged from './ChartAveraged'
import ChartDetail from './ChartDetail'

export default function Chart() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  let dtNow = new Date();

  const [header, setHeader] = useState("Подробно");
  const [briefly, setBriefly] = useState(true);
  const [dtChart, setDtChart] = useRecoilState<Date | string>(chartDateState);

  const handleClick = () => {
    if (briefly) {
      setHeader("Кратко");
    } else {
      setHeader("Подробно");
    }
    setBriefly(!briefly);
  };

  let date = new Date();
  date.setDate(date.getDate() + 6);

  const handleRightClick = () => {
    if (dtChart < date) {
      dtNow = new Date(dtChart);
      dtNow.setDate(dtNow.getDate() + 1);
      setDtChart(dtNow);
    }
  };

  const handleLeftClick = () => {
    if (dtChart > new Date()) {
      dtNow = new Date(dtChart);

      dtNow.setDate(dtNow.getDate() - 1);
      setDtChart(dtNow);
    }
  };

  const dateChart = dtChart.toLocaleString("ru-RU").slice(0, -10);

  return (
    <ThemeProvider theme={theme}>
      {/* Показать место */}
      <DisplayLocation />
      <Grid container>
        <Grid item>
          <IconButton
            color="inherit"
            sx={{ ml: 2, fontSize: 12 }}
            aria-label="expand row"
            // size="small"
            onClick={handleClick}
          >
            {briefly ? <OpenInFull /> : <CloseFullscreen />}
            {header}
          </IconButton>
        </Grid>
        <Grid item>
          {!briefly ? (
            <Box sx={{ fontSize: 14 }}>
              <IconButton
                color="inherit"
                // sx={{ fontSize: 10 }}
                onClick={handleLeftClick}
                size="large"
              >
                <ArrowLeft />
              </IconButton>
              {dateChart}
              <IconButton
                color="inherit"
                // sx={{ fontSize: 10 }}
                onClick={handleRightClick}
                size="large"
              >
                <ArrowRight />
              </IconButton>
            </Box>
          ) : null}
        </Grid>
      </Grid>
      {briefly ? <ChartAveraged /> : <ChartDetail dtChart={dateChart} />}
    </ThemeProvider>
  );
}
