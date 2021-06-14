import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CoinData from "./CoinData";
import { subscribeUserData } from "../../Utils/firebase";
import TrendCoin from "./TrendCoin";
import { updatePageName } from "../../Redux/Actions/actionCreator";

const Explore = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  useEffect(
    () =>
      subscribeUserData((userEmail, uid) => {
        dispatch(updatePageName("explore"));
        if (userEmail) {
          setEmail(userEmail);
          setUserId(uid);
        } else {
          setEmail("");
          setUserId("");
        }
      }),
    [dispatch, email]
  );

  return (
    <>
      <TrendCoin />
      <CoinData email={email} userId={userId} />
    </>
  );
};

export default Explore;
