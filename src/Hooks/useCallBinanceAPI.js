import { useState, useEffect } from "react";
import { callBinanceAPI } from "../Utils/api";

const useCallBinanceAPI = (symbol, chartOption, chartType) => {
  const [options, setOptions] = useState(chartOption);

  useEffect(() => {
    const currencyData = async () => {
      const coinData = await callBinanceAPI(symbol, "1h");
      setOptions({
        series: [
          {
            type: `${chartType}`,
            name: `${symbol}`,
            data: coinData,
          },
        ],
      });
    };
    currencyData();
  }, [chartType, symbol]);

  return [options, setOptions];
};

export default useCallBinanceAPI;
