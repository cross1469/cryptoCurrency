import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { space, layout, flexbox } from "styled-system";
import AreaSpline from "./AreaSpline";
import CoinData from "./CoinData";

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
  const [propsSymbol, setPropsSymbol] = useState([]);
  const chartItemQty = [0, 1, 2, 3];

  const renderChart = () =>
    chartItemQty.map((index) => (
      <ChartItem
        px={{ sm: 0, md: "12px", lg: "8px" }}
        pb={{ sm: "16px", md: "24px", lg: 0 }}
        width={{ _: "100%", md: "50%", lg: "25%" }}
        flex={{ sm: "none", md: "none", lg: 1 }}
        key={index}
      >
        <ChartLink>
          <Link to={`/coinDetail/${propsSymbol[index]}`}>
            <AreaSpline setPropsSymbol={setPropsSymbol} />
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
      <CoinData />
    </ExploreContainer>
  );
};

export default Explore;
