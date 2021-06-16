import axios from "axios";

const getUsdtCoinData = () =>
  axios
    .get(
      `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/explore`
    )
    .then((res) => {
      const usdtLastPrice = res.data.filter(
        (data) => data.symbol.indexOf("USDT", 2) !== -1
      );
      const usdtSymbol = [];
      res.data.forEach((data) => {
        if (data.symbol.indexOf("USDT", 2) !== -1) {
          usdtSymbol.push(data.symbol);
        }
      });
      return { usdtLastPrice, usdtSymbol };
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

const getCoinHotNews = async () => {
  const options = {
    method: "GET",
    url: "https://free-news.p.rapidapi.com/v1/search",
    params: { q: "Crypto", lang: "en" },
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_NEWS_APIKEY,
      "x-rapidapi-host": "free-news.p.rapidapi.com",
    },
  };
  const res = await axios.request(options);
  const newsFourHeadline = res.data.articles.slice(0, 3);
  return newsFourHeadline;
};

const getCoinLastPrice = () =>
  axios
    .get(
      `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/portfolio`
    )
    .then((res) => {
      const usdtLastPrice = res.data.filter(
        (data) => data.symbol.indexOf("USDT", 2) !== -1
      );
      return usdtLastPrice;
    });

const getCoinNews = async (coin) => {
  const options = {
    method: "GET",
    url: "https://free-news.p.rapidapi.com/v1/search",
    params: { q: coin, lang: "en" },
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_NEWS_APIKEY,
      "x-rapidapi-host": "free-news.p.rapidapi.com",
    },
  };
  const res = await axios.request(options);
  const newsFourHeadline = res.data.articles.slice(0, 6);
  return newsFourHeadline;
};

export {
  getUsdtCoinData,
  getCoinSortTrade,
  getCoinHotNews,
  getCoinLastPrice,
  getCoinNews,
};
