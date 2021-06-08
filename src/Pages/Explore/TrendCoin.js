import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";
import DashboardLoader from "../../Component/loader/DashboardLoader";

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
  color: #fff;
  min-height: 28px;
  width: 100%;
  margin-bottom: 24px;
  span {
    white-space: nowrap;
    font-size: 24px;
    padding: 2px 8px;
  }
`;

const TrendingCardContainer = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  ::-webkit-scrollbar {
    display: none;
  }
  a {
    text-decoration: none;
    outline: none;
    cursor: pointer;
    width: 100%;
    background-color: #2b2f36;
    padding: 16px 20px;
    margin-right: 16px;
    min-width: 250px;
    max-width: 300px;
    display: flex;
    white-space: nowrap;
    flex-direction: column;
    border-radius: 6px;
    overflow: hidden;
    color: #fff;
    border: 1px solid #14151a;
    box-shadow: var(inset 0 0 0 0.5px rgba(255, 255, 255, 0.1));
    :last-child {
      margin-right: 0;
    }
    :hover {
      border: 1px solid #f0b90b;
    }
    @media only screen and (max-width: 768px) {
      padding: 16px;
      min-width: 200px;
    }
  }
`;

const TrendingCardTitle = styled.div`
  display: grid;
  justify-content: start;
  align-content: center;
  overflow: hidden;
`;

const TrendingCoinLogoContainer = styled.div`
  grid-row: 1 / span 2;
  grid-column: 1;
  margin-right: 12px;
  align-self: center;
  flex: none;
  overflow: hidden;
  position: relative;
  border-radius: 25%;
  width: 32px;
  height: 32px;
  box-shadow: rgba(0, 0, 0, 0.4);
  background-color: rgba(255, 255, 255, 0.25);
  @media only screen and (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    vertical-align: middle;
    border: 0;
  }
`;

const TrendingCoinNameContainer = styled.div`
  grid-row: 1;
  grid-column: 2;
  display: grid;
  span {
    grid-column: 1;
    align-self: center;
    margin-right: 4px;
    text-decoration: none;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TrendingCoinSubtitleContainer = styled.div`
  grid-row: 2;
  grid-column: 2;
  display: grid;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  span {
    grid-column: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TrendingCardPrice = styled.div`
  margin-top: 46px;
  margin-bottom: 27px;
  font-size: 24px;
  line-height: 32px;
  @media only screen and (max-width: 768px) {
    margin-top: 28px;
    margin-bottom: 6px;
  }
  span {
    margin: 0;
    margin-right: 2px;
  }
`;

const TrendingCardXlFooter = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const TrendingCardXlFooterText = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 4px;
  column-gap: 4px;
  span {
    margin: 0;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    line-height: 16px;
  }
`;

const TrendingCardXlFooterTextChange = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => {
    if (props.children[0] > 0) {
      return "#0ecb81";
    }
    if (props.children[0] === 0) {
      return "#707a8a";
    }
    return "#f6465d";
  }};
`;

const TrendingCardXlFooterTextVolumn = styled.div`
  margin: 0;
  text-decoration: none;
  font-size: 14px;
  line-height: 20px;
  span {
    margin-right: 2px;
    margin: 0;
  }
`;

const TrendingCardMdFooter = styled.div`
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const TrendingCardMdFooterText = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => {
    if (props.children[0] > 0) {
      return "#0ecb81";
    }
    if (props.children[0] === 0) {
      return "#707a8a";
    }
    return "#f6465d";
  }};
`;

const TrendCoin = () => {
  const [coinLastPrice, setCoinLastPrice] = useState([]);

  const renderThumb = ({ style }) => {
    const thumbStyle = {
      backgroundColor: "#2b2f36",
      width: "5px",
      borderRadius: "3px",
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  };

  const getLastPrice = () =>
    axios
      .get(
        `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/explore`
      )
      .then((res) => {
        const usdtLastPrice = [];
        res.data.sort((a, b) => b.count - a.count);
        res.data.forEach((data) => {
          if (data.symbol.indexOf("USDT", 2) !== -1) {
            usdtLastPrice.push(data);
          }
        });

        setCoinLastPrice(usdtLastPrice.slice(0, 4));
      });

  useEffect(() => {
    getLastPrice();
  }, []);

  const renderTrendCard = () =>
    coinLastPrice.map((coin) => {
      const symbol = coin.symbol.replace(/USDT/, "");
      return (
        <Link to={`/coinDetail/${coin.symbol}`} key={coin.openTime}>
          <TrendingCardTitle>
            <TrendingCoinLogoContainer>
              <img src={`/icon/${symbol.toLowerCase()}.svg`} alt="CoinSymbol" />
            </TrendingCoinLogoContainer>
            <TrendingCoinNameContainer>{coin.symbol}</TrendingCoinNameContainer>
            <TrendingCoinSubtitleContainer>
              <span>Top trade count</span>
            </TrendingCoinSubtitleContainer>
          </TrendingCardTitle>
          <TrendingCardPrice>
            <span>$ {Number(coin.lastPrice).toLocaleString()}</span>
          </TrendingCardPrice>
          <TrendingCardXlFooter>
            <TrendingCardXlFooterText>
              <TrendingCardXlFooterTextChange>
                {Number(coin.priceChangePercent).toLocaleString()} %
              </TrendingCardXlFooterTextChange>
              <TrendingCardXlFooterTextVolumn>
                {Number(coin.volume).toLocaleString()}
              </TrendingCardXlFooterTextVolumn>
              <span>24h Change</span>
              <span>24h Volume</span>
            </TrendingCardXlFooterText>
          </TrendingCardXlFooter>
          <TrendingCardMdFooter>
            <TrendingCardMdFooterText>
              {Number(coin.priceChangePercent).toLocaleString()} %
            </TrendingCardMdFooterText>
          </TrendingCardMdFooter>
        </Link>
      );
    });

  return (
    <TrendingContainer>
      <TrendinWrapper>
        <TrendingTitleContainer>
          <span>Trending</span>
        </TrendingTitleContainer>

        {coinLastPrice.length > 0 ? (
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            renderThumbHorizontal={renderThumb}
            style={{ width: "100%", height: "220px" }}
          >
            <TrendingCardContainer> {renderTrendCard()}</TrendingCardContainer>
          </Scrollbars>
        ) : (
          <DashboardLoader />
        )}
      </TrendinWrapper>
    </TrendingContainer>
  );
};

export default TrendCoin;
