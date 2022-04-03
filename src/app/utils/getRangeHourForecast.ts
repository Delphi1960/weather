// import _ from 'lodash';
import { YrWeather } from '../types/yr_weather.type';

export default function getRangeHourForecast(weatherData: YrWeather) {
  const res: any[] = [];

  function getDayForecast(weatherData: YrWeather, dtISO: string) {
    let data;
    for (let i = 0; i < weatherData.properties.timeseries.length; i++) {
      if (weatherData.properties.timeseries[i].time === dtISO) {
        data = weatherData.properties.timeseries[i].data.instant.details;
      }
    }
    return {
      cloud_area_fraction: data?.cloud_area_fraction,
      air_temperature: data?.air_temperature,
      wind_speed: data?.wind_speed,
      wind_from_direction: data?.wind_from_direction,
      relative_humidity: data?.relative_humidity,
      air_pressure_at_sea_level: data?.air_pressure_at_sea_level,
    };
  }

  function convertDate(dt: string) {
    let year = dt.slice(6);
    let month = dt.slice(3, 5);
    let day = dt.slice(0, 2);
    return year + "-" + month + "-" + day;
  }

  const getRange = getRangeHours(expandedTime(weatherData));
  let dateISO;
  let arDateTime: any = [];

  for (let i = 0; i < getRange.length; i++) {
    let dt = convertDate(getRange[i][0]);

    for (let j = 1; j < getRange[i].length; j++) {
      let tm = getRange[i][j].slice(0, 2);
      let date = new Date(dt + " " + tm + ":00:00");

      dateISO = date.toISOString().slice(0, 19) + "Z";
      let data = getDayForecast(weatherData, dateISO);
      let dataWeather = {
        time: getRange[i][j],
        cloud_area_fraction: data?.cloud_area_fraction,
        air_temperature: data?.air_temperature,
        wind_speed: data?.wind_speed,
        wind_from_direction: data?.wind_from_direction,
        relative_humidity: data?.relative_humidity,
        air_pressure_at_sea_level: data?.air_pressure_at_sea_level,
      };

      arDateTime.push(dataWeather);
    }
    let forecast = {
      date:
        new Date(convertDate(getRange[i][0]) + " 00:00:00")
          .toISOString()
          .slice(0, 19) + "Z",
      dataTime: arDateTime,
    };
    arDateTime = [];
    res.push(forecast);
  }

  return res;
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
    return arDateTime;
  }

  // ===================================================
  function getRangeHours(arHours: any[]) {
    let hours: any[] = [];
    const days: any[] = [];

    for (let i = 0; i < arHours.length; i++) {
      let tmp = arHours[i].time;
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
      hours.unshift(arHours[i].date);
      days.push(hours);
    }
    return days;
  }
}
