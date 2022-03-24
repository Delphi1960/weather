import { Box, LinearProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { WeatherApi } from './api/weather'
import { yrSunriseState } from './recoil/yr_sunrise.state'
import { coordLocation, yrWeatherState } from './recoil/yr_weather.state'

type Props = {
  children: React.ReactNode;
};

export default function Bootstrap({ children }: Props) {
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const setWeatherData = useSetRecoilState(yrWeatherState);
  const setSunriseData = useSetRecoilState(yrSunriseState);

  const coord = useRecoilValue(coordLocation);

  useEffect(() => {
    console.info("🌐 Requesting initial data from the API");
    const loadInitialData = async () => {
      setIsWeatherLoading(true);
      try {
        const weather = await WeatherApi.loadWeather(coord);
        setWeatherData(weather);
        console.info("⛅ Weather data loaded");
        const sunrise = await WeatherApi.loadSunrise(coord);
        setSunriseData(sunrise);
        console.info("🌅 Astro data loaded");
      } catch (error) {
        console.log(error);
      } finally {
        console.info("🚀 All data loaded, starting the application");
        setIsWeatherLoading(false);
      }
    };

    loadInitialData();
  }, [coord, setWeatherData, setSunriseData]);

  if (isWeatherLoading) {
    return (
      <Box sx={{ mt: 10, p: 10 }}>
        <LinearProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
