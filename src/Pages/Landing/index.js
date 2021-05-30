import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { layout, space, flexbox } from "styled-system";
import axios from "axios";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import AreaSpline from "./AreaSpline";
import News from "./News";

const ChartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  ${space}
`;

const ChartSection = styled.div`
  box-sizing: border-box;
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
  ${space}
`;

const ChartItem = styled.div`
  box-sizing: border-box;
  ${space}
  ${flexbox}
  ${layout}
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

const Landing = () => {
  const [symbols, setSymbols] = useState([]);
  const chartItemQty = 4;

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
        <Link to={`/coinDetail/${symbol}`}>
          <AreaSpline symbol={symbol} />
        </Link>
      </ChartItem>
    ));

  return (
    <>
      <Banner />
      <ChartContainer my={4}>
        <ChartSection px={{ sm: "16px", md: "4px", lg: "24px" }} py="24px">
          <FlexBox mb={{ sm: "-16px", md: "-24px", lg: 0 }}>
            {renderChart()}
          </FlexBox>
        </ChartSection>
      </ChartContainer>
      <News />
    </>
  );
};

export default Landing;
