import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import classes from './chart.module.css';

const TeslaChart = () => {
  const chartRef = useRef(null);
  // const [date, setDates] = useState();

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');
    let combinedData = [];
    axios
      .all([
        axios.get('http://localhost:3004/date'),
        axios.get('http://localhost:3004/tweet'),
        axios.get('http://localhost:3004/close'),
      ])
      .then(
        axios.spread((date, tweet, close) => {
          combinedData.push(Object.values(date.data));
          combinedData.push(Object.values(tweet.data));
          combinedData.push(Object.values(close.data));
          // Object.keys(date.data).forEach((key) => {
          //   combinedData = [date.data[key], tweet.data[key], close.data[key],...]);
          // });
          // combinedData = [
          //   Object.values(date.data),
          //   Object.values(tweet.data),
          //   Object.values(close.data),
          // ];
        })
      );
    console.log(combinedData);
    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb'],
        datasets: [{ label: 'Stock Prices', data: [10, 20, 30] }],
      },
      options: {},
    });
  }, []);
  return (
    <div className={classes.graphContainer}>
      <canvas id='myChart' ref={chartRef} />
    </div>
  );
};

export default TeslaChart;
