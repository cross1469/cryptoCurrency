import React, { useEffect, useState } from "react";
import axios from "axios";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

const symbols = [];

const AreaSpline = (props) => {
  const [symbol, setSymbol] = useState("");
  // eslint-disable-next-line react/prop-types
  const { setPropsSymbol } = props;

  const getSymbol = () => {
    const allSymbol = [];
    axios
      .get(
        `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/explore`
      )
      .then((res) => {
        const randomAllData = res.data.sort(() => Math.random() - 0.5);

        for (let i = 0; i < randomAllData.length; i += 1) {
          allSymbol.push(randomAllData[i].symbol);
        }
        const oneSymbol = allSymbol.sort(() => Math.random() - 0.5)[0];
        setSymbol(oneSymbol);
        symbols.push(oneSymbol);
        console.log([...symbols]);
        setPropsSymbol([...symbols]);
        // setPropsSymbol(prev => {
        //   const symbols = [...prev];
        //   symbols[] = oneSymbol
        //   return symbols
        // });
      });
  };

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
              type: "areaspline",
              name: `${symbol}`,
              data: currencyData,
            },
          ],
        });
      });
  };

  const [options, setOptions] = useState({
    chart: {
      zoomType: "x",
      height: 150,
    },

    title: {
      text: `${symbol}`,
    },
    xAxis: {
      type: "datetime",
    },
    tooltip: {
      split: true,
    },

    series: [],
  });

  useEffect(() => {
    getSymbol();
  }, []);

  useEffect(() => {
    if (symbol !== "") {
      callBinanceAPI(symbol);
    }
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
  }, []);

  if (symbol === "") {
    return null;
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default AreaSpline;
