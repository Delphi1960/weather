import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Icons } from '../../../assets/icons'
import { IconsKey } from '../../types/icon.type'
import GetCloudIcon from './GetCloudIcon'

type DataCloud = {
  dataCloud: any[];
  dataCloudIcon: any[];
  detail: boolean;
};

export default function ChartCloud({
  dataCloud,
  dataCloudIcon,
  detail,
}: DataCloud) {
  const CustomizedDot = (props: any) => {
    let icon;
    const { cx, cy, value, payload } = props;

    if (!detail) {
      if (value < 30) icon = Icons.clearsky_day as IconsKey;
      else if (value >= 30 && value < 50) icon = Icons.fair_day as IconsKey;
      else if (value >= 50 && value < 95)
        icon = Icons.partlycloudy_day as IconsKey;
      else icon = Icons.cloudy as IconsKey;
      return (
        <image
          x={cx - 10}
          y={cy - 10}
          width={20}
          height={20}
          xlinkHref={icon}
        />
      );
    } else {
      return (
        <image
          x={cx - 10}
          y={cy - 10}
          width={20}
          height={20}
          xlinkHref={GetCloudIcon(payload.time)}
        />
      );
    }
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
              fontSize: { xs: 12, sm: 14, md: 16 },
              color: "#164c03",
            }}
          >
            {detail ? "Суточная облачность %" : "Средняя дневная облачность %"}
          </Box>
        </Grid>
      </Grid>

      {/* aspect={2.5} соотношение осей */}
      <ResponsiveContainer width={"100%"} aspect={2}>
        <LineChart
          data={dataCloud}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" strokeWidth={1} />
          {detail ? (
            <>
              <XAxis xAxisId="0" dataKey="time" tick={{ fontSize: 10 }} />
              <XAxis
                xAxisId="1"
                dataKey="day"
                allowDuplicatedCategory={false}
                tick={{ fontSize: 10 }}
              />
            </>
          ) : (
            <XAxis
              dataKey="day"
              allowDuplicatedCategory={false}
              tick={{ fontSize: 10 }}
            />
          )}

          <YAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 10 }}
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
