import { atom } from 'recoil';

import { YrSunrise } from '../types/yr_sunrise.type';

export const yrSunriseState = atom<YrSunrise[] | null>({
  key: "yrSunriseState",
  default: null,

  // [
  //   {
  //     location: {
  //       height: "0",
  //       latitude: "46.4",
  //       longitude: "30.7",
  //       time: [
  //         {
  //           date: "2022-03-19T19:00:00Z",
  //           high_moon: {
  //                    МЕСТНАЯ СУТОЧНАЯ МАКСИМАЛЬНАЯ ВЫСОТА ЛУНЫ
  //             desc: "LOCAL DIURNAL MAXIMUM MOON ELEVATION ( 50.33111)",
  //             elevation: "50.331108924",
  //             time: "2022-03-18T00:00:00+02:00",
  //           },
  //           low_moon: {
  //             desc: "LOCAL DIURNAL MINIMUM MOON ELEVATION (Min= -40.02154)",
  //             elevation: "-40.021536865",
  //             time: "2022-03-18T12:22:12+02:00",
  //           },
  //           moonphase: {
  //                    МЕСТНОЕ СОСТОЯНИЕ ЛУНЫ * ФАЗА ЛУНЫ
  //             desc: "LOCAL MOON STATE * MOON PHASE= 48.7 (waxing gibbous)",
  //             time: "2022-03-18T00:00:00+02:00",
  //             value: "48.679939364",
  //           },
  //           moonposition: {
  //             azimuth: "182.030957591",
  //             desc: "LOCAL MOON POSITION Elv: 50.067 deg, Azi: 182.031, Rng: 377470.5 km",
  //             elevation: "50.067300052",
  //             phase: "48.679939364",
  //             range: "377470.492436309",
  //             time: "2022-03-18T00:00:00+02:00",
  //           },
  //           moonrise: {
  //             desc: "LOCAL DIURNAL MOON RISE",
  //             time: "2022-03-18T18:18:54+02:00",
  //           },
  //           moonset: {
  //             desc: "LOCAL DIURNAL MOON SET",
  //             time: "2022-03-18T06:29:19+02:00",
  //           },
  //           moonshadow: {
  //             azimuth: "27.732576649",
  //             desc: "LOCAL MOON STATE * SHADOW ANGLES (azi=27.7,ele=84.0)",
  //             elevation: "83.993985389",
  //             time: "2022-03-18T00:00:00+02:00",
  //           },
  //           solarmidnight: {
  //             desc: "LOCAL DIURNAL MINIMUM SOLAR ELEVATION (Min= -44.67995)",
  //             elevation: "-44.67994655",
  //             time: "2022-03-18T00:05:09+02:00",
  //           },
  //           solarnoon: {
  //             desc: "LOCAL DIURNAL MAXIMUM SOLAR ELEVATION (Max= 42.71769)",
  //             elevation: "42.717688252",
  //             time: "2022-03-18T12:05:32+02:00",
  //           },
  //           sunrise: {
  //             desc: "LOCAL DIURNAL SUN RISE",
  //             time: "2022-03-18T06:04:40+02:00",
  //           },
  //           sunset: {
  //             desc: "LOCAL DIURNAL SUN SET",
  //             time: "2022-03-18T18:06:43+02:00",
  //           },
  //         },
  //         {
  //           date: "",
  //           moonposition: {
  //             azimuth: "166.27283146",
  //             desc: "LOCAL MOON POSITION Elv: 43.180 deg, Azi: 166.273, Rng: 374126.7 km",
  //             elevation: "43.180123074",
  //             phase: "52.147443253",
  //             range: "374126.657163507",
  //             time: "2022-03-19T00:00:00+02:00",
  //           },
  //         },
  //       ],
  //     },
  //     meta: {
  //       licenseurl: "",
  //     },
  //   },
  // ],
});

// export const dataSunrise = atom({
//   key: "dataSunrise",
//   default: "2022-03-19T19:00:00Z",
// });
