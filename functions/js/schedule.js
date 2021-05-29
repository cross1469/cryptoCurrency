const functions = require("firebase-functions");
const axios = require("axios");
const firebase = require("../utils/firebase");

const getLastPrice = () =>
  axios
    .get(
      "https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/portfolio"
    )
    .then((res) => {
      const usdtLastPrice = [];
      res.data.forEach((data) => {
        if (data.symbol.indexOf("USDT", 2) !== -1) {
          usdtLastPrice.push(data);
        }
      });
      return usdtLastPrice;
    });

const updateProfitLoss = async () => {
  const userEmail = await firebase.readMemberEmail();
  userEmail.forEach(async (mail) => {
    const userCoinAsset = await firebase.readUserCoinAsset(mail);
    userCoinAsset.forEach(async (item) => {
      if (item.coinType !== "USDT") {
        const coinLastPrice = await getLastPrice();
        coinLastPrice.forEach((coinPrice) => {
          const symbol = coinPrice.symbol.replace(/USDT/, "");
          if (item.coinType === symbol) {
            const profitLoss =
              (((item.coinData.averagePrice - coinPrice.price) *
                item.coinData.qty) /
                coinPrice.price) *
              100;
            firebase.firebaseWriteCoinAsset(
              mail,
              item.coinType,
              item.coinData.qty,
              item.coinData.averagePrice,
              profitLoss
            );
          }
        });
      }
    });
  });
};

exports.schedule = functions.pubsub
  .schedule("every 24 hours")
  .timeZone("Asia/Taipei")
  .onRun(() => {
    updateProfitLoss();
  });
