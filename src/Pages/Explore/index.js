import React, { useState, useEffect } from "react";
import CoinData from "./CoinData";
import { subscribeUserData } from "../../Utils/firebase";
import TrendCoin from "./TrendCoin";

const Explore = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(
    () =>
      subscribeUserData((userEmail, uid) => {
        if (userEmail) {
          setEmail(userEmail);
          setUserId(uid);
        } else {
          setEmail("");
          setUserId("");
        }
      }),
    [email]
  );

  return (
    <>
      <TrendCoin />
      <CoinData email={email} userId={userId} />
    </>
  );
};

export default Explore;
