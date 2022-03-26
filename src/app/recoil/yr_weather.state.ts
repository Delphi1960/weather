import { differenceInMinutes } from 'date-fns';
import { atom } from 'recoil';

import { YrWeather } from '../types/yr_weather.type';
import { LocalStorageManager } from '../utils';

function getDefaultWeatherState() {
  const weather = LocalStorageManager.getItem("weather");
  const lastUpdated = LocalStorageManager.getItem("lastUpdated");
  if (
    lastUpdated !== null &&
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
  default: "lat=46.4725&lon=30.74136&altitude=42",
});

// export const buttonOkLocation = atom({
//   key: "buttonOkLocation",
//   default: true,
// });
