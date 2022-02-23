import { Box, Hidden, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import React from 'react';

type Props = {
  date: string;
  icon: string[];
  tempMin: number;
  tempMax: number;
  pricip: number;
  // windMin: number;
  windMax: number;
  relative_humidity: number;
  pres: number;
};

export default function WeatherForecastDailyTable({
  date,
  icon,
  tempMin,
  tempMax,
  pricip,
  // windMin,
  windMax,
  relative_humidity,
  pres,
}: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      {/* <Typography align="left">{date}</Typography> */}
      <TableContainer>
        <Table sx={{ width: "100%" }} aria-label="caption table" size="small">
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: 90 }}>{date}</TableCell>
              {icon.map((ico, i) => (
                <Hidden smDown={true} key={i}>
                  <TableCell align="left" sx={{ width: 30 }}>
                    <img width={30} alt="icon" src={ico} />
                  </TableCell>
                </Hidden>
              ))}

              <TableCell sx={{ width: 35 }}>
                {tempMin > 0 ? (
                  <Box
                    component="span"
                    sx={{ color: "red", fontWeight: "bold" }}
                  >
                    {tempMin}°
                  </Box>
                ) : (
                  <Box
                    component="span"
                    sx={{ color: "blue", fontWeight: "bold" }}
                  >
                    {tempMin}°
                  </Box>
                )}
                /
                {tempMax > 0 ? (
                  <Box
                    component="span"
                    sx={{ color: "red", fontWeight: "bold" }}
                  >
                    {tempMax}°
                  </Box>
                ) : (
                  <Box
                    component="span"
                    sx={{ color: "blue", fontWeight: "bold" }}
                  >
                    {tempMax}°
                  </Box>
                )}
              </TableCell>

              <TableCell sx={{ width: 20 }}>
                <Box component="span" sx={{ color: "blue" }}>
                  {pricip === 0 || pricip === undefined
                    ? "0.0"
                    : pricip.toFixed(1)}
                </Box>
              </TableCell>

              <TableCell sx={{ width: "auto" }}>
                {/* <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
                {windMin}
              </Box>
              / */}
                <Box
                  component="span"
                  sx={{ color: "blue", fontWeight: "bold" }}
                >
                  {windMax}
                </Box>{" "}
                м
              </TableCell>

              <Hidden smDown={true}>
                <TableCell align="left" size="small" width={"auto"}>
                  {} %
                </TableCell>
              </Hidden>
              <Hidden smDown={true}>
                <TableCell align="left" size="small" width={"auto"}>
                  {pres}мм
                </TableCell>
              </Hidden>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
