import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CoinData from "./CoinData/index";
import TrendCoin from "./TrendCoin/index";
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
