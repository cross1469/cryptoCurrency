import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { space, layout, flexbox } from "styled-system";
import AreaSpline from "./AreaSpline";
import CoinData from "./CoinData";
import { subscribeUserData } from "../../Utils/firebase";

const ExploreContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  ${space}
`;

const ChartBox = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  background-color: #fafafa;
  ${space}
`;

const FlexBox = styled.div`
  box-sizing: border-box;
  margin: 0;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  font-size: 12px;
  flex-wrap: wrap;
  flex-direction: row;
`;

const ChartItem = styled.div`
  box-sizing: border-box;
  ${space}
  ${flexbox}
  ${layout}
`;

const ChartLink = styled.div`
  a {
    box-sizing: border-box;
    padding: 16px;
    display: block;
    background-color: #fff;
    color: #1e2329;
    position: relative;
    border-radius: 3px;
    box-shadow: rgb(0 0 0 / 4%) 0px 0px 20px 0px;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Explore = () => {
  const [symbols, setSymbols] = useState([]);
  const chartItemQty = 4;
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

  const getSymbol = () => {
    const allSymbol = [];
    const fourSymbols = [];
    axios
      .get(
        `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/explore`
      )
      .then((res) => {
        const randomAllData = res.data.sort(() => Math.random() - 0.5);

        for (let i = 0; i < randomAllData.length; i += 1) {
          if (randomAllData[i].symbol.indexOf("USDT", 2) !== -1) {
            allSymbol.push(randomAllData[i].symbol);
          }
        }

        for (let i = 0; i < chartItemQty; i += 1) {
          fourSymbols.push(allSymbol.sort(() => Math.random() - 0.5)[i]);
        }
        setSymbols(fourSymbols);
      });
  };

  useEffect(() => {
    getSymbol();
  }, []);

  const renderChart = () =>
    symbols.map((symbol) => (
      <ChartItem
        px={{ sm: 0, md: "12px", lg: "8px" }}
        pb={{ sm: "16px", md: "24px", lg: 0 }}
        width={{ _: "100%", md: "50%", lg: "25%" }}
        flex={{ sm: "none", md: "none", lg: 1 }}
        key={symbol}
      >
        <ChartLink>
          <Link to={`/coinDetail/${symbol}`}>
            <AreaSpline symbol={symbol} />
          </Link>
        </ChartLink>
      </ChartItem>
    ));

  return (
    <ExploreContainer mt={3}>
      <ChartBox px={{ sm: "16px", md: "4px", lg: "24px" }} py="24px">
        <FlexBox mb={{ sm: "-16px", md: "-24px", lg: 0 }}>
          {renderChart()}
        </FlexBox>
      </ChartBox>
      <CoinData email={email} userId={userId} />
    </ExploreContainer>
  );
};

export default Explore;
