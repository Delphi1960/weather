import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { WeatherApi } from './api/weather';
import Loading from './components/load/Loading';
import { astroForecastCount, yrSunriseState } from './recoil/yr_sunrise.state';
import { coordLocation, yrWeatherState } from './recoil/yr_weather.state';

type Props = {
  children: React.ReactNode;
};

export default function Bootstrap({ children }: Props) {
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [currentWeather, setWeatherData] = useRecoilState(yrWeatherState);
  const setSunriseData = useSetRecoilState(yrSunriseState);
  const coord = useRecoilValue(coordLocation);
  const dayCount = useRecoilValue(astroForecastCount);

  useEffect(() => {
    // console.clear();
    // console.info("🌐 Requesting initial data from the API");
    const loadInitialData = async () => {
      setIsWeatherLoading(true);
      try {
        if (currentWeather === null) {
          const weather = await WeatherApi.loadWeather(coord);
          setWeatherData(weather);
          // console.info("⛅ Weather data loaded");
        }
        const sunrise = await WeatherApi.loadSunrise(coord, dayCount);
        setSunriseData(sunrise);
        // console.info("🌅 Astro data loaded");
      } catch (error) {
        console.log(error);
      } finally {
        // console.info("🚀 All data loaded, starting the application");
        setIsWeatherLoading(false);
      }
    };

    loadInitialData();
  }, [coord, setWeatherData, setSunriseData]);

  if (isWeatherLoading) {
    return <Loading />;
  }

  return <div>{children}</div>;
}
