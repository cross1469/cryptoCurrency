import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Spline from "./Spline";

const WishListItem = styled.div`
  flex: 1 1 auto;
  position: relative;
  width: 25%;
  max-width: 25%;
  border-right: 1px solid #2f3336;
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
    color: #d9d9d9;
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
  color: #14151a;
  cursor: pointer;
  transition: all 80ms ease-in-out 0s;
  padding: 12px 16px;
  font-size: 14px;
  border: none;
  background-color: #f0b90b;
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
  img {
    height: 24px;
    width: 24px;
  }
  label {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    transition: #d9d9d9 80ms ease-in-out 0s;
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
    if (props.children.props.children[0] > 0) {
      return "#0ecb81";
    }
    if (props.children.props.children[0] === 0) {
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

const WishListItems = (props) => {
  const { wishList, coinLastPrice } = props;

  const handleBlockButton = (e) => {
    e.target.style.opacity = 1;
  };

  const handleNoneButton = (e) => {
    e.target.style.opacity = 0;
  };

  const renderWishList = () =>
    wishList.map((wishData) =>
      coinLastPrice.map((coin) => {
        const symbol = wishData.replace(/USDT/, "");
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
                          <img
                            src={`/icon/${symbol.toLowerCase()}.svg`}
                            alt="coinIcon"
                          />
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
  return renderWishList();
};

export default WishListItems;
