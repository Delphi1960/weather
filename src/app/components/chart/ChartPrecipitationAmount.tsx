import Box from '@mui/material/Box'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type DataPrecip = {
  dataPrecip: any[];
  detail: boolean;
};

export default function ChartPrecipitationAmount({
  dataPrecip,
  detail,
}: DataPrecip) {
  function minMax() {
    let max = 0;
    for (let i = 0; i < dataPrecip.length; i++) {
      let precip = Number(dataPrecip[i].precipitation);
      if (max < precip) max = precip;
    }

    return { max };
  }

  const { max } = minMax();
  const yMax = Math.ceil(max);
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
        {detail ? "Количество осадков мм" : "Суточное количество осадков мм"}
      </Box>
      {/* aspect={2} соотношение осей */}
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
          data={dataPrecip}
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
            domain={[0, yMax]}
            tick={{ fontSize: 10 }}
            tickCount={10}
            // interval={0}
            allowDecimals={true}
            // domain={["auto", "auto"]}
            // allowDataOverflow={true}
          />
          {/* <Legend layout="horizontal" verticalAlign="bottom" align="center" /> */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="precipitation"
            stroke="blue"
            strokeWidth={1.3}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
