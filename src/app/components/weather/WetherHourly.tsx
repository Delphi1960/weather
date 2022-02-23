import { Table, TableCell, TableHead, TableRow } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import { useRecoilValue } from 'recoil';

import { yrWeatherState } from '../../recoil/yr_weather.state';
import WeatherForecastHourlyTable from './WeatherForecastHourlyTable';
import { Icons } from './weathericon';

type IconsKey = keyof typeof Icons;
type Props = {
  dtDaily: string;
};

export default function WetherHourly({ dtDaily }: Props) {
  const loadWeather = useRecoilValue(yrWeatherState);

  let dt = new Date(dtDaily);
  //console.log(dt.toLocaleDateString());

  return (
    <TableContainer>
      <Table sx={{ width: "100%" }} aria-label="hourly table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">T(h)</TableCell>
            <TableCell align="center">Облака</TableCell>
            <TableCell align="center">C°</TableCell>
            <TableCell align="center">Дождь</TableCell>
            <TableCell align="center">Ветер</TableCell>
          </TableRow>
          {loadWeather?.properties.timeseries
            .filter((item) => {
              let dt1 = new Date(item.time);
              return dt1.toLocaleDateString() === dt.toLocaleDateString();
            })
            .map((hourly, ind) => (
              <WeatherForecastHourlyTable
                key={ind}
                time={new Date(hourly.time).toLocaleString("ru-RU", {
                  hour: "2-digit",
                })}
                icon={
                  Icons[
                    (hourly?.data.next_1_hours?.summary
                      ?.symbol_code as IconsKey) ||
                      (hourly?.data.next_6_hours?.summary
                        ?.symbol_code as IconsKey) ||
                      (hourly?.data.next_12_hours?.summary
                        ?.symbol_code as IconsKey) ||
                      "null1"
                  ]
                }
                temp={Math.round(hourly.data.instant.details.air_temperature)}
                pricip={
                  hourly?.data.next_1_hours?.details?.precipitation_amount !==
                  undefined
                    ? hourly?.data.next_1_hours?.details?.precipitation_amount
                    : hourly?.data.next_6_hours?.details?.precipitation_amount
                }
                wind={Math.round(hourly.data.instant.details.wind_speed)}
              />
            ))}
        </TableHead>
      </Table>
    </TableContainer>
  );
}
