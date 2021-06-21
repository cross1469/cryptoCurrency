import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Right } from "../../../images/next.svg";

const CoinInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

const CoinLogoContainer = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  margin-right: 15px;
  position: relative;
  border-radius: 8px;
  background-color: #f8f8f8;
  box-shadow: 0 0 0 0.5px rgb(24 34 47 / 5%);
  img {
    display: inline-block;
    vertical-align: middle;
    max-width: 100%;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;

const CoinSymbol = styled.div`
  text-align: left;
  font-size: 18px;
  line-height: 23px;
  position: relative;
`;

const CoinPriceContainer = styled.div`
  display: flex;
  .right {
    width: 17px;
    height: 100%;
    margin-left: 15px;
    display: flex;
    align-items: center;
    svg {
      fill: #fff;
    }
  }
`;

const CoinLastPrice = styled.div`
  font-weight: 500;
  text-align: right;
  font-size: 18px;
  line-height: 23px;
`;

const CoinPercerntage = styled.div`
  display: flex;
  font-size: 14px;
  line-height: 18px;
  align-items: center;
  justify-content: flex-end;
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

const CoinMarket = (props) => {
  const { coinLastPrice } = props;

  const renderCoinMarket = () =>
    coinLastPrice.map((coin) => {
      const symbol = coin.symbol.replace(/USDT/, "");
      return (
        <Link to={`/coinDetail/${coin.symbol}`} key={coin.symbol}>
          <CoinInfoContainer>
            <CoinLogoContainer>
              <img src={`/icon/${symbol.toLowerCase()}.svg`} alt="CoinSymbol" />
            </CoinLogoContainer>
            <div>
              <CoinSymbol>{coin.symbol}</CoinSymbol>
            </div>
          </CoinInfoContainer>
          <CoinPriceContainer>
            <div>
              <CoinLastPrice>
                {Number(coin.lastPrice).toLocaleString()}
              </CoinLastPrice>
              <CoinPercerntage>
                {Number(coin.priceChangePercent).toLocaleString()} %
              </CoinPercerntage>
            </div>
            <div className="right">
              <Right />
            </div>
          </CoinPriceContainer>
        </Link>
      );
    });

  return renderCoinMarket();
};

export default CoinMarket;
