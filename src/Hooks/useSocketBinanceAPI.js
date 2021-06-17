import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMarketPrice } from "../Redux/Actions/actionCreator";

const useSocketBinanceAPI = (symbol, interval) => {
  const dispatch = useDispatch();
  const [kLineData, setkLineData] = useState([]);
  useEffect(() => {
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
        setkLineData(newKLineData);
      };

      return () => socket.close();
    };
    const closeSocket = socketAPI(symbol, interval);
    return closeSocket;
  }, [dispatch, interval, symbol]);

  return kLineData;
};

export default useSocketBinanceAPI;
