import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "./Banner";
import CoinBanner from "./CoinBanner/index";
import News from "./News/index";
import { updatePageName } from "../../Redux/Actions/actionCreator";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(updatePageName("landing")), [dispatch]);
  return (
    <>
      <Banner />
      <CoinBanner />
      <News />
    </>
  );
};

export default Landing;
