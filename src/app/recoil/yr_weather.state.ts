import { atom } from 'recoil';

export const yrWeatherState = atom({
  key: "yrWeatherState",
  default: {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [30.7414, 46.4725, 42],
    },
    properties: {
      meta: {
        updated_at: "",
        units: {
          air_pressure_at_sea_level: "hPa",
          air_temperature: "celsius",
          cloud_area_fraction: "%",
          precipitation_amount: "mm",
          relative_humidity: "%",
          wind_from_direction: "degrees",
          wind_speed: "m/s",
        },
      },
      timeseries: [
        {
          time: "2022-03-18",
          data: {
            instant: {
              details: {
                air_pressure_at_sea_level: 0,
                air_temperature: 0,
                cloud_area_fraction: 0,
                relative_humidity: 0,
                wind_from_direction: 0,
                wind_speed: 0,
              },
            },
            next_1_hours: {
              summary: {
                symbol_code: "",
              },
              details: {
                precipitation_amount: 0,
              },
            },
            next_6_hours: {
              summary: {
                symbol_code: "",
              },
              details: {
                precipitation_amount: 0,
              },
            },
            next_12_hours: {
              summary: {
                symbol_code: "",
              },
            },
          },
        },
      ],
    },
  },
});

export const coordLocation = atom({
  key: "coordLocation",
  default: "lat=46.4725&lon=30.74136&altitude=42",
});
export const nameLocation = atom({
  key: "nameLocation",
  default: "Одесса",
});
export const buttonOkLocation = atom({
  key: "buttonOkLocation",
  default: true,
});

// export { yrWeatherState };
