import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HelpLinksLoader from "../../../component/loader/HelpLinksLoader";
import { getUsdtCoinData } from "../../../Utils/api";
import CoinMarket from "./CoinMarket";

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

class CoinBanner extends Component {
  constructor() {
    super();
    this.state = {
      coinLastPrice: [],
    };
  }

  componentDidMount() {
    const getCoinPrice = async () => {
      const coinPrice = await getUsdtCoinData();
      this.setState({ coinLastPrice: coinPrice.usdtLastPrice.slice(0, 5) });
    };
    getCoinPrice();
  }

  render() {
    const { coinLastPrice } = this.state;
    return (
      <CoinBannerWrapper>
        <CoinBannerFlexContainer>
          <CoinBannerContainer>
            <CoinContainer>
              <CoinMarketData>
                {coinLastPrice.length > 0 ? (
                  <CoinMarket coinLastPrice={coinLastPrice} />
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
  }
}

export default CoinBanner;
