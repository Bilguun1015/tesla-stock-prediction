import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import classes from './chart.module.css';

const TeslaChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'March'],
        datasets: [{ label: 'Stock Prices', data: [10, 20, 30] }],
      },
      options: {},
    });
  });
  return (
    <div className={classes.graphContainer}>
      <canvas id='myChart' ref={chartRef} />
    </div>
  );
};

export default TeslaChart;
