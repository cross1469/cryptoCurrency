import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMarketPrice } from "../Redux/Actions/actionCreator";

const useSocketBinanceAPI = (symbol, interval) => {
  const dispatch = useDispatch();
  const [kLineData, setkLineData] = useState([]);
  useEffect(() => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
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
  }, [dispatch, interval, symbol]);
  return kLineData;
};

export default useSocketBinanceAPI;
