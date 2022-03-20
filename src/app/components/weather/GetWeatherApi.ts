import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { loadState } from '../../recoil/load.state';
import { coordLocation, yrWeatherState } from '../../recoil/yr_weather.state';

export default function GetWeatherApi() {
  // const API_KEY = "ba70f668d22d5358ad51d7723c6ae867";

  const setLoadWeather = useSetRecoilState(yrWeatherState);
  const setIsLoading = useSetRecoilState(loadState);
  const coord = useRecoilValue(coordLocation);
  // console.log(coord);
  const getWether = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?${coord}`

        // `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=46.4725&lon=30.74136&altitude=42`
        //https://api.met.no/weatherapi/sunrise/2.0/.json?lat=46.4725&lon=30.74136&date=2022-03-17&offset=+02:00
      );
      setLoadWeather(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // setTimeout(getWether, 1000);
    getWether();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
