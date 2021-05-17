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

const firebaseAddOrder = (orderData) => {
  db.collection("users")
    .doc("cross1469")
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

const readWishList = () =>
  db
    .collection("users")
    .doc("cross1469")
    .get()
    .then((wishLists) => {
      const wishList = [];
      wishLists.data().wishList.forEach((item) => {
        wishList.push(item);
      });
      return wishList;
    });

const addWishList = async (wishList) => {
  const wishListData = await readWishList();

  if (wishListData.indexOf(wishList) === -1) {
    db.collection("users")
      .doc("cross1469")
      .update({
        wishList: firebase.firestore.FieldValue.arrayUnion(wishList),
      });
  } else {
    db.collection("users")
      .doc("cross1469")
      .update({
        wishList: firebase.firestore.FieldValue.arrayRemove(wishList),
      });
  }
};

const firebaseAuthSignUp = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const firebaseAuthSignIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// const firebaseAuthSignOut = () => {
//   au.signOut()
//     .then(() => {
//       window.location.reload();
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };

// const getUserData = () => {
//   au.onAuthStateChanged((user) => {
//     if (user) {
//       const { email } = user;
//       const { uid } = user;
//       console.log(email, uid);
//     }
//   });
// };

export default firebaseAddOrder;
export {
  firebaseReadOrder,
  addChatData,
  readChatData,
  addWishList,
  readWishList,
  firebaseAuthSignUp,
  firebaseAuthSignIn,
  // getUserData,
  // firebaseAuthSignOut,
};
