import axios from "axios";

const getLastPrice = () =>
  axios
    .get(
      `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/explore`
    )
    .then((res) => {
      const usdtLastPrice = res.data.filter(
        (data) => data.symbol.indexOf("USDT", 2) !== -1
      );
      return usdtLastPrice;
    });

const getCoinSortTrade = () =>
  axios
    .get(
      `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/explore`
    )
    .then((res) => {
      res.data.sort((a, b) => b.count - a.count);
      const usdtLastPrice = res.data.filter(
        (data) => data.symbol.indexOf("USDT", 2) !== -1
      );
      return usdtLastPrice;
    });

export { getLastPrice, getCoinSortTrade };
