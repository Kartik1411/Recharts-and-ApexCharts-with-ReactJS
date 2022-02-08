/* eslint-disable react/prop-types */
import React from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

function AreaChartIndex(props) {
  return (
    <div>
      <AreaChart
        width={1000}
        height={500}
        data={props.data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip
          cursor={{ stroke: 'green', strokeWidth: 2 }}
          position={{ x: 1000, y: 40 }}
        />
        {props.arr.map(({ dataKey, color, opacity }) => (
          <Area
            key={dataKey}
            type="monotone"
            dataKey={`${dataKey}`}
            stackId="1"
            fillOpacity={opacity}
            stroke={color}
            fill={color}
          />
        ))}
        {/* {props.arr.map(({ dataKey, color }) => (
          <Area
            key={dataKey}
            type="monotone"
            dataKey={`${dataKey}`}
            // stackId="1"
            fillOpacity={0.5}
            stroke={color}
            fill={color}
          />
        ))} */}
        {/* <Area
          type="monotone"
          dataKey="sales"
          stackId="1"
          fillOpacity={0.5}
          stroke="#eb7d34"
          fill="#eb7d34"
        /> */}
        {/* <Area
          type="monotone"
          dataKey="marketing"
          // stackId="1"
          fillOpacity={0.5}
          stroke="#96eb34"
          fill="#96eb34"
        />
        <Area
          type="monotone"
          dataKey="advertisments"
          // stackId="1"
          fillOpacity={0.5}
          stroke="#348feb"
          fill="#348feb"
        />
        <Area
          type="monotone"
          dataKey="HR"
          // stackId="1"
          fillOpacity={0.5}
          stroke="#888888"
          fill="#888888"
        /> */}
        <Legend
          onMouseEnter={props.handleMouseEnter}
          onMouseLeave={props.handleMouseLeave}
        />
      </AreaChart>
    </div>
  );
}

export default AreaChartIndex;
