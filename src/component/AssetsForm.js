// import React from "react";
import { firebaseReadOrder } from "../Utils/firebase";

const AssetsForm = () => {
  const getBuyOrderData = async () => {
    const orderData = await firebaseReadOrder();
    console.log(orderData);
  };

  getBuyOrderData();

  return "a";
};

export default AssetsForm;
