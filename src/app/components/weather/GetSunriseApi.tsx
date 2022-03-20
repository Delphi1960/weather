import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { yrSunriseState } from '../../recoil/yr_sunrise.state';
import { coordLocation } from '../../recoil/yr_weather.state';

export default function GetSunriseApi() {
  const coord = useRecoilValue(coordLocation);
  const latitudeLongitude = coord.slice(0, coord.indexOf("&altitude"));

  const setAstroData = useSetRecoilState(yrSunriseState);

  //
  // dt = "2022-03-20T19:00:00Z";
  // const dtAstroData = dt.slice(0, dt.indexOf("T"));
  // console.log(dtAstroData);

  async function getAstroData() {
    const urls = [];
    for (let i = 0; i < 10; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      let dtAstro = date.toISOString().slice(0, 10);
      const url = `https://api.met.no/weatherapi/sunrise/2.0/.json?${latitudeLongitude}&date=${dtAstro}&offset=+02:00`;
      urls.push(url);
    }

    const promises = urls.map((url) => axios.get(url));
    const result = await Promise.all(promises);
    // const data = result.map((result) => result.data.location.time[0]);
    const data = result.map((result) => result.data);
    setAstroData(data);
    // console.log(data);
  }
  useEffect(() => {
    getAstroData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
