import { YrWeather } from '../../types/yr_weather.type'
import dailyReport from '../../utils/dailyReport'

export default function setDataForChart(weatherData: YrWeather) {
  const {
    minDayTemp,
    maxDayTemp,
    averagePres,
    maxDayPrecip,
    cloudiness,
    maxDayWind,
    averageWindDir,
    averageHumidity,
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

  let dataTemperature = [];
  let dataAirPressure = [];
  let dataPrecip = [];
  let dataWindSpeed = [];
  let dataCloud = [];
  let dataAverageHumidity = [];
  // let dataCloudIcon = [];
  for (let i = 0; i < arDate.length - 1; i++) {
    let dtDay = `${new Date(arDate[i]).toLocaleString("ru-RU", {
      day: "numeric",
      month: "2-digit",
    })}`;

    dataTemperature.push({
      day: dtDay,
      t_min: minDayTemp[i],
      t_max: maxDayTemp[i],
    });

    dataAirPressure.push({
      day: dtDay,
      pressure: Math.round(averagePres[i]),
    });

    dataPrecip.push({
      day: dtDay,
      precipitation: maxDayPrecip[i].toFixed(1),
    });

    dataWindSpeed.push({
      day: dtDay,
      windSpeed: maxDayWind[i],
      windDirection: averageWindDir[i],
    });

    dataCloud.push({
      day: dtDay,
      cloud: cloudiness[i],
      // precipitation: maxDayPrecip[i].toFixed(1),
    });

    dataAverageHumidity.push({
      day: dtDay,
      humidity: averageHumidity[i],
    });
  }
  return {
    dataTemperature,
    dataAirPressure,
    dataPrecip,
    dataWindSpeed,
    dataCloud,
    dataAverageHumidity,
  };
}
