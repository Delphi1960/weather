import { Box, Grid, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { Icons } from '../../../assets/icons'
import { yrSunriseState } from '../../recoil/yr_sunrise.state'
import { IconsKey } from '../../types/icon.type'

type Props = {
  date: string;
};

export default function SunriseSunset({ date }: Props) {
  const astroData = useRecoilValue(yrSunriseState)!;

  function getSunData() {
    for (let i = 0; i < astroData.length; i++) {
      if (astroData[i].location.time[0].date === date.slice(0, 10)) {
        let sunrise = astroData[i].location.time[0].sunrise.time.slice(11, -9);
        let sunset = astroData[i].location.time[0].sunset.time.slice(11, -9);
        return { sunrise, sunset };
      }
    }
  }

  const { sunrise, sunset }: any = getSunData();
  return (
    // Восход и заход Солнца

    <TableRow>
      <TableCell
        colSpan={7}
        align="center"
        sx={{ fontSize: { xs: 14, sm: 16 } }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              Восход{" "}
              <img width={25} alt="icon" src={Icons.sunrise as IconsKey} />
              <Box component="span" sx={{ color: "blue" }}>
                {" "}
                {sunrise}
              </Box>
            </Grid>

            <Grid item>
              Заход <img width={25} alt="icon" src={Icons.sunset as IconsKey} />
              <Box component="span" sx={{ color: "blue" }}>
                {" "}
                {sunset}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </TableCell>
    </TableRow>

    // Восход и заход Солнца
  );
}
