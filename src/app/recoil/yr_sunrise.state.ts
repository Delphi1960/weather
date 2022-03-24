import { atom } from 'recoil'

import { YrSunrise } from '../types/yr_sunrise.type'

export const yrSunriseState = atom<YrSunrise[] | null>({
  key: "yrSunriseState",
  default: null,
});

// !Investigate architecture based around selectors
// export const yrSunriseState = selector({
//   key: "yrSunriseState",
//   get: async ({ get }) => {
//     const data = await WeatherApi.loadWeather(get(coordLocation));
//     return data;
//   },
// });
