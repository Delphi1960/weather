import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import React, { FunctionComponent } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Icons } from '../../../assets/icons'
import { IconsKey } from '../../types/icon.type'

type DataCloud = {
  dataCloud: any[];
};

export default function ChartCloud({ dataCloud }: DataCloud) {
  const CustomizedDot: FunctionComponent<any> = (props: any) => {
    const { cx, cy, value } = props;

    if (value < 30) {
      return (
        <image
          x={cx - 15}
          y={cy - 15}
          width={30}
          height={30}
          xlinkHref={Icons.sun as IconsKey}
        />
        // <svg
        //   x={cx - 10}
        //   y={cy - 10}
        //   width={20}
        //   height={20}
        //   fill="orange"
        //   viewBox="0 0 20 20"
        // >
        //   <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
        // </svg>
      );
    } else if (value >= 30 && value < 70)
      return (
        <image
          x={cx - 15}
          y={cy - 15}
          width={30}
          height={30}
          xlinkHref={Icons.fair_d as IconsKey}
        />
      );
    else
      return (
        <image
          x={cx - 15}
          y={cy - 15}
          width={30}
          height={30}
          xlinkHref={Icons.cloud as IconsKey}
        />
      );
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Box
            component="span"
            sx={{
              display: "block",
              textAlign: "center",
              fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
              color: "#164c03",
            }}
          >
            Средняя дневная облачность %
          </Box>
        </Grid>
        <Grid>
          <Box sx={{ mt: 3 }}>
            <img width={25} alt="icon" src={Icons.fair as IconsKey} />
          </Box>
        </Grid>
      </Grid>

      {/* aspect={2.5} соотношение осей */}
      <ResponsiveContainer width="100%" aspect={2.5}>
        <LineChart
          data={dataCloud}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" strokeWidth={1} />
          <XAxis
            dataKey="day"
            angle={-30}
            tick={{ fontSize: 12 }}
            tickCount={10}
            interval={0}
          />
          <YAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            tickCount={10}
            interval={0}
            allowDecimals={false}
            // domain={["auto", "auto"]}
            // allowDataOverflow={true}
          />

          {/* <Legend layout="horizontal" verticalAlign="bottom" align="center" /> */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="cloud"
            stroke="#a06a02"
            strokeWidth={1.3}
            activeDot={{ r: 6 }}
            dot={<CustomizedDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
