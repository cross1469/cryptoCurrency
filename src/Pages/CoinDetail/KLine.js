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
        for (let i = 0; i < res.data.length; i += 1) {
          currencyData.push([
            res.data[i][0],
            Number(res.data[i][1]),
            Number(res.data[i][2]),
            Number(res.data[i][3]),
            Number(res.data[i][4]),
          ]);
        }
        // eslint-disable-next-line no-use-before-define
        setOptions({
          series: [
            {
              type: "candlestick",
              name: `${symbol}`,
              data: currencyData,
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
      if (options.series[0]) {
        // eslint-disable-next-line no-use-before-define
        setOptions((op) => {
          const newOptions = { ...op };
          newOptions.series[0].data = [
            ...newOptions.series[0].data,
            newKLineData,
          ];
          return newOptions;
        });
      }
    };

    return () => socket.close();
  };

  const [options, setOptions] = useState({
    plotOptions: {
      candlestick: {
        color: "#f84960",
        upColor: "#02c076",
        lineColor: "#f84960",
        upLineColor: "#02c076",
      },
    },

    chart: {
      zoomType: "x",
      backgroundColor: "#14151a",
      marginTop: 24,
      marginBottom: 48,
      marginLeft: 60,
      marginRight: 24,
    },

    rangeSelector: {
      x: -9,
      enabled: true,
      allButtonsEnabled: true,
      buttons: [
        {
          type: "minute",
          text: "15m",
          count: 60,
          events: {
            click() {
              callBinanceAPI(symbol, "15m");
              setInterval(() => "15m");
            },
          },
        },
        {
          type: "hour",
          text: "1h",
          count: 24,
          events: {
            click() {
              callBinanceAPI(symbol, "1h");
              setInterval(() => "1h");
            },
          },
        },
        {
          type: "hour",
          text: "4h",
          count: 24,
          events: {
            click() {
              callBinanceAPI(symbol, "4h");
              setInterval(() => "4h");
            },
          },
        },
        {
          type: "day",
          text: "1d",
          count: 7,
          events: {
            click() {
              callBinanceAPI(symbol, "1d");
              setInterval(() => "1d");
            },
          },
        },
        {
          type: "week",
          text: "1w",
          count: 4,
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
      buttonTheme: {
        fill: "none",
        stroke: "none",
        "stroke-width": 0,
        r: 8,
        style: {
          color: "#d9d9d9",
          fontWeight: 500,
        },
        states: {
          hover: {
            fill: "none",
            stroke: "#ffe251",
            "stroke-width": 1,
            style: {
              color: "#d9d9d9",
            },
          },
          select: {
            fill: "#ffe251",
            style: {
              color: "#1b1504",
            },
          },
        },
      },
      buttonSpacing: 12,
      inputSpacing: 8,
      inputStyle: {
        color: "#d9d9d9",
      },
      labelStyle: {
        color: "silver",
        fontWeight: "bold",
      },
      selected: 1,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      zoomEnabled: true,
      labels: {
        style: {
          color: "#d9d9d9",
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "",
        },
        labels: {
          style: {
            color: "#d9d9d9",
          },
        },
      },
    ],

    loading: {
      showDuration: 1000,
    },

    tooltip: {
      split: true,
    },

    series: [],
  });

  useEffect(() => {
    callBinanceAPI(symbol, "1h");
  }, []);

  useEffect(() => {
    const closeSocket = socketAPI(symbol, interval);
    return closeSocket;
  }, [interval]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default KLine;
