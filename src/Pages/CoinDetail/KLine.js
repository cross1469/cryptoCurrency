import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { useDispatch } from "react-redux";
import { getMarketPrice } from "../../Redux/Actions/actionCreator";

const KLine = () => {
  const { symbol } = useParams();
  const dispatch = useDispatch();

  const [interval, setInterval] = useState("1m");

  const callBinanceAPI = (coinSymbol, APIInterval) => {
    axios
      .get(
        `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/${coinSymbol}/${APIInterval}`
      )
      .then((res) => {
        const currencyData = [];
        const volumeData = [];
        for (let i = 0; i < res.data.length; i += 1) {
          currencyData.push([
            res.data[i][0],
            Number(res.data[i][1]),
            Number(res.data[i][2]),
            Number(res.data[i][3]),
            Number(res.data[i][4]),
          ]);
          volumeData.push([res.data[i][0], Number(res.data[i][5])]);
        }
        // eslint-disable-next-line no-use-before-define
        setOptions({
          series: [
            {
              type: "candlestick",
              name: `${symbol}`,
              data: currencyData,
            },
            {
              type: "column",
              name: `Volume`,
              data: volumeData,
              yAxis: 1,
            },
          ],
        });
      });
  };

  const socketAPI = (socketSymbol, socketInterval) => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${socketSymbol.toLowerCase()}@kline_${socketInterval}`
    );
    socket.onmessage = (event) => {
      const newKLineData = [];
      const data = JSON.parse(event.data);
      dispatch(getMarketPrice(data.k.o));
      newKLineData.push(
        data.k.t,
        Number(data.k.o),
        Number(data.k.h),
        Number(data.k.l),
        Number(data.k.c)
      );
      // eslint-disable-next-line no-use-before-define
      setOptions((op) => {
        const newOptions = { ...op };
        newOptions.series[0].data = [
          ...newOptions.series[0].data,
          newKLineData,
        ];
        return newOptions;
      });
    };

    return () => socket.close();
  };

  const [options, setOptions] = useState({
    chart: {
      zoomType: "x",
    },
    rangeSelector: {
      enabled: true,
      allButtonsEnabled: true,
      buttons: [
        {
          text: "1m",
          events: {
            click() {
              callBinanceAPI(symbol, "1m");
              setInterval(() => "1m");
            },
          },
        },
        {
          text: "15m",
          events: {
            click() {
              callBinanceAPI(symbol, "15m");
              setInterval(() => "15m");
            },
          },
        },
        {
          text: "1h",
          events: {
            click() {
              callBinanceAPI(symbol, "1h");
              setInterval(() => "1h");
            },
          },
        },
        {
          text: "4h",
          events: {
            click() {
              callBinanceAPI(symbol, "4h");
              setInterval(() => "4h");
            },
          },
        },
        {
          text: "1d",
          events: {
            click() {
              callBinanceAPI(symbol, "1d");
              setInterval(() => "1d");
            },
          },
        },
        {
          text: "週線",
          events: {
            click() {
              callBinanceAPI(symbol, "1w");
              setInterval(() => "1w");
            },
          },
        },
        {
          type: "all",
          text: "All",
        },
      ],
    },

    title: {
      text: `${symbol}`,
    },
    xAxis: {
      type: "datetime",
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

    series: [],
  });

  useEffect(() => {
    callBinanceAPI(symbol, "1m");
  }, []);

  useEffect(() => {
    const closeSocket = socketAPI(symbol, interval);
    return closeSocket;
  }, [options, interval]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default KLine;
