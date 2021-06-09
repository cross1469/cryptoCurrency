import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { firebaseReadAsset } from "../../Utils/firebase";
import DashboardLoader from "../../Component/loader/DashboardLoader";

const UserAssetContainer = styled.div`
  background-color: #14151a;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  flex-direction: column;
  padding: 48px 0;
  @media only screen and (max-width: 768px) {
    padding: 32px 0;
  }
`;

const UserAssetWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
`;

const UserAssetTitleContainer = styled.div`
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

const UserAssetCardContainer = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: flex-start;
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
    color: #d9d9d9;
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

const UserAssetCardTitle = styled.div`
  display: grid;
  justify-content: start;
  align-content: center;
  overflow: hidden;
`;

const UserAssetCoinLogoContainer = styled.div`
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

const UserAssetCoinNameContainer = styled.div`
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

const UserAssetCoinSubtitleContainer = styled.div`
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

const UserAssetCardPrice = styled.div`
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

const UserAssetCardXlFooter = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const UserAssetCardXlFooterText = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 4px;
  column-gap: 4px;
  span {
    margin: 0;
    color: #d9d9d9;
    font-size: 12px;
    line-height: 16px;
  }
`;

const UserAssetCardXlFooterTextChange = styled.div`
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

const UserAssetCardXlFooterTextVolumn = styled.div`
  margin: 0;
  text-decoration: none;
  font-size: 14px;
  line-height: 20px;
  span {
    margin-right: 2px;
    margin: 0;
  }
`;

const UserAssetCardMdFooter = styled.div`
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const UserAssetCardMdFooterText = styled.div`
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

const UserAsset = (props) => {
  const [coinLastPrice, setCoinLastPrice] = useState([]);
  const [userAsset, setUserAsset] = useState([]);
  const { email } = props;

  const getUserAsset = async () => {
    if (email) {
      const asset = await firebaseReadAsset(email);
      setUserAsset(asset);
    }
  };

  const renderThumb = ({ style }) => {
    const thumbStyle = {
      backgroundColor: "#2f3336",
      width: "3px",
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
        res.data.forEach((data) => {
          if (data.symbol.indexOf("USDT", 2) !== -1) {
            usdtLastPrice.push(data);
          }
        });
        setCoinLastPrice(usdtLastPrice);
      });

  useEffect(() => {
    getLastPrice();
  }, []);

  useEffect(() => {
    getUserAsset();
  }, [email]);

  const renderAssetCard = () =>
    userAsset.map((asset) =>
      coinLastPrice.map((coin) => {
        const symbol = coin.symbol.replace(/USDT/, "");
        if (asset.coinType === symbol) {
          return (
            <Link to={`/coinDetail/${coin.symbol}`} key={coin.openTime}>
              <UserAssetCardTitle>
                <UserAssetCoinLogoContainer>
                  <img
                    src={`/icon/${asset.coinType.toLowerCase()}.svg`}
                    alt="CoinSymbol"
                  />
                </UserAssetCoinLogoContainer>
                <UserAssetCoinNameContainer>
                  {coin.symbol}
                </UserAssetCoinNameContainer>
                <UserAssetCoinSubtitleContainer>
                  <span>my cryptocurrency</span>
                </UserAssetCoinSubtitleContainer>
              </UserAssetCardTitle>
              <UserAssetCardPrice>
                <span>$ {Number(coin.lastPrice).toLocaleString()}</span>
              </UserAssetCardPrice>
              <UserAssetCardXlFooter>
                <UserAssetCardXlFooterText>
                  <UserAssetCardXlFooterTextChange>
                    {Number(coin.priceChangePercent).toLocaleString()} %
                  </UserAssetCardXlFooterTextChange>
                  <UserAssetCardXlFooterTextVolumn>
                    {Number(asset.qty).toLocaleString()}
                  </UserAssetCardXlFooterTextVolumn>
                  <span>24h Change</span>
                  <span>Qty</span>
                </UserAssetCardXlFooterText>
              </UserAssetCardXlFooter>
              <UserAssetCardMdFooter>
                <UserAssetCardMdFooterText>
                  {Number(coin.priceChangePercent).toLocaleString()} %
                </UserAssetCardMdFooterText>
              </UserAssetCardMdFooter>
            </Link>
          );
        }
        return null;
      })
    );

  return (
    <UserAssetContainer>
      <UserAssetWrapper>
        <UserAssetTitleContainer>
          <span>My cryptocurrencies</span>
        </UserAssetTitleContainer>

        {coinLastPrice.length > 0 ? (
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            renderThumbHorizontal={renderThumb}
            style={{ width: "100%", height: "220px" }}
          >
            <UserAssetCardContainer>{renderAssetCard()}</UserAssetCardContainer>
          </Scrollbars>
        ) : (
          <DashboardLoader />
        )}
      </UserAssetWrapper>
    </UserAssetContainer>
  );
};

UserAsset.propTypes = {
  email: PropTypes.string.isRequired,
};

export default UserAsset;
