import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material'
import { useRecoilValue } from 'recoil'

import { yrWeatherState } from '../../recoil/yr_weather.state'
import dailyReport from '../../utils/dailyReport'
import DisplayLocation from '../weather/DisplayLocation'
import ChartAirPressure from './ChartAirPressure'
import ChartCloud from './ChartCloud'
import ChartPrecipitationAmount from './ChartPrecipitationAmount'
import ChartTemperature from './ChartTemperature'
import ChartWind from './ChartWind'

export default function Chart() {
  const weatherData = useRecoilValue(yrWeatherState)!;
  const {
    minDayTemp,
    maxDayTemp,
    averagePres,
    maxDayPrecip,
    cloudiness,
    maxDayWind,
  } = dailyReport(weatherData);

  // console.log(cloudiness);

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
    let dataWind = [];
    let dataCloud = [];
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
      // console.log(maxDayPrecip[i]);

      dataWind.push({
        day: `${new Date(arDate[i]).toLocaleString("ru-RU", {
          day: "numeric",
          month: "2-digit",
        })}`,
        wind: maxDayWind[i],
      });

      dataCloud.push({
        day: `${new Date(arDate[i]).toLocaleString("ru-RU", {
          day: "numeric",
          month: "2-digit",
        })}`,
        cloud: cloudiness[i],
      });
    }
    return {
      dataTemperature,
      dataAirPressure,
      dataPrecip,
      dataWind,
      dataCloud,
    };
  }

  const {
    dataTemperature,
    dataAirPressure,
    dataPrecip,
    dataWind,
    dataCloud,
  }: any = setDataForChart();

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      {/* Показать место */}
      <DisplayLocation />

      {/* CHART Max and Min temperature */}
      <ChartTemperature dataTemp={dataTemperature} />

      {/* Ветер */}
      <ChartWind dataWind={dataWind} />

      {/* Осадки */}
      <ChartPrecipitationAmount dataPrecip={dataPrecip} />

      {/* Атмосферное давление */}
      <ChartAirPressure dataPres={dataAirPressure} />

      {/* Облачность */}
      <ChartCloud dataCloud={dataCloud} />
    </ThemeProvider>
  );
}
