import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_APIKEY,
  authDomain: "cryptocurrency-0511.firebaseapp.com",
  projectId: "cryptocurrency-0511",
  storageBucket: "cryptocurrency-0511.appspot.com",
  messagingSenderId: "436781868548",
  appId: "1:436781868548:web:4718c2c81bf01c99c8b751",
  measurementId: "G-8K2PQ7E02B",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const firebaseAddOrder = (OrderData) => {
  db.collection("users")
    .doc("cross1469")
    .collection("orders")
    .doc()
    .set({
      coinPirce: Number(OrderData.coinPirce),
      coinType: OrderData.coinType,
      qty: Number(OrderData.qty),
      tradingType: OrderData.tradingType,
      type: OrderData.type,
    });
};

const firebaseReadOrder = () =>
  db
    .collection("users")
    .doc("cross1469")
    .collection("orders")
    .get()
    .then((orders) => {
      const orderData = [];
      orders.forEach((order) => {
        orderData.push(order.data());
      });
      return orderData;
    });

export default firebaseAddOrder;
export { firebaseReadOrder };
