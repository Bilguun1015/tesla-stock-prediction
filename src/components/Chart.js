import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import classes from './chart.module.css';
import axios from 'axios';

const TeslaChart = () => {
  const chartRef = useRef(null);
  const [dates, setDates] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [close, setClose] = useState([]);
  useEffect(async () => {
    const result = await axios(
      'http://localhost:3004/date',
    );
    setDates(Object.values(result.data));

    const resultTweet = await axios(
      'http://localhost:3004/tweet',
    );

    setTweets(Object.values(resultTweet.data));

    const resultClose = await axios(
      'http://localhost:3004/close',
    );

    setClose(Object.values(resultClose.data));

  }, []);
  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');
    const newData = [];
    let count = 1;
    dates.forEach((date, idx) => {
      if(idx === 0 || date !== dates[idx - 1]) {
        newData.push([date, close[idx], count]);
        count = 1;
      } else {
        count++;
      }
    })
    console.log(JSON.stringify(newData));
    
    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{ label: 'Stock Prices', data: [10, 20, 30] }],
      },
      options: {},
    });
  });
  return (
    <div className={classes.graphContainer}>
      <canvas id='myChart' ref={chartRef} />
      <div>{JSON.stringify(dates)}</div>
      <div>{JSON.stringify(close)}</div>
      <div>{JSON.stringify(tweets)}</div>
    </div>
  );
};

export default TeslaChart;
