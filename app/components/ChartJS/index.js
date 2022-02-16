/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom'; // do not remove

function LineChart(props) {
  const filteredData = props.data.map(obj => ({
    x: obj.timestamp,
    y: obj.value,
  }));
  // console.log(filteredData);

  useEffect(() => {
    const element = document.getElementById(props.id);
    const stackedLine = new Chart(element, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Usage',
            data: filteredData,
            pointRadius: 0,
            fill: false,
            borderColor: '#898989',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'second',
            },
          },
          y: {
            stacked: true,
          },
        },
        plugins: {
          legend: { position: 'bottom' },
          zoom: {
            pan: { enabled: true, mode: 'x' },
            zoom: {
              enabled: true,
              mode: 'x',
              wheel: { enabled: true },
              pinch: { enabled: true },
            },
          },
        },
      },
    });
  });
  return <canvas id={props.id} style={{ height: '100%' }} />;
}
export default React.memo(LineChart);
