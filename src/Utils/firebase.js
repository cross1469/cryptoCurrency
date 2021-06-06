import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "cryptocurrency-0511.firebaseapp.com",
  projectId: "cryptocurrency-0511",
  storageBucket: "cryptocurrency-0511.appspot.com",
  messagingSenderId: "436781868548",
  appId: "1:436781868548:web:4718c2c81bf01c99c8b751",
  measurementId: "G-8K2PQ7E02B",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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

const firebaseReadCoinAsset = (email, coinType) =>
  db
    .collection("users")
    .doc(email)
    .collection("assets")
    .doc(coinType)
    .get()
    .then((doc) => {
      if (doc.data() === undefined) {
        return { profitLoss: 0, qty: 0, averagePrice: 0 };
      }
      const assetData = doc.data();
      const { profitLoss, qty, averagePrice } = assetData;
      return { profitLoss, qty, averagePrice };
    });

const firebaseReadAsset = (email) =>
  db
    .collection("users")
    .doc(email)
    .collection("assets")
    .get()
    .then((docs) => {
      const coinDatas = [];
      docs.forEach((doc) => {
        const coinData = doc.data();
        coinDatas.push({
          coinType: doc.id,
          ...coinData,
        });
      });
      return coinDatas;
    });

const firebaseAddOrder = (orderData, email) => {
  db.collection("users")
    .doc(email)
    .collection("orders")
    .doc()
    .set({
      timestamp: Date.now(),
      coinPrice: Number(orderData.coinPrice),
      coinType: orderData.coinType,
      qty: Number(orderData.qty),
      tradingType: orderData.tradingType,
      type: orderData.type,
    });
};

const firebaseReadOrder = (email) =>
  db
    .collection("users")
    .doc(email)
    .collection("orders")
    .get()
    .then((orders) => {
      const orderData = [];
      orders.forEach((order) => {
        orderData.push(order.data());
      });
      return orderData;
    });

const addChatData = (chatData) => {
  db.collection("chat").doc().set({
    account: chatData.account,
    messages: chatData.messages,
    timestamp: Date.now(),
  });
};

const readChatData = (setChatData) =>
  db
    .collection("chat")
    .orderBy("timestamp")
    .onSnapshot((querySnapshot) => {
      const chatData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setChatData(chatData);
    });

const readWishList = (email) =>
  db
    .collection("users")
    .doc(email)
    .get()
    .then((wishLists) => {
      if (wishLists.data() === undefined) {
        return [];
      }
      const wishList = [];
      wishLists.data().wishList.forEach((item) => {
        wishList.push(item);
      });
      return wishList;
    });

const addWishList = async (email, wishItem) => {
  db.collection("users")
    .doc(email)
    .update({
      wishList: firebase.firestore.FieldValue.arrayUnion(wishItem),
    });
};

const removeWishList = async (email, wishItem) => {
  db.collection("users")
    .doc(email)
    .update({
      wishList: firebase.firestore.FieldValue.arrayRemove(wishItem),
    });
};

const firebaseAuthSignUp = (email, password) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => result)
    .catch((error) => error.code);

const firebaseAuthSignIn = (email, password) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => result.user)
    .catch((error) => error.code);

const firebaseAuthSignOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {});
};

const subscribeUserData = (callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const { email } = user;
      const { uid } = user;
      callback(email, uid);
    } else {
      callback(null, null);
    }
  });
};

const firebaseAuthForget = (email) =>
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => "已送出")
    .catch((error) => error.code);

const firebaseAuthGoogleSignIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const { email, uid } = result.user;
      return { email, uid };
    })
    .catch((error) => error.code);
};

const firebaseGetLimitOrderData = (email, coinType) =>
  db
    .collection("users")
    .doc(email)
    .collection("orders")
    .where("tradingType", "==", "limit")
    .get()
    .then((limitDatas) => {
      const limitOrderData = [];
      limitDatas.forEach((limitData) => {
        if (limitData.data().coinType === coinType) {
          limitOrderData.push(limitData.data());
        }
      });
      return limitOrderData;
    });

export default firebaseAddOrder;
export {
  firebaseReadOrder,
  addChatData,
  readChatData,
  addWishList,
  removeWishList,
  readWishList,
  firebaseAuthSignUp,
  firebaseAuthSignIn,
  subscribeUserData,
  firebaseAuthSignOut,
  firebaseAuthForget,
  firebaseAuthGoogleSignIn,
  firebaseWriteCoinAsset,
  firebaseReadCoinAsset,
  firebaseGetLimitOrderData,
  firebaseReadAsset,
};
