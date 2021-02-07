import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import classes from './chart.module.css';

const TeslaChart = () => {
  const chartRef = useRef(null);
  const chartRef1 = useRef(null);
  const [dates, setDates] = useState();
  const [tweets, setTweets] = useState();
  const [closes, setCloses] = useState();

  // const [combinedData, setCombinedData] = useState([]);

  useEffect(async () => {
    const resultDates = await axios.get('http://localhost:3004/date');
    const tweetScale = 10;
    setDates(Object.values(resultDates.data));
    const resultTweets = await axios.get('http://localhost:3004/tweet');
    setTweets(Object.values(resultTweets.data).map(x => x * tweetScale));
    const resultCloses = await axios.get('http://localhost:3004/close'); 
    setCloses(Object.values(resultCloses.data));
    console.log(`resultCloses: ${JSON.stringify(Object.values(resultCloses.data))}`);    
  }, [])

  useEffect(() => {
    drawChart();
  }, [closes, dates, tweets])

  const drawChart = () => {
    const myChartRef = chartRef.current.getContext('2d');
    new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          { label: 'Stock Prices', backgroundColor: 'rgba(255, 99, 132, 1)', borderColor: 'rgba(255, 99, 132, 1)', data: closes, fill: true },
          { label: 'Tweets', backgroundColor: 'rgba(255, 255, 132, 1)', borderColor: 'rgba(255, 255, 132, 1)', data: tweets, fill: true }
        ],
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        }
      },
    });
  }
  return (
    <div className={classes.graphContainer}>
      <canvas id='myChart' ref={chartRef} />
    </div>
  );
};

export default TeslaChart;
