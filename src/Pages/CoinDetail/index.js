import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import KLine from "./KLine";
import PlaceOrder from "./PlaceOrder";
import Chat from "./Chat";
import AddValue from "./AddValue";
import DealTable from "./DealTable";
import MobileButton from "./MobileButton";
import {
  readWishList,
  addWishList,
  removeWishList,
} from "../../Utils/firebase";
import { ReactComponent as DefaultStar } from "../../images/defaultStar.svg";
import { ReactComponent as ActiveStar } from "../../images/activeStar.svg";
import Context from "../../context/Context";

const LayoutWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  padding: 0px;
  background: #14151a;
  color: #d9d9d9;
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  width: 100%;
  max-width: 1280px;
`;

const TransitionerContainer = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: none 0s ease 0s;
`;

const ModuleFade = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 1;
`;

const OuterHeader = styled.div`
  width: 100%;
  margin: 40px 0px;
  border-bottom: 1px solid #2f3336;
  padding: 0px 24px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 1280px;
  margin: 0px auto;
`;

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  min-height: 63px;
`;

const CoinImgContainer = styled.div`
  height: 46px;
  img {
    width: 46px;
    height: 46px;
    border-radius: 100%;
  }
`;

const CoinTitleContainer = styled.div`
  flex-direction: column;
  margin-right: auto;
  margin-left: 24px;
`;

const CoinTitleInner = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  h1 {
    line-height: 42px;
    font-size: 32px;
    font-weight: 500;
  }
`;

const WishListBtn = styled.button`
  position: relative;
  width: auto;
  margin: 0px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 80ms ease-in-out 0s;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #2f3336;
  background-color: #14151a;
  color: #d9d9d9;
  :hover {
    color: #f0b90b;
    border: 1px solid #f0b90b;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    pointer-events: none;
    flex-wrap: nowrap;
    white-space: nowrap;
    font-weight: 500;
    svg {
      stroke-width: 1px;
      cursor: pointer;
      height: 24px;
      width: 24px;
      fill: #d9d9d9;
    }
    span {
      margin-left: 10px;
      white-space: nowrap;
      font-size: 16px;
    }
  }
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1 1 auto;
  padding: 0px 24px;
`;

const FlexBox = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

const FlexBoxContainer = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 32px;
  flex-direction: row;
`;

const ChartColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 370px);
  @media only screen and (max-width: 996px) {
    width: calc(100% - 300px);
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ChartContainer = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  border: 1px solid #2f3336;
  border-radius: 4px;
  box-shadow: rgb(17 51 83 / 2%) 0px 4px 12px 0px;
  margin-bottom: 24px;
  min-height: 310px;
  overflow: hidden;
`;

const TradeColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 370px;
  padding-left: 24px;
  padding-right: 24px;
  @media only screen and (max-width: 996px) {
    width: 320px;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Mobile = styled(MobileButton)`
  display: none;
  width: 100%;
  position: fixed;
  bottom: 0;
  overflow-y: initial;
  overflow-x: visible;
  background-color: #14151a;
  @media only screen and (max-width: 768px) {
    display: block;
    z-index: 1;
    height: 72px;
  }
`;

const CoinDetail = () => {
  const { symbol } = useParams();
  const [coinSymbol, setCoinSymbol] = useState();
  const [coinUsdtSymbol, setCoinUsdtSymbol] = useState();
  const [userWishList, setUserWishList] = useState([]);
  const history = useHistory();
  const context = useContext(Context);

  const getSymbol = () =>
    axios
      .get(
        `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/explore`
      )
      .then((res) => {
        const coinType = res.data.map((data) => data.symbol);
        setCoinSymbol(coinType);
        const coinUsdtType = [];
        res.data.forEach((data) => {
          if (data.symbol.indexOf("USDT", 2) !== -1) {
            coinUsdtType.push(data.symbol);
          }
        });
        setCoinUsdtSymbol(coinUsdtType);
      });

  useEffect(() => {
    getSymbol();
  }, []);

  useEffect(() => {
    if (coinSymbol) {
      if (coinSymbol.indexOf(symbol) === -1) {
        history.push("/404");
      }
    }
  }, [history, symbol, coinSymbol]);

  const handleWishList = () => {
    if (context.email) {
      if (userWishList.indexOf(symbol) === -1) {
        addWishList(context.email, symbol);
        const newStarList = [...userWishList];
        newStarList.push(symbol);
        setUserWishList(newStarList);
        context.showToast("successAddWishList");
      } else {
        removeWishList(context.email, symbol);
        const num = userWishList.indexOf(symbol);
        const newStarList = [...userWishList];
        newStarList.splice(num, 1);
        setUserWishList(newStarList);
        context.showToast("successRemoveWishList");
      }
    } else {
      context.showToast("dangerWishList");
    }
  };

  useEffect(() => {
    const getUserWishList = async () => {
      if (context.email) {
        const wishList = await readWishList(context.email);
        setUserWishList(wishList);
      }
    };
    getUserWishList();
  }, [context.email]);

  return (
    <>
      <LayoutWrapper>
        <LayoutContainer>
          <TransitionerContainer>
            <ModuleFade>
              <OuterHeader>
                <TransitionerContainer>
                  <ModuleFade>
                    <InnerContainer>
                      <HeaderStyled>
                        <CoinImgContainer />
                        <CoinTitleContainer>
                          <CoinTitleInner>
                            <h1>{symbol}</h1>
                          </CoinTitleInner>
                        </CoinTitleContainer>
                        <WishListBtn onClick={handleWishList}>
                          <span>
                            {userWishList.indexOf(symbol) === -1 ? (
                              <>
                                <DefaultStar />
                                <span>Add to WishList</span>
                              </>
                            ) : (
                              <>
                                <ActiveStar />
                                <span>WishList</span>
                              </>
                            )}
                          </span>
                        </WishListBtn>
                      </HeaderStyled>
                    </InnerContainer>
                  </ModuleFade>
                </TransitionerContainer>
              </OuterHeader>

              <OuterContainer>
                <InnerContainer>
                  <TransitionerContainer>
                    <ModuleFade>
                      <FlexBox>
                        <FlexBoxContainer>
                          <ChartColumn>
                            <ChartContainer>
                              <TransitionerContainer>
                                <ModuleFade>
                                  <KLine />
                                </ModuleFade>
                              </TransitionerContainer>
                            </ChartContainer>
                            <TransitionerContainer>
                              <DealTable />
                            </TransitionerContainer>
                          </ChartColumn>
                          <TradeColumn>
                            <PlaceOrder />
                            <AddValue />
                          </TradeColumn>
                        </FlexBoxContainer>
                      </FlexBox>
                    </ModuleFade>
                  </TransitionerContainer>
                </InnerContainer>
              </OuterContainer>
            </ModuleFade>
          </TransitionerContainer>
        </LayoutContainer>
      </LayoutWrapper>
      <Mobile />
      <Chat coinUsdtSymbol={coinUsdtSymbol} />
    </>
  );
};

export default CoinDetail;
