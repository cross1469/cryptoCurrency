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
  const userEmail = await firebase.firebase.readMemberEmail();
  userEmail.forEach(async (mail) => {
    const userCoinAsset = await firebase.firebase.readUserCoinAsset(mail);
    userCoinAsset.forEach(async (item) => {
      if (item.coinType !== "USDT") {
        const coinLastPrice = await getLastPrice();
        coinLastPrice.forEach((coinPrice) => {
          const symbol = coinPrice.symbol.replace(/USDT/, "");
          if (item.coinType === symbol) {
            const profitLoss =
              (((coinPrice.price - item.coinData.averagePrice) *
                item.coinData.qty) /
                coinPrice.price) *
              100;
            firebase.firebase.firebaseWriteCoinAsset(
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

// const read = async () => {
//   const userEmail = await readMemberEmail();
//   userEmail.forEach(async (mail) => {
//         coinLastPrice.forEach((coinPrice) => {
//           const symbol = coinPrice.symbol.replace(/USDT/, "");
//           collection("users").doc(email).collection("assets").doc(symbol).get().then(doc => {
//             if (doc.exists) {
//               const profitLoss =
//                 (((item.coinData.averagePrice - coinPrice.price) *
//                   item.coinData.qty) /
//                   coinPrice.price) *
//                   100;
//               firebaseWriteCoinAsset(
//                 mail,
//                 item.coinType,
//                 item.coinData.qty,
//                 item.coinData.averagePrice,
//                 profitLoss
//               );
//             }
//           })
//         });
//   });
// };

// every 1 minutes
// every 24 hours
exports.schedule = functions.pubsub
  .schedule("0 0 * * *")
  .timeZone("Asia/Taipei")
  .onRun(() => {
    updateProfitLoss();
    return null;
  });
