import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';

import { nameLocation } from '../../recoil/location.state';
import { yrWeatherState } from '../../recoil/yr_weather.state';
import dailyReport from '../../utils/dailyReport';
import ChartAirPressure from './ChartAirPressure';
import ChartPrecipitationAmount from './ChartPrecipitationAmount';
import ChartTemperature from './ChartTemperature';

export default function Chart() {
  const place = useRecoilValue(nameLocation);
  const weatherData = useRecoilValue(yrWeatherState)!;
  const { minDayTemp, maxDayTemp, averagePres, maxDayPrecip } =
    dailyReport(weatherData);

  function getDate() {
    let dat = weatherData.properties.timeseries[0].time.slice(0, 10);

    let result: any[] = [];
    result.push(dat);
    for (let i = 0; i < weatherData?.properties.timeseries.length; i++) {
      let dat1 = weatherData.properties.timeseries[i].time.slice(0, 10);

      if (dat !== dat1) {
        dat = dat1;
        result.push(dat);
      }
    }
    return result;
  }
  const arDate = getDate();
  // console.log(arDate);

  function setDataForChart() {
    let dataTemperature = [];
    let dataAirPressure = [];
    let dataPrecip = [];
    for (let i = 0; i < arDate.length - 1; i++) {
      dataTemperature.push({
        day: `${new Date(arDate[i]).toLocaleString("ru-RU", {
          day: "numeric",
          month: "2-digit",
        })}`,
        t_min: minDayTemp[i],
        t_max: maxDayTemp[i],
      });

      dataAirPressure.push({
        day: `${new Date(arDate[i]).toLocaleString("ru-RU", {
          day: "numeric",
          month: "2-digit",
        })}`,
        pressure: Math.round(averagePres[i]),
      });

      dataPrecip.push({
        day: `${new Date(arDate[i]).toLocaleString("ru-RU", {
          day: "numeric",
          month: "2-digit",
        })}`,
        precipitation: maxDayPrecip[i].toFixed(1),
      });
    }
    return { dataTemperature, dataAirPressure, dataPrecip };
  }

  const { dataTemperature, dataAirPressure, dataPrecip }: any =
    setDataForChart();

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box component="div" sx={{ ml: 2, mt: -1, mb: 1, textAlign: "left" }}>
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

        {/* CHART Max and Min temperature */}
        <ChartTemperature dataTemp={dataTemperature} />
        {/* Атмосферное давление */}
        <ChartAirPressure dataPres={dataAirPressure} />
        {/* Осадки */}
        <ChartPrecipitationAmount dataPrecip={dataPrecip} />
      </Box>
    </ThemeProvider>
  );
}
