import React, { Component } from "react";
import styled from "styled-components";
import DashboardLoader from "../../../component/loader/DashboardLoader";
import { getCoinSortTrade } from "../../../Utils/api";
import TrendCoinCard from "./TrendCoinCard";

const TrendingContainer = styled.div`
  background-color: #14151a;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  flex-direction: column;
  padding: 48px 24px;
  @media only screen and (max-width: 768px) {
    padding: 32px 16px;
  }
`;

const TrendinWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
`;

const TrendingTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: #d9d9d9;
  min-height: 28px;
  width: 100%;
  margin-bottom: 24px;
  span {
    white-space: nowrap;
    font-size: 24px;
    padding: 2px 8px;
  }
`;

class TrendCoin extends Component {
  constructor() {
    super();
    this.state = {
      coinSort: [],
    };
  }

  componentDidMount() {
    const getCoinSort = async () => {
      const coinPrice = await getCoinSortTrade();
      this.setState({ coinSort: coinPrice.slice(0, 4) });
    };
    getCoinSort();
  }

  render() {
    const { coinSort } = this.state;
    return (
      <TrendingContainer>
        <TrendinWrapper>
          <TrendingTitleContainer>
            <span>Trending</span>
          </TrendingTitleContainer>

          {coinSort.length > 0 ? (
            <TrendCoinCard coinSort={coinSort} />
          ) : (
            <DashboardLoader />
          )}
        </TrendinWrapper>
      </TrendingContainer>
    );
  }
}

export default TrendCoin;
