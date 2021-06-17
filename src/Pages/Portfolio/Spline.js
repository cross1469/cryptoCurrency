import React, { useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import PropTypes from "prop-types";
import useCallBinanceAPI from "../../Hooks/useCallBinanceAPI";

const Spline = (props) => {
  const { symbol } = props;

  const [options, setOptions] = useCallBinanceAPI(
    symbol,
    {
      plotOptions: {
        spline: {
          color: "#F0B90B",
        },
      },
      chart: {
        zoomType: "x",
        height: 150,
        backgroundColor: "#14151a",
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
    },
    "spline"
  );

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
  }, [setOptions, symbol]);

  if (symbol === "") {
    return null;
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

Spline.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default Spline;
