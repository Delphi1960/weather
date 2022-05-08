import Box from '@mui/material/Box'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Icons } from '../../../assets/icons'
import { IconsKey } from '../../types/icon.type'

type Props = {
  dataAverageHumidity: any[];
  detail: boolean;
};

export default function ChartHumidity({ dataAverageHumidity, detail }: Props) {
  const CustomizedDot = (props: any) => {
    const { cx, cy } = props;

    return (
      <image
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
        xlinkHref={Icons.humidity as IconsKey}
      />
    );
  };
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
          ? " Относительная влажность %"
          : " Среднесуточная относительная влажность %"}
      </Box>

      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
          data={dataAverageHumidity}
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
            // domain={[min - 1, max + 1]}
            tick={{ fontSize: 10 }}
            tickCount={10}
            interval={0}
            allowDecimals={false}
            domain={["auto", "auto"]}
            // allowDataOverflow={true}
          />
          {/* <Legend layout="horizontal" verticalAlign="bottom" align="center" /> */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#069cef"
            strokeWidth={1.3}
            activeDot={{
              fill: "red",
              stroke: "#fff",
              strokeWidth: 3,
              r: 8,
              className: "boxShadow",
            }}
            dot={<CustomizedDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
