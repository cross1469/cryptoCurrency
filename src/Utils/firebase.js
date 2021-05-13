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
