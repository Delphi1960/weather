import Box from '@mui/material/Box'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type DataTemp = {
  dataTemperature: any[];
  detail: boolean;
};

export default function ChartTemperature({
  dataTemperature,
  detail,
}: DataTemp) {
  function minMax() {
    let min = 200;
    let max = -200;
    let tMin;
    let tMax;
    for (let i = 0; i < dataTemperature.length; i++) {
      if (detail) {
        tMin = Number(dataTemperature[i].temp);
        tMax = Number(dataTemperature[i].temp);
      } else {
        tMin = Number(dataTemperature[i].t_min);
        tMax = Number(dataTemperature[i].t_max);
      }
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
          fontSize: { xs: 12, sm: 14, md: 16 },
          color: "#164c03",
        }}
      >
        {detail
          ? "Cуточная температура С°"
          : "Min и Max суточная температура С°"}
      </Box>
      {/* aspect={2} соотношение осей */}
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
          data={dataTemperature}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
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
            tick={{ fontSize: 10 }}
            domain={[min - 1, max + 1]}
            tickCount={10}
            interval={0}
            allowDecimals={false}
            // style={{
            //   fontSize: "0.7rem",
            //   // fontFamily: "Arial",
            // }}
          />
          {/* <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            fontSize={12}
          /> */}
          <Tooltip />

          {detail ? (
            <Line
              type="monotone"
              dataKey="temp"
              stroke="red"
              strokeWidth={1.3}
              activeDot={{ r: 6 }}
              dot={{ r: 2 }}
            />
          ) : (
            <>
              <Line
                type="monotone"
                dataKey="t_min"
                stroke="#026297"
                strokeWidth={1.3}
                activeDot={{
                  fill: "#3F99F7",
                  stroke: "#fff",
                  strokeWidth: 3,
                  r: 8,
                  className: "boxShadow",
                }}
                dot={{
                  fill: "#3F99F7",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 5,
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
                  r: 8,
                  className: "boxShadow",
                }}
                dot={{
                  fill: "red",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 5,
                  className: "boxShadow",
                }}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
