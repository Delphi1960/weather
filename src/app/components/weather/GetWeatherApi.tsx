import axios from 'axios';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { yrWeatherState } from '../../recoil/yr_weather.state';

export default function GetWeatherApi() {
  // const API_KEY = "ba70f668d22d5358ad51d7723c6ae867";

  // const setLoadWeather = useSetRecoilState(weatherState);
  const setLoadWeather = useSetRecoilState(yrWeatherState);

  const getWether = async () => {
    try {
      const response = await axios.get(
        // `https://api.openweathermap.org/data/2.5/onecall?lat=46.41959&lon=30.75982&units=metric&appid=${API_KEY}&lang=ru`
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=46.4725&lon=30.74136&altitude=42`
        // `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=46.4725&lon=30.74136&altitude=42`
      );
      setLoadWeather(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getWether();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
