import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CoinData from "./CoinData";
import TrendCoin from "./TrendCoin";
import { updatePageName } from "../../Redux/Actions/actionCreator";

const Explore = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(updatePageName("explore")), [dispatch]);

  return (
    <>
      <TrendCoin />
      <CoinData />
    </>
  );
};

export default Explore;
