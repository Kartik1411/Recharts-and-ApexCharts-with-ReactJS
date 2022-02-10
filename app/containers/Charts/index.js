import React, { useState, useEffect, useCallback } from 'react';
import AreaChartIndex from '../../components/AreaChart';
import { data } from '../../fakeData/data';

function Charts() {
  const [areaSeries, setAreaSeries] = useState([{}]);
  const opacity = 0.5;
  const color = ['#eb7d34', '#888888', '#ea1212', '#555555', '#333333'];

  const config = {
    width: 1000,
    height: 500,
  };

  useEffect(() => {
    const arr = Object.keys(data[0]).filter(key => key !== 'time');
    setAreaSeries(
      arr.map((dataKey, index) => ({
        dataKey,
        color: color[index],
        opacity,
      })),
    );
  }, []);

  const handleMouseEnter = useCallback(obj => {
    const datakey = obj.value;
    const tempSeries = areaSeries.map(object => {
      if (datakey === object.dataKey) {
        return { ...object, opacity: 0.8 };
      }
      return object;
    });
    setAreaSeries(tempSeries);
  });

  const handleMouseLeave = useCallback(obj => {
    const { datakey } = obj;
    const tempSeries = areaSeries.map(object => {
      if (datakey === object.key) {
        return { ...object, opacity: 0.5 };
      }
      return object;
    });
    setAreaSeries(tempSeries);
  });

  return (
    <AreaChartIndex
      config={config}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      arr={areaSeries}
      data={data}
    />
  );
}

export default Charts;
