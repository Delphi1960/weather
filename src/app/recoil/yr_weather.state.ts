import { atom } from 'recoil'

import { YrWeatherType } from '../types/yr_weather.type'

export const yrWeatherState = atom<YrWeatherType | null>({
  key: "yrWeatherState",
  default: null,
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
