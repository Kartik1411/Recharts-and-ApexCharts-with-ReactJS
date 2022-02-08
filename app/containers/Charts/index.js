import React from 'react';
import AreaChartIndex from '../../components/AreaChart';
import { data } from '../../fakeData/data';

function Charts() {
  const opacity = 0.5;
  const color = ['#eb7d34', '#888888', '#ea1212', '#555555', '#333333'];
  let arr = Object.keys(data[0]).filter(key => key !== 'x');
  arr = arr.map((dataKey, index) => ({
    dataKey,
    color: color[index],
    opacity,
  }));

  // console.log(arr[0].dataKey);

  const handleMouseEnter = event => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].dataKey === event.value) {
        console.log(event.value);
        console.log(arr[i].opacity);
        arr[i].opacity = 1;
        console.log(arr[i].opacity);
      }
    }
  };

  const handleMouseLeave = event => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].dataKey === event.value) {
        arr[i].opacity = 0.5;
      }
    }
  };

  return (
    <div>
      <AreaChartIndex
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        arr={arr}
        data={data}
      />
    </div>
  );
}

export default Charts;
