import { differenceInMinutes } from 'date-fns'
import { atom } from 'recoil'

import { YrWeather } from '../types/yr_weather.type'
import { LocalStorageManager } from '../utils'

function getDefaultWeatherState() {
  const weather = LocalStorageManager.getItem("weather");
  // const coord = LocalStorageManager.getItem("coord");
  // const lon = weather.geometry.coordinates[0];
  // const lat = weather.geometry.coordinates[1];
  // const altitude = weather.geometry.coordinates[2];
  // const lat1 = Number(coord.slice(4, 10));
  // const lon1 = Number(coord.slice(16, 23));
  // const altitude1 = Number(coord.slice(33));
  // const coordOk = lat === lat1 && lon === lon1 && altitude === altitude1;
  // console.log(lat, lon, altitude);
  // console.log(lat1, lon1, altitude1);
  // console.log(coordOk);

  const lastUpdated = LocalStorageManager.getItem("lastUpdated");
  if (
    lastUpdated !== null &&
    // coordOk &&
    differenceInMinutes(Date.now(), lastUpdated) < 60
  ) {
    return weather;
  }
  return null;
}

export const yrWeatherState = atom<YrWeather | null>({
  key: "yrWeatherState",
  default: getDefaultWeatherState(),
});

export const coordLocation = atom({
  key: "coordLocation",
  default:
    LocalStorageManager.getItem("coord") ??
    "lat=46.4725&lon=30.74136&altitude=42",
  // default: "lat=46.4725&lon=30.74136&altitude=42",
});
