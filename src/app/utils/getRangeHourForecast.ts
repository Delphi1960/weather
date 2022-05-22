import _ from 'lodash'

import { YrWeather } from '../types/yr_weather.type'

export default function getRangeTimeHourForecast(weatherData: YrWeather) {
  // ===================================================
  function expandedTime(weatherData: YrWeather) {
    let tmp: any = [];
    let result: any[] = [];
    const arDateTime: any = [];

    let dat = new Date(weatherData.properties.timeseries[0].time)
      .toLocaleString("ru-RU")
      .slice(0, 10);

    for (let i = 0; i < weatherData.properties.timeseries.length; i++) {
      let dt = new Date(
        weatherData.properties.timeseries[i].time
      ).toLocaleString("ru-RU");
      let dat1 = dt.slice(0, 10);

      if (dat !== dat1) {
        result.push(tmp);
        let dateTime = {
          date: dat,
          time: tmp,
        };
        arDateTime.push(dateTime);
        dat = dat1;
        tmp = [];
      }

      let hour = dt.slice(12, 14);
      tmp.push(hour);
    }
    // console.log(arDateTime);
    return arDateTime;
  }
  // ===================================================
  function getRangeHours(arHours: any[]) {
    let hours: any[] = [];
    const days: any[] = [];
    const hoursCount: any[] = [];

    for (let i = 0; i < arHours.length; i++) {
      let tmp = arHours[i].time;
      hoursCount.push(tmp.length);
      hours = [];

      if (i === 0 || i === 1 || i === 2) {
        for (let j = 0; j < tmp.length; j++) {
          if (tmp[0] >= "00" && tmp[j] === "06") {
            hours.push(tmp[0] + "-06");
            hours.push("06-12");
            hours.push("12-18");
            hours.push("18-" + tmp[tmp.length - 1]);
          }
          if (tmp[0] >= "06" && tmp[0] !== "12" && tmp[j] === "12") {
            hours.push(tmp[0] + "-12");
            hours.push("12-18");
            hours.push("18-" + tmp[tmp.length - 1]);
          }
          if (tmp[0] >= "12" && tmp[0] !== "18" && tmp[j] === "18") {
            hours.push(tmp[0] + "-18");
            hours.push("18-" + tmp[tmp.length - 1]);
          }
          if (tmp[0] >= "18" && tmp[0] !== "23" && tmp[j] === "23") {
            hours.push(tmp[0] + "-" + tmp[tmp.length - 1]);
          }
        }
      }

      if (i === 3) {
        for (let j = 0; j < tmp.length; j++) {
          let a: string;
          a = (+tmp[j] + 6).toFixed();
          if (a.length < 2) a = "0" + a;
          let res = tmp.indexOf(a);
          if (res !== -1) {
            hours.push(tmp[j] + "-" + tmp[res]);
            j = res - 1;
          }
        }
        let last = (+tmp[tmp.length - 1] + 6 - 24).toFixed();
        if (last.length < 2) last = "0" + last;
        hours.push(tmp[tmp.length - 1] + "-" + last);
      }

      if (i >= 4) {
        hours.push(tmp[0] + "-" + tmp[1]);
        hours.push(tmp[1] + "-" + tmp[2]);
        hours.push(tmp[2] + "-" + tmp[3]);
        hours.push(tmp[3] + "-" + tmp[0]);
      }
      // hoursCount.push(hours.length)
      hours.unshift(arHours[i].date);
      days.push(hours);
    }
    let getRangeTime = days;
    return { getRangeTime, hoursCount };
  }
  // ===================================================
  function getDayForecast(
    weatherData: YrWeather,
    dateIso: string,
    dateIso1: string
  ) {
    let data;
    let windSpeed = [];
    let maxWindSpeed;
    let temperature = [];
    let averageTemp;
    // Подсчитаем количество осадков в диапазоне времени
    let precipitation = 0;
    for (let i = 0; i < weatherData.properties.timeseries.length; i++) {
      if (
        weatherData.properties.timeseries[i].time >= dateIso &&
        weatherData.properties.timeseries[i].time < dateIso1
      ) {
        weatherData?.properties?.timeseries[i]?.data.next_1_hours?.details
          ?.precipitation_amount !== undefined
          ? (precipitation =
              precipitation +
              weatherData?.properties?.timeseries[i]?.data.next_1_hours?.details
                ?.precipitation_amount)
          : (precipitation =
              precipitation +
              weatherData?.properties?.timeseries[i]?.data.next_6_hours?.details
                ?.precipitation_amount);
        // Подсчитаем max скорость ветра в диапазоне времени
        windSpeed.push(
          weatherData?.properties?.timeseries[i]?.data.instant.details
            .wind_speed
        );
        temperature.push(
          weatherData?.properties?.timeseries[i]?.data.instant.details
            .air_temperature
        );
      }
    }
    averageTemp = _.mean(temperature);
    // Подсчитаем max скорость ветра в диапазоне времени
    maxWindSpeed = _.max(windSpeed);
    // console.log(dateIso + "-" + dateIso1, maxWindSpeed);

    for (let i = 0; i < weatherData.properties.timeseries.length; i++) {
      if (weatherData.properties.timeseries[i].time === dateIso) {
        data = weatherData.properties.timeseries[i].data.instant.details;

        // let precip_next_1_hours =
        //   weatherData?.properties?.timeseries[i]?.data.next_1_hours?.details
        //     ?.precipitation_amount;
        // let precip_next_6_hours =
        //   weatherData?.properties?.timeseries[i]?.data.next_6_hours?.details
        //     ?.precipitation_amount;

        return {
          icon:
            weatherData?.properties?.timeseries[i]?.data.next_1_hours?.summary
              ?.symbol_code ||
            weatherData?.properties?.timeseries[i]?.data.next_6_hours?.summary
              ?.symbol_code ||
            "noicon",

          cloud_area_fraction: Math.round(data?.cloud_area_fraction),
          air_temperature: Math.round(averageTemp),
          // air_temperature: Math.round(data?.air_temperature),
          // wind_speed: Math.round(data?.wind_speed),
          wind_speed: Math.round(maxWindSpeed!),
          wind_from_direction: Math.round(data?.wind_from_direction),
          relative_humidity: Math.round(data?.relative_humidity),
          air_pressure_at_sea_level: Math.round(
            data?.air_pressure_at_sea_level * 0.75
          ),

          pricip: precipitation.toFixed(1),
          // precip_next_1_hours !== undefined
          //   ? precip_next_1_hours
          //   : precip_next_6_hours,
        };
      }
    }
  }
  // ===================================================
  function convertDate(dt: string) {
    let year = dt.slice(6);
    let month = dt.slice(3, 5);
    let day = dt.slice(0, 2);
    return year + "-" + month + "-" + day;
  }
  // ===================================================
  const resultWeather: any[] = [];
  const { getRangeTime, hoursCount } = getRangeHours(expandedTime(weatherData));
  let dateIso, dateIso1;
  let arDateTime: any = [];

  for (let i = 0; i < getRangeTime.length; i++) {
    let dt = convertDate(getRangeTime[i][0]);
    // console.log(getRangeTime[i][0]);
    for (let j = 1; j < getRangeTime[i].length; j++) {
      // console.log(getRangeTime[i][j]);

      let tm = getRangeTime[i][j].slice(0, 2);
      let tm1 = getRangeTime[i][j].slice(3);
      let date = new Date(dt + " " + tm + ":00:00");
      let date1 = new Date(dt + " " + tm1 + ":00:00");

      dateIso = date.toISOString().slice(0, 19) + "Z";
      dateIso1 = date1.toISOString().slice(0, 19) + "Z";
      // console.log(dateIso, dateIso1);
      let data = getDayForecast(weatherData, dateIso, dateIso1);
      let dataWeather = {
        time: getRangeTime[i][j],
        icon: data?.icon,
        cloud_area_fraction: data?.cloud_area_fraction,
        air_temperature: data?.air_temperature,
        wind_speed: data?.wind_speed,
        wind_from_direction: data?.wind_from_direction,
        relative_humidity: data?.relative_humidity,
        air_pressure_at_sea_level: data?.air_pressure_at_sea_level,
        pricip: data?.pricip,
      };
      // console.log(dataWeather);
      arDateTime.push(dataWeather);
    }
    let forecast = {
      date:
        new Date(convertDate(getRangeTime[i][0])).toISOString().slice(0, 19) +
        "Z",
      dataTime: arDateTime,
      hoursCount: hoursCount[i],
    };
    arDateTime = [];
    resultWeather.push(forecast);
  }
  // console.log(resultWeather);
  return resultWeather;
}
