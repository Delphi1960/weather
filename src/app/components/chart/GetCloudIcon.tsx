// import React from 'react'
import { useRecoilValue } from 'recoil'

import { Icons } from '../../../assets/icons'
import { chartDateState } from '../../recoil/chartDate.state'
import { yrWeatherState } from '../../recoil/yr_weather.state'
import { IconsKey } from '../../types/icon.type'

export default function GetCloudIcon(time: string) {
  const weatherData = useRecoilValue(yrWeatherState)!;
  const chartDate = useRecoilValue(chartDateState)!;

  const dt = chartDate.toLocaleString().slice(0, -10);
  const dtTime = time.slice(0, -1);
  for (let i = 0; i < weatherData.properties.timeseries.length; i++) {
    let dt1 = new Date(weatherData.properties.timeseries[i].time)
      .toLocaleString("ru-RU")
      .slice(0, -10);
    let dtTime1 = new Date(weatherData.properties.timeseries[i].time)
      .toLocaleString("ru-RU")
      .slice(12, 14);

    if (dt1 === dt && dtTime === dtTime1) {
      return Icons[
        (weatherData?.properties?.timeseries[i]?.data.next_1_hours?.summary
          ?.symbol_code as IconsKey) ||
          (weatherData?.properties?.timeseries[i]?.data.next_6_hours?.summary
            ?.symbol_code as IconsKey)
      ];
    }
  }
  //Icons[icon as IconsKey]
}
