import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useRecoilValue } from 'recoil';

import { yrWeatherState } from '../../recoil/yr_weather.state';
import WeatherDataTable from './WeatherDataTable';

type PropsHourly = {
  open: boolean;
  dtDaily: string;
  // sunrise: string;
  // sunset: string;
};

// Формируем строки с часовым прогнозом
// и формируем раскрывающуюся таблицу с часовыми прогнозами

export default function WetherHourlyCollapsedTable({
  open,
  dtDaily,
}: PropsHourly) {
  const weatherData = useRecoilValue(yrWeatherState);
  let dt = new Date(dtDaily);

  const dataHourlyForecast: any = weatherData?.properties.timeseries
    .filter((item) => {
      let dt1 = new Date(item.time);
      return dt1.toLocaleDateString() === dt.toLocaleDateString();
    })
    .map((hourly, ind) => ({
      time: new Date(hourly.time).toLocaleString("ru-RU", {
        hour: "numeric",
      }),

      icon:
        hourly?.data.next_1_hours?.summary?.symbol_code ||
        hourly?.data.next_6_hours?.summary?.symbol_code ||
        hourly?.data.next_12_hours?.summary?.symbol_code ||
        "null1",

      air_temperature: Math.round(hourly.data.instant.details.air_temperature),

      pricip:
        hourly?.data.next_1_hours?.details?.precipitation_amount !== undefined
          ? hourly?.data.next_1_hours?.details?.precipitation_amount
          : hourly?.data.next_6_hours?.details?.precipitation_amount,

      wind_speed: Math.round(hourly.data.instant.details.wind_speed),

      wind_from_direction: Math.round(
        hourly.data.instant.details.wind_from_direction
      ),

      relative_humidity: Math.round(
        hourly.data.instant.details.relative_humidity
      ),

      air_pressure_at_sea_level: Math.round(
        hourly.data.instant.details.air_pressure_at_sea_level * 0.75
      ),
    }));

  // console.log(dataHourlyForecast);

  return (
    <TableRow>
      <TableCell colSpan={7}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 1 }}>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {/* Формируем строки с часовым прогнозом для даты dt = new Date(dtDaily) */}
                <WeatherDataTable dataForecast={dataHourlyForecast} />
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
