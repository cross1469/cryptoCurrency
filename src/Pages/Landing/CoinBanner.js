import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Right } from "../../images/next.svg";
import HelpLinksLoader from "../../component/loader/HelpLinksLoader";

const CoinBannerWrapper = styled.section`
  padding: 130px 0;
  background-color: #2b2f36;
  color: #d9d9d9;
  @media only screen and (max-width: 768px) {
    padding: 90px 0;
  }
`;

const CoinBannerFlexContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
  @media only screen and (max-width: 768px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const CoinBannerContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: nowrap;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    text-align: center;
    align-items: center;
    flex-direction: column-reverse;
  }
`;

const CoinContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transform: translateY(0);
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 66.67%;
  }
  @media only screen and (max-width: 576px) {
    width: 100%;
  }
`;

const CoinMarketData = styled.div`
  width: 100%;
  a {
    width: 100%;
    display: flex;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 15px 10px 15px 20px;
    color: #d9d9d9;
    justify-content: space-between;
    background-color: rgba(24, 34, 47, 0.03);
    transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
    :hover {
      transform: scale(1.03);
      box-shadow: 0 6px 8px 0 rgb(0 0 0 / 20%);
      border-bottom: 1px solid #f0b90b;
    }
  }
`;

const CoinMarketText = styled.div`
  color: #687592;
  margin-top: 30px;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
`;

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

const CoinTextContainer = styled.div`
  display: flex;
  position: relative;
  width: 41.67%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CoinTextWrapper = styled.div`
  position: absolute;
  top: calc(50% - 35px);
  flex-direction: column;
  transform: translateY(-50%);
  display: flex;
  flex-flow: row wrap;
  @media only screen and (max-width: 768px) {
    position: relative;
    text-align: center;
    align-items: center;
    flex-direction: column;
    transform: translateY(0);
  }
  h1 {
    font-weight: 500;
    font-size: 36px;
    line-height: 42px;
    margin-bottom: 25px;
    opacity: 1;
    transform: translateY(0);
    width: 100%;
    @media only screen and (max-width: 768px) {
      width: 75%;
    }
    @media only screen and (max-width: 576px) {
      width: 100%;
    }
  }
`;

const CoinTextDescription = styled.div`
  color: #687592;
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  margin-bottom: 25px;
  opacity: 1;
  transform: translateY(0);
  width: 100%;
  @media only screen and (max-width: 768px) {
    width: 66.67%;
  }
  @media only screen and (max-width: 576px) {
    width: 100%;
  }
`;

const CoinTextBtnContainer = styled.div`
  opacity: 1;
  transform: translateY(0);
  transition-delay: 400ms;
  transition: opacity 600ms cubic-bezier(0.12, 1, 0.78, 0.97),
    transform 500ms cubic-bezier(0.12, 1, 0.78, 0.97);
  @media only screen and (max-width: 768px) {
    margin-bottom: 70px;
  }
`;

const BannerToExploreBtn = styled.button`
  position: relative;
  width: 100%;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  width: 120px;
  border-radius: 4px;
  font-family: "Exo 2", sans-serif;
  background-color: #f0b90b;
  :hover {
    background-color: #ffe251;
  }
`;

const StockBanner = () => {
  const [coinLastPrice, setCoinLastPrice] = useState([]);

  const getLastPrice = () =>
    axios
      .get(
        `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/explore`
      )
      .then((res) => {
        const usdtLastPrice = [];
        res.data.forEach((data) => {
          if (data.symbol.indexOf("USDT", 2) !== -1) {
            usdtLastPrice.push(data);
          }
        });
        setCoinLastPrice(usdtLastPrice.slice(0, 5));
      });

  useEffect(() => {
    getLastPrice();
  }, []);

  const renderCoinMarket = () =>
    coinLastPrice.map((coin) => {
      const symbol = coin.symbol.replace(/USDT/, "");
      return (
        <Link to={`/coinDetail/${coin.symbol}`} key={coin.openTime}>
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

  return (
    <CoinBannerWrapper>
      <CoinBannerFlexContainer>
        <CoinBannerContainer>
          <CoinContainer>
            <CoinMarketData>
              {coinLastPrice.length > 0 ? (
                renderCoinMarket()
              ) : (
                <HelpLinksLoader />
              )}
            </CoinMarketData>
            <CoinMarketText>Trade over 200 Cryptocurrency</CoinMarketText>
          </CoinContainer>
          <CoinTextContainer>
            <CoinTextWrapper>
              <h1>
                <p>Your access to the</p>
                <p>top coin markets</p>
              </h1>
              <CoinTextDescription>
                Capitalize on trends and trade with confidence through our
                expansive marketplace listings.
              </CoinTextDescription>
              <CoinTextBtnContainer>
                <Link to="/explore">
                  <BannerToExploreBtn>Explore</BannerToExploreBtn>
                </Link>
              </CoinTextBtnContainer>
            </CoinTextWrapper>
          </CoinTextContainer>
        </CoinBannerContainer>
      </CoinBannerFlexContainer>
    </CoinBannerWrapper>
  );
};

export default StockBanner;
