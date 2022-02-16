/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-bitwise */
import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceArea,
} from 'recharts';

const getAxisYDomain = (from, to, ref, offset, data) => {
  const refData = data.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach(d => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const ZoomDemo = ({ data, config }) => {
  const [chartData, setChartData] = useState(data);
  const [domain, setDomain] = useState({ left: 'dataMin', right: 'dataMax' });
  const [range, setRange] = useState({ refAreaLeft: '', refAreaRight: '' });
  const [yDomain, setYDomain] = useState({
    top: 'dataMax+1',
    bottom: 'dataMin-1',
  });
  const { left, right } = domain;
  const { refAreaLeft, refAreaRight } = range;
  const { top, bottom } = yDomain;

  const zoom = () => {
    let { refAreaLeft, refAreaRight } = range;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setRange({ refAreaLeft: '', refAreaRight: '' });
      return;
    }

    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    const [bottom, top] = getAxisYDomain(
      refAreaLeft,
      refAreaRight,
      'provided',
      1,
      chartData,
    );

    setDomain({ left: refAreaLeft, right: refAreaRight });
    setRange({ refAreaLeft: '', refAreaRight: '' });
    setYDomain({ top, bottom });
  };

  const zoomOut = () => {
    setDomain({ left: 'dataMin', right: 'dataMax' });
    setRange({ refAreaLeft: '', refAreaRight: '' });
    setYDomain({ top: 'dataMax+1', bottom: 'dataMin-1' });
  };

  return (
    <div className="app">
      <button onClick={zoomOut}>Zoom Out</button>

      <p>Note: To zoom select and drag area over the chart</p>
      <AreaChart
        width={config.width || 1000}
        height={config.height || 600}
        data={chartData}
        onMouseDown={e => {
          const { refAreaRight } = range;
          setRange({ refAreaLeft: e.activeLabel, refAreaRight });
        }}
        onMouseMove={e => {
          const { refAreaLeft } = range;
          if (refAreaLeft) {
            setRange({ refAreaRight: e.activeLabel, refAreaLeft });
          }
        }}
        onMouseUp={zoom}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis
          allowDataOverflow={!false}
          dataKey="time"
          domain={[left, right]}
          // type="datetime"
          tickFormatter={config.tickFormatter}
        />
        <YAxis
          allowDataOverflow={!false}
          domain={[bottom, top]}
          type="number"
          yAxisId="1"
        />
        <Tooltip labelFormatter={config.labelFormatter} />
        <Area
          yAxisId="1"
          type="natural"
          dataKey="provided"
          stroke="#888888"
          animationDuration={300}
          activeDot={false}
          dot={false}
        />
        {refAreaLeft && refAreaRight ? (
          <ReferenceArea
            yAxisId="1"
            x1={refAreaLeft}
            x2={refAreaRight}
            strokeOpacity={1}
          />
        ) : null}

        <Legend />
      </AreaChart>
    </div>
  );
};
export default ZoomDemo;
