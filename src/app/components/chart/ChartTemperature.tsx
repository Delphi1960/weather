import Box from '@mui/material/Box'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type DataTemp = {
  dataTemp: any[];
};

export default function ChartTemperature({ dataTemp }: DataTemp) {
  function minMax() {
    let min = 200;
    let max = -200;
    for (let i = 0; i < dataTemp.length; i++) {
      let tMin = Number(dataTemp[i].t_min);
      let tMax = Number(dataTemp[i].t_max);
      if (min > tMin) min = tMin;
      if (max < tMax) max = tMax;
    }
    return { min, max };
  }
  const { min, max } = minMax();

  return (
    <React.Fragment>
      <Box
        component="span"
        sx={{
          display: "block",
          textAlign: "center",
          fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
          color: "#164c03",
        }}
      >
        Min и Max суточная температура С°
      </Box>
      {/* aspect={2} соотношение осей */}
      <ResponsiveContainer width="100%" aspect={2.5}>
        <LineChart
          data={dataTemp}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            angle={-30}
            tick={{ fontSize: 12 }}
            tickCount={10}
            interval={0}
          />
          <YAxis
            type="number"
            tick={{ fontSize: 12 }}
            domain={[min - 2, max + 2]}
            tickCount={10}
            interval={0}
            allowDecimals={false}
            style={{
              fontSize: "0.8rem",
              // fontFamily: "Arial",
            }}
          />
          {/* <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            fontSize={12}
          /> */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="t_min"
            stroke="#026297"
            strokeWidth={1.3}
            activeDot={{
              fill: "#3F99F7",
              stroke: "#fff",
              strokeWidth: 3,
              r: 11,
              className: "boxShadow",
            }}
            dot={{
              fill: "#3F99F7",
              stroke: "#fff",
              strokeWidth: 2,
              r: 6,
              className: "boxShadow",
            }}
          />
          <Line
            type="monotone"
            dataKey="t_max"
            stroke="red"
            strokeWidth={1.3}
            activeDot={{
              fill: "red",
              stroke: "#fff",
              strokeWidth: 3,
              r: 11,
              className: "boxShadow",
            }}
            dot={{
              fill: "red",
              stroke: "#fff",
              strokeWidth: 2,
              r: 6,
              className: "boxShadow",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
