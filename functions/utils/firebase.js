const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const firebaseWriteCoinAsset = (
  email,
  coinType,
  coinQty,
  averagePrice,
  profitLoss
) => {
  db.collection("users")
    .doc(email)
    .collection("assets")
    .doc(coinType)
    .set({
      qty: Number(coinQty),
      averagePrice,
      profitLoss,
    });
};

const readMemberEmail = () =>
  db
    .collection("users")
    .get()
    .then((querySnapshot) => {
      const usersEmail = [];
      querySnapshot.forEach((doc) => {
        usersEmail.push(doc.id);
      });
      return usersEmail;
    });

const readUserCoinAsset = (email) =>
  db
    .collection("users")
    .doc(email)
    .collection("assets")
    .get()
    .then((querySnapshot) => {
      const userCoin = [];
      querySnapshot.forEach((doc) => {
        userCoin.push({
          coinType: doc.id,
          coinData: doc.data(),
        });
      });
      return userCoin;
    });

exports.firebase = {
  firebaseWriteCoinAsset: firebaseWriteCoinAsset,
  readMemberEmail: readMemberEmail,
  readUserCoinAsset: readUserCoinAsset,
};
