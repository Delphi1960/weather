import Box from '@mui/material/Box'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { IconsKey } from '../../types/icon.type'
import GetIconWindDirection from '../weather/GetIconWindDirection'

type DataWind = {
  dataWind: any[];
  detail: boolean;
};

export default function ChartWind({ dataWind, detail }: DataWind) {
  const CustomizedDot = (props: any) => {
    const { cx, cy, payload } = props;

    const icon = GetIconWindDirection(payload.windDirection);

    return (
      <image
        x={cx - 10}
        y={cy - 10}
        width={20}
        height={20}
        xlinkHref={icon as IconsKey}
      />
    );
  };

  function minMax() {
    let max = 0;
    for (let i = 0; i < dataWind.length; i++) {
      let wind = Number(dataWind[i].windSpeed);

      if (max < wind) max = wind;
    }
    return max;
  }
  const max = minMax();

  return (
    <React.Fragment>
      <Box
        component="span"
        sx={{
          display: "block",
          textAlign: "center",
          fontSize: { xs: 12, sm: 14, md: 16 },
          color: "#164c03",
        }}
      >
        {detail ? "Cкорость ветра м/сек" : "Максимальная скорость ветра м/сек"}
      </Box>

      {/* aspect={2.5} соотношение осей */}
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
          data={dataWind}
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
            domain={[0, max + 1]}
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
            dataKey="windSpeed"
            stroke="#03334d"
            strokeWidth={1.3}
            activeDot={{ r: 6 }}
            dot={<CustomizedDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
