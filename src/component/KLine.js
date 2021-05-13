import React, { useEffect, useState } from "react";
import axios from "axios";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

const KLine = () => {
  const [kLineData, setKLineData] = useState([]);
  const [kLineVolume, setKLineVolume] = useState([]);
  const symbol = "ETHUSDT";
  const interval = "1m";

  useEffect(() => {
    axios
      .get(
        `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/${symbol}/${interval}`
      )
      .then((res) => {
        const currencyData = [];
        const volumeData = [];
        for (let i = 0; i < res.data.length; i += 1) {
          currencyData.push([
            ...kLineData,
            res.data[i][0],
            Number(res.data[i][1]),
            Number(res.data[i][2]),
            Number(res.data[i][3]),
            Number(res.data[i][4]),
          ]);
          volumeData.push([
            ...kLineVolume,
            res.data[i][0],
            Number(res.data[i][5]),
          ]);
        }
        setKLineData(currencyData);
        setKLineVolume(volumeData);
      });
  }, []);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/ws/ethusdt@kline_1m"
    );
    socket.onmessage = (event) => {
      const newKLineData = [];
      const data = JSON.parse(event.data);
      newKLineData.push(data.k.t);
      newKLineData.push(Number(data.k.o));
      newKLineData.push(Number(data.k.h));
      newKLineData.push(Number(data.k.l));
      newKLineData.push(Number(data.k.c));
      setKLineData((kData) => [...kData, newKLineData]);
    };
  }, []);

  if (JSON.stringify(kLineData) === "[]") {
    return null;
  }
  const options = {
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: `${symbol}`,
    },

    yAxis: [
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "OHLC",
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "Volume",
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2,
      },
    ],

    tooltip: {
      split: true,
    },

    series: [
      {
        type: "candlestick",
        name: "AAPL",
        data: kLineData,
        dataGrouping: {
          units: [
            [
              "week", // unit name
              [1], // allowed multiples
            ],
            ["month", [1, 2, 3, 4, 6]],
          ],
        },
      },
      {
        type: "column",
        name: "Volume",
        data: kLineVolume,
        yAxis: 1,
        dataGrouping: {
          units: [
            [
              "week", // unit name
              [1], // allowed multiples
            ],
            ["month", [1, 2, 3, 4, 6]],
          ],
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default KLine;
