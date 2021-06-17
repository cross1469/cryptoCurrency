import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import useCallBinanceAPI from "../../Hooks/useCallBinanceAPI";
import { callBinanceAPI } from "../../Utils/api";
import useSocketBinanceAPI from "../../Hooks/useSocketBinanceAPI";

const KLine = () => {
  const { symbol } = useParams();
  const [interval, setInterval] = useState("1m");

  const currencyData = async (time) => {
    const coinData = await callBinanceAPI(symbol, time);
    // eslint-disable-next-line no-use-before-define
    setOptions({
      series: [
        {
          type: "candlestick",
          name: `${symbol}`,
          data: coinData,
        },
      ],
    });
  };

  const [options, setOptions] = useCallBinanceAPI(
    symbol,
    {
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
        events: {
          render: () => "renderings",
          redraw: () => "redrawing",
        },
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
                currencyData("15m");
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
                currencyData("1h");
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
                currencyData("4h");
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
                currencyData("1d");
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
                currencyData("1w");
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
    },
    "candlestick"
  );

  const kLineData = useSocketBinanceAPI(symbol, interval);

  useEffect(() => {
    if (options.series[0]) {
      setOptions((op) => {
        const newOptions = { ...op };
        newOptions.series[0].data = [...newOptions.series[0].data, kLineData];
        return newOptions;
      });
    }
  }, [kLineData, options.series, setOptions]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default KLine;
