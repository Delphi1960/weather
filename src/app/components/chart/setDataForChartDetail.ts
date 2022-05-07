import { YrWeather } from '../../types/yr_weather.type'

export default function setDataForChartDetail(
  weatherData: YrWeather,
  dtChart: string
) {
  const dataTemperature = [];
  const dataWindSpeed: any = [];
  const dataCloud = [];
  const dataPrecip = [];
  const dataAirPressure = [];

  for (let i = 0; i < weatherData?.properties.timeseries.length; i++) {
    let dt1 = new Date(
      weatherData?.properties.timeseries[i].time
    ).toLocaleDateString("ru-RU");

    if (dt1 === dtChart) {
      let dtDay = `${new Date(
        weatherData?.properties.timeseries[i].time
      ).toLocaleString("ru-RU", {
        day: "numeric",
        month: "2-digit",
      })}`;

      let dtTime = `${new Date(
        weatherData?.properties.timeseries[i].time
      ).toLocaleString("ru-RU", { hour: "2-digit" })}`;

      // Температура
      dataTemperature.push({
        day: dtDay,
        time: dtTime + "h",
        temp: Math.round(
          weatherData?.properties.timeseries[i].data.instant.details
            .air_temperature
        ),
      });

      // Скорость ветра
      dataWindSpeed.push({
        day: dtDay,
        time: dtTime + "h",
        windSpeed: Math.round(
          weatherData?.properties.timeseries[i].data.instant.details.wind_speed
        ),
        windDirection: Math.round(
          weatherData?.properties.timeseries[i].data.instant.details
            .wind_from_direction
        ),
      });

      // Облачность
      dataCloud.push({
        day: dtDay,
        time: dtTime + "h",
        cloud:
          weatherData?.properties.timeseries[i].data.instant.details
            .cloud_area_fraction,
      });

      // Осадки
      dataPrecip.push({
        day: dtDay,
        time: dtTime + "h",
        precipitation:
          weatherData?.properties?.timeseries[i]?.data.next_1_hours?.details
            ?.precipitation_amount !== undefined
            ? weatherData?.properties?.timeseries[i]?.data.next_1_hours?.details
                ?.precipitation_amount
            : weatherData?.properties?.timeseries[i]?.data.next_6_hours?.details
                ?.precipitation_amount,
      });

      // Давление
      dataAirPressure.push({
        day: dtDay,
        time: dtTime + "h",
        pressure: Math.round(
          weatherData.properties.timeseries[i].data.instant.details
            .air_pressure_at_sea_level * 0.75
        ),
      });
    }
  }

  return {
    dataTemperature,
    dataWindSpeed,
    dataCloud,
    dataPrecip,
    dataAirPressure,
  };
}
