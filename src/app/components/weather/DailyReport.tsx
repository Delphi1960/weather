import _ from 'lodash';
import { useRecoilValue } from 'recoil';

import { yrWeatherState } from '../../recoil/yr_weather.state';
import GetWeatherApi from './GetWeatherApi';

export default function DailyReport() {
  GetWeatherApi();
  const loadWeather = useRecoilValue(yrWeatherState);

  const minDayTemp: any = [];
  const maxDayTemp: any = [];
  const maxDayWind: any = [];
  const averageHumidity: any = [];
  // const minDayWind: any = [];
  const maxDayPrecip: any = [];
  let ico00: any = [];
  let ico06: any = [];
  let ico12: any = [];
  let ico18: any = [];
  let temp = [];
  let wind = [];
  let humidity = [];
  let precip = 0;

  let dt = loadWeather.properties.timeseries[0].time.slice(0, 10);

  for (let i = 0; i < loadWeather.properties.timeseries.length; i++) {
    //============================================================================
    //определим переменные отвечающие за осадки
    let precip_next_1_hours =
      loadWeather?.properties?.timeseries[i]?.data.next_1_hours?.details
        ?.precipitation_amount;
    let precip_next_6_hours =
      loadWeather?.properties?.timeseries[i]?.data.next_6_hours?.details
        ?.precipitation_amount;
    //============================================================================

    let dt1 = loadWeather.properties.timeseries[i].time.slice(0, 10);
    if (dt === dt1) {
      //============================================================================
      //температура
      temp.push(
        Math.round(
          loadWeather.properties.timeseries[i].data.instant.details
            .air_temperature
        )
      );
      //============================================================================
      //скорость ветра
      wind.push(
        Math.round(
          loadWeather.properties.timeseries[i].data.instant.details.wind_speed
        )
      );
      //============================================================================
      //Подсчитаем количество осадков за день
      precip +=
        precip_next_1_hours !== undefined
          ? precip_next_1_hours
          : precip_next_6_hours;

      //============================================================================
      //относительная влажность
      humidity.push(
        loadWeather.properties.timeseries[i].data.instant.details
          .relative_humidity
      );
    } else {
      //============================================================================
      minDayTemp.push(_.min(temp));
      maxDayTemp.push(_.max(temp));
      //найдем максимумы и минимумы скорости ветра
      maxDayWind.push(_.max(wind));
      // minDayWind.push(_.min(wind));
      //найдем максимумы и минимумы количества осадков
      maxDayPrecip.push(precip);

      averageHumidity.push(_.mean(humidity));

      //============================================================================
      //Подсчитаем количество осадков за день - начало нового дня
      precip = 0;
      precip +=
        precip_next_1_hours !== undefined
          ? precip_next_1_hours
          : precip_next_6_hours;
      //============================================================================

      temp = [];
      wind = [];
      humidity = [];
      dt = loadWeather.properties.timeseries[i].time.slice(0, 10);
    }

    //============================================================================
    //загружаем иконки в массив через каждые 6 часов
    let dt0 = loadWeather.properties.timeseries[0].time.slice(11, 13);
    if (dt0 > "06") {
      ico00[0] = "noicon";
    }
    if (dt0 > "12") {
      ico06[0] = "noicon";
    }
    if (dt0 > "18") {
      ico12[0] = "noicon";
    }
    if (dt0 > "23") {
      ico18[0] = "noicon";
    }
    let symbol1 =
      loadWeather?.properties?.timeseries[i]?.data.next_1_hours?.summary
        ?.symbol_code;
    let symbol6 =
      loadWeather?.properties?.timeseries[i]?.data.next_6_hours?.summary
        ?.symbol_code;

    if (loadWeather.properties.timeseries[i].time.slice(11, 13) === "00") {
      ico00.push(symbol1 || symbol6 || "noicon");
    }
    if (loadWeather.properties.timeseries[i].time.slice(11, 13) === "06") {
      ico06.push(symbol1 || symbol6 || "noicon");
    }
    if (loadWeather.properties.timeseries[i].time.slice(11, 13) === "12") {
      ico12.push(symbol1 || symbol6 || "noicon");
    }
    if (loadWeather.properties.timeseries[i].time.slice(11, 13) === "18") {
      ico18.push(symbol1 || symbol6 || "noicon");
    }
    //============================================================================
  }
  //Добавим недостающие иконки пустым изображением
  if (ico00.length < 10) {
    ico00.push("noicon");
  }
  if (ico06.length < 10) {
    ico06.push("noicon");
  }
  if (ico12.length < 10) {
    ico12.push("noicon");
  }
  if (ico18.length < 10) {
    ico18.push("noicon");
  }

  minDayTemp.push(_.min(temp));
  maxDayTemp.push(_.max(temp));
  maxDayWind.push(_.max(wind));
  // minDayWind.push(_.min(wind));
  averageHumidity.push(_.mean(humidity));

  return {
    minDayTemp,
    maxDayTemp,
    maxDayWind,
    // minDayWind,
    maxDayPrecip,
    averageHumidity,
    ico00,
    ico06,
    ico12,
    ico18,
  };
}
