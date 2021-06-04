import React, { useEffect, useState } from "react";
import axios from "axios";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import PropTypes from "prop-types";

const AreaSpline = (props) => {
  const { symbol } = props;

  const callBinanceAPI = (coinSymbol) => {
    axios
      .get(
        `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/${coinSymbol}/1m`
      )
      .then((res) => {
        const currencyData = [];
        for (let i = 0; i < res.data.length; i += 1) {
          currencyData.push([
            res.data[i][0],
            (Number(res.data[i][2]) + Number(res.data[i][3])) / 2,
          ]);
        }
        // eslint-disable-next-line no-use-before-define
        setOptions({
          series: [
            {
              type: "spline",
              name: `${symbol}`,
              data: currencyData,
            },
          ],
        });
      });
  };

  const [options, setOptions] = useState({
    plotOptions: {
      spline: {
        color: "#F0B90B",
      },
    },
    chart: {
      zoomType: "x",
      height: 150,
      backgroundColor: "#121212",
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
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    tooltip: {
      split: true,
    },

    series: [],
  });

  useEffect(() => {
    callBinanceAPI(symbol);
  }, [symbol]);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@kline_1m`
    );
    socket.onmessage = (event) => {
      const newKLineData = [];
      const data = JSON.parse(event.data);
      newKLineData.push(data.k.t, (Number(data.k.h) + Number(data.k.l)) / 2);
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
  }, []);

  if (symbol === "") {
    return null;
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

AreaSpline.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default AreaSpline;
