import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { readWishList } from "../../Utils/firebase";
import { ReactComponent as Right } from "../../images/next.svg";
import MobileWishList from "./MobileWishList";

const WishListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #181a20;
  margin-bottom: 22px;
  border-radius: 4px;
  border: 1px solid rgb(236, 239, 241);
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const WishListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  color: #fff;
  height: 54px;
  padding: 0px 24px;
  border-bottom: 1px solid rgb(236, 239, 241);
  div {
    display: flex;
    flex-direction: row;
    h2 {
      font-size: 18px;
      font-weight: 500;
      line-height: 23px;
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
  h4 {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }
`;

const miniChart = styled.div`
  width: 100%;
  height: 85px;
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
  const [realTimeDatas, setRealTimeDatas] = useState([]);
  const { email } = props;

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

  useEffect(() => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/!ticker@arr`
    );
    socket.onmessage = (event) => {
      const coinDatas = JSON.parse(event.data);
      const usdtDatas = [];
      coinDatas.forEach((data) => {
        if (data.s.indexOf("USDT") !== -1) {
          usdtDatas.push(data);
        }
      });
      setRealTimeDatas([...realTimeDatas, ...usdtDatas]);
    };
    return () => socket.close();
  }, []);

  const renderWishList = () =>
    wishList.map((wishData) =>
      realTimeDatas.map((item) => {
        if (wishData === item.s) {
          return (
            <WishListItem>
              <WishListItemContainer>
                <WishListItemModule>
                  <WishListItemStyle>
                    <Link
                      to={`/coinDetail/${wishData}`}
                      key={item.s}
                      onMouseEnter={handleBlockButton}
                      onMouseLeave={handleNoneButton}
                    >
                      <WishListMiniItem>
                        <WishListMiniItemTop>
                          <label htmlFor="wishDataName">{wishData}</label>
                          <div>24h</div>
                        </WishListMiniItemTop>
                        <WishListItemPrice>
                          <span>{Number(item.c).toFixed(5)}</span>
                        </WishListItemPrice>
                        <WishListItemPricePercentage>
                          <h4>{Number(item.P).toFixed(2)}%</h4>
                        </WishListItemPricePercentage>
                        <miniChart />
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
      <WishListContainer>
        <WishListHeader>
          <div>
            <h2>WishList</h2>
          </div>
        </WishListHeader>
        <WishListBody>
          <WishListBodyContainer>
            <WishListBodyModule>
              <WishListChartLayout>{renderWishList()}</WishListChartLayout>
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
        realTimeDatas={realTimeDatas}
      />
    </section>
  );
};

WishList.propTypes = {
  email: PropTypes.string.isRequired,
};

export default WishList;
