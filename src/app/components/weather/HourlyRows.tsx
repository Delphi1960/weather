import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Hidden from '@mui/material/Hidden'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useRecoilValue } from 'recoil'

import { Icons } from '../../../assets/icons'
import { yrWeatherState } from '../../recoil/yr_weather.state'
import { IconsKey } from '../../types/icon.type'
import RowHourlyDetail from './RowHourlyDetail'

type PropsHourly = {
  open: boolean;
  dtDaily: string;
};

// Формируем строки с часовым прогнозом
// и формируем раскрывающуюся таблицу с часовыми прогнозами

export default function HourlyRows({ open, dtDaily }: PropsHourly) {
  const weatherData = useRecoilValue(yrWeatherState);
  let dt = new Date(dtDaily);
  return (
    <TableRow>
      <TableCell colSpan={10}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" gutterBottom component="div">
              Почасовой прогноз
            </Typography>
            <Table size="small" aria-label="purchases" sx={{ ml: -1, mr: -1 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{ fontSize: 12, fontWeight: "bold" }}
                  >
                    T
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: 12, fontWeight: "bold" }}
                  >
                    Обл.
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: 12, fontWeight: "bold" }}
                  >
                    C°
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: 12, fontWeight: "bold" }}
                  >
                    Осадки
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: 12, fontWeight: "bold" }}
                  >
                    Ветер
                  </TableCell>
                  <Hidden smDown={true}>
                    <TableCell
                      align="left"
                      sx={{ fontSize: 12, fontWeight: "bold" }}
                    >
                      Влажность
                    </TableCell>
                  </Hidden>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Формируем одну строки с часовым прогнозом для даты dt = new Date(dtDaily) */}
                {weatherData?.properties.timeseries
                  .filter((item) => {
                    let dt1 = new Date(item.time);
                    return dt1.toLocaleDateString() === dt.toLocaleDateString();
                  })
                  .map((hourly, ind) => (
                    // Формируем одну строку с часовым прогнозом
                    <RowHourlyDetail
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
                      temp={Math.round(
                        hourly.data.instant.details.air_temperature
                      )}
                      pricip={
                        hourly?.data.next_1_hours?.details
                          ?.precipitation_amount !== undefined
                          ? hourly?.data.next_1_hours?.details
                              ?.precipitation_amount
                          : hourly?.data.next_6_hours?.details
                              ?.precipitation_amount
                      }
                      wind={Math.round(hourly.data.instant.details.wind_speed)}
                      relative_humidity={Math.round(
                        hourly.data.instant.details.relative_humidity
                      )}
                    />
                  ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
