import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';

import { nameLocation } from '../../recoil/location.state';
import { yrWeatherState } from '../../recoil/yr_weather.state';
import dailyReport from '../../utils/dailyReport';
import ChartTemperature from './ChartTemperature';

export default function Chart() {
  const place = useRecoilValue(nameLocation);
  const weatherData = useRecoilValue(yrWeatherState)!;
  const { minDayTemp, maxDayTemp } = dailyReport(weatherData);

  // const dataTemp: any = [];
  const dataAirPressure: any = [];

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
  console.log(arDate);

  function setDataForChart() {
    let temp = [];
    for (let i = 0; i < arDate.length; i++) {
      temp.push({
        day: `${new Date(arDate[i]).toLocaleString("ru-RU", {
          day: "numeric",
          month: "short",
        })}`,
        t_min: minDayTemp[i],
        t_max: maxDayTemp[i],
      });
    }
    return temp;
  }
  console.log(setDataForChart());
  let dataTemp = setDataForChart();

  // weatherData?.properties.timeseries
  //   .filter(function (item, ind) {
  //     let dt1;
  //     let dt2;
  //     if (ind === 0) {
  //       dt1 = new Date(weatherData?.properties.timeseries[ind].time);
  //       return dt1.toLocaleDateString();
  //     } else {
  //       dt1 = new Date(weatherData?.properties.timeseries[ind - 1].time);
  //     }
  //     dt2 = new Date(weatherData?.properties.timeseries[ind].time);
  //     return dt1.toLocaleDateString() !== dt2.toLocaleDateString();
  //   })
  //   .map((daily, ind) =>
  //     dataTemp.push({
  //       day: `${new Date(daily.time).toLocaleString("ru-RU", {
  //         day: "numeric",
  //         month: "short",
  //       })}`,
  //       t_min: minDayTemp[ind],
  //       t_max: maxDayTemp[ind],
  //     })
  //   );

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Box>
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

        {/* CHART */}
        <ChartTemperature dataTemp={dataTemp} />
      </Box>
    </ThemeProvider>
  );
}
