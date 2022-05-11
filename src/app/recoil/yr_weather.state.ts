import { differenceInMinutes } from 'date-fns'
import { atom } from 'recoil'

import { YrWeather } from '../types/yr_weather.type'
import { LocalStorageManager } from '../utils'

function getDefaultWeatherState() {
  const weather = LocalStorageManager.getItem("weather");
  const coord = LocalStorageManager.getItem("coord");
  const lon = weather.geometry.coordinates[0];
  const lat = weather.geometry.coordinates[1];
  const altitude = weather.geometry.coordinates[2];
  const oldCoord = "lat=" + lat + "&lon=" + lon + "&altitude=" + altitude;
  console.log(coord, oldCoord);

  const lastUpdated = LocalStorageManager.getItem("lastUpdated");
  if (
    lastUpdated !== null &&
    coord === oldCoord &&
    differenceInMinutes(Date.now(), lastUpdated) < 60
  ) {
    return weather;
  }
  return null;
}

console.log(getDefaultWeatherState());

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
