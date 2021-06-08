import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { readWishList } from "../../Utils/firebase";
import { ReactComponent as Right } from "../../images/next.svg";
import MobileWishList from "./MobileWishList";
import Spline from "./Spline";

const override = css`
  display: flex;
  justify-content: center;
`;

const LoadingContainer = styled.div`
  padding: 122px;
  margin: 0 auto;
`;

const WishListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #14151a;
  margin-bottom: 22px;
  border-radius: 4px;
  border: 1px solid rgb(236, 239, 241);
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const WishHeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 32px;
`;

const WishHeaderContent = styled.div`
  flex: 1 1 0%;
`;

const WishHeaderContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  h1 {
    font-weight: 400;
    margin: 0px;
    padding: 0px;
    span {
      margin: 8px 0px 0px;
      font-size: 24px;
      font-weight: 500;
      color: #fff;
    }
  }
`;

const WishListBody = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const WishListBodyContainer = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: none 0s ease 0s;
`;

const WishListBodyModule = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 1;
`;

const WishListChartLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-style: solid;
  border-width: 0;
`;

const WishListItem = styled.div`
  flex: 1 1 auto;
  position: relative;
  width: 25%;
  max-width: 25%;
  border-right: 1px solid rgb(236, 239, 241);
`;

const WishListItemContainer = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: none 0s ease 0s;
`;

const WishListItemModule = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 1;
`;

const WishListItemStyle = styled.div`
  display: flex;
  flex-direction: row;
  a {
    text-decoration: none;
    cursor: pointer;
    color: #fff;
    display: flex;
    flex: 1 1 auto;
    width: 100%;
  }
`;

const WishListHoverButtonContainer = styled.div`
  position: absolute;
  inset: 0px;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease 0s;
  border-radius: 4px;
`;

const WishListHoverButton = styled.button`
  position: relative;
  width: auto;
  margin: 0px;
  border-radius: 4px;
  color: #121212;
  cursor: pointer;
  transition: all 80ms ease-in-out 0s;
  padding: 12px 16px;
  font-size: 14px;
  border: none;
  background-image: linear-gradient(
    rgb(255, 226, 81) 0%,
    rgb(237, 196, 35) 100%
  );
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    pointer-events: none;
    flex-wrap: nowrap;
    white-space: nowrap;
    font-weight: 500;
  }
`;

const WishListMiniItem = styled.div`
  display: flex;
  position: relative;
  flex: 1 1 0%;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  transition: all 0.2s ease-in-out 0s;
  cursor: pointer;
`;

const WishListMiniItemTop = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-bottom: 8px;
  label {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    transition: color 80ms ease-in-out 0s;
    display: block;
    margin-left: 8px;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    min-width: 26px;
    width: auto;
    height: 18px;
    margin-top: 2px;
    padding-left: 3px;
    padding-right: 3px;
    margin-left: auto;
    font-size: 11px;
    font-weight: 500;
    border-radius: 4px;
  }
`;

const WishListItemPrice = styled.div`
  flex-flow: row wrap;
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  span {
    font-size: 22px;
    font-weight: 500;
  }
`;

const WishListItemPricePercentage = styled.div`
  margin-left: 0px;
  padding-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => {
    if (props.children[0] > 0) {
      return "#0ecb81";
    }
    if (props.children[0] === 0) {
      return "#707a8a";
    }
    return "#f6465d";
  }};
  h4 {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }
`;

const MiniChart = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  overflow: hidden;
`;

const WishListBottom = styled.div`
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
    cursor: pointer;
  }
`;

const WishListBottomContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  height: 54px;
  border-top: 1px solid rgb(236, 239, 241);
  font-weight: 500;
  transition: all 0.25s ease 0s;
  cursor: pointer;
  color: #fff;
  fill: #fff;
  svg {
    width: 10px;
    height: 10px;
    margin-top: 2px;
    margin-left: 6px;
  }
  :hover {
    fill: #f0b90b;
    color: #f0b90b;
    transition: all 0.25s ease 0s;
  }
`;

const DisplayMobileWishList = styled(MobileWishList)`
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const WishList = (props) => {
  const [wishList, setWishList] = useState([]);
  const { email } = props;
  const [coinLastPrice, setCoinLastPrice] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWishListData = async () => {
    if (email) {
      const wishListData = await readWishList(email);
      setWishList(wishListData);
    }
  };

  const handleBlockButton = (e) => {
    e.target.style.opacity = 1;
  };

  const handleNoneButton = (e) => {
    e.target.style.opacity = 0;
  };

  useEffect(() => {
    getWishListData();
  }, [email]);

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
        setLoading(false);
      });

  useEffect(() => {
    getLastPrice();
  }, []);

  const renderWishList = () =>
    wishList.map((wishData) =>
      coinLastPrice.map((coin) => {
        if (wishData === coin.symbol) {
          return (
            <WishListItem key={coin.openTime}>
              <WishListItemContainer>
                <WishListItemModule>
                  <WishListItemStyle>
                    <Link
                      to={`/coinDetail/${wishData}`}
                      onMouseEnter={handleBlockButton}
                      onMouseLeave={handleNoneButton}
                    >
                      <WishListMiniItem>
                        <WishListMiniItemTop>
                          <label htmlFor="wishDataName">{wishData}</label>
                          <div>24h</div>
                        </WishListMiniItemTop>
                        <WishListItemPrice>
                          <span>{Number(coin.lastPrice).toLocaleString()}</span>
                        </WishListItemPrice>
                        <WishListItemPricePercentage>
                          <h4>
                            {Number(coin.priceChangePercent).toLocaleString()}%
                          </h4>
                        </WishListItemPricePercentage>
                        <MiniChart>
                          <Spline symbol={wishData} />
                        </MiniChart>
                      </WishListMiniItem>
                      <WishListHoverButtonContainer>
                        <WishListHoverButton>
                          <span>View asset</span>
                        </WishListHoverButton>
                      </WishListHoverButtonContainer>
                    </Link>
                  </WishListItemStyle>
                </WishListItemModule>
              </WishListItemContainer>
            </WishListItem>
          );
        }
        return null;
      })
    );

  return (
    <section>
      <WishHeaderContainer>
        <WishHeaderContent>
          <WishHeaderContentContainer>
            <h1>
              <span>WishList</span>
            </h1>
          </WishHeaderContentContainer>
        </WishHeaderContent>
      </WishHeaderContainer>

      <WishListContainer>
        <WishListBody>
          <WishListBodyContainer>
            <WishListBodyModule>
              <WishListChartLayout>
                {coinLastPrice.length > 0 ? (
                  renderWishList()
                ) : (
                  <LoadingContainer>
                    <ClipLoader
                      color="#f0b90b"
                      loading={loading}
                      css={override}
                      size={40}
                    />
                  </LoadingContainer>
                )}
              </WishListChartLayout>
            </WishListBodyModule>
          </WishListBodyContainer>
        </WishListBody>
        <WishListBottom>
          <Link to="/explore">
            <WishListBottomContent>
              Discover more assets
              <Right />
            </WishListBottomContent>
          </Link>
        </WishListBottom>
      </WishListContainer>
      <DisplayMobileWishList
        wishList={wishList}
        coinLastPrice={coinLastPrice}
        loading={loading}
      />
    </section>
  );
};

WishList.propTypes = {
  email: PropTypes.string.isRequired,
};

export default WishList;
