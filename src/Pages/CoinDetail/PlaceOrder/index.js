import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUsdtPrice,
  updateCoinPrice,
} from "../../../Redux/Actions/actionCreator";
import { firebaseReadCoinAsset } from "../../../Utils/firebase";
import { EmailContext } from "../../../context/Context";
import Entry from "./Entry";
import TradeButton from "./TradeButton";
import TradeInput from "./TradeInput";

const BuySellStyle = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  border-width: 2px 1px 1px;
  border-style: solid;
  border-color: #f0b90b #2f3336 #2f3336;
  border-image: initial;
  border-radius: 4px;
  box-shadow: rgb(17 51 83 / 2%) 0px 4px 12px 0px;
  padding-top: 0px;
  margin-bottom: 56px;
  color: #d9d9d9;
  @media only screen and (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const BuySellContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 1 0%;
  min-width: 0px;
`;

const CryptoContainer = styled.div`
  display: flex;
  flex: 1 1 0%;
  z-index: 0;
  transition: z-index 0ms ease-out 1000ms;
`;

const TrasitionerContainer = styled.div`
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

const ContentContainer = styled.div`
  display: flex;
  user-select: none;
  align-self: stretch;
  flex-direction: column;
  flex: 1 1 0%;
  justify-content: space-between;
  width: 100%;
  border-radius: 4px;
  max-width: 100%;
`;

const BuySellHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  min-height: 64px;
  padding-top: 2px;
  border-bottom: none;
  span {
    text-align: center;
    pointer-events: none;
    width: 100%;
    padding: 0px 24px;
    font-weight: 500;
    line-height: 1.5;
    font-size: 18px;
    display: inline-block;
    word-break: break-word;
  }
`;

const BuySellBody = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  flex: 1 0 0%;
  padding-top: 32px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 0px;
  @media only screen and (max-width: 768px) {
    padding-top: 0px;
  }
`;

const BuySellBodyItem = styled.div`
  display: flex;
  flex-direction: column;
  span {
    flex-grow: 0;
    flex-shrink: 0;
    height: 16px;
  }
  :first-child {
    margin-bottom: 24px;
  }
`;

const BuySellTradeColumn = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
`;

const BuySellTradeContainer = styled.div`
  position: relative;
  border-radius: 4px;
  border-radius: 4px;
  user-select: none;
  text-decoration: none;
  margin: 0;
  :first-child {
    border-bottom: 1px solid #d9d9d9;
  }
`;

const BuySellTradeTopContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

const BuySellTradeTopSubTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
  span {
    font-size: 14px;
    line-height: 16px;
    transition: color 0.15s ease-out, opacity 0.15s ease-out;
  }
`;

const BuySellTradeTopName = styled.div`
  width: calc(100% - 70px);
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  display: flex;
`;

const BuySellTradeTopNameContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  display: flex;
  overflow: hidden;
  img {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    text-align: left;
  }
`;

const BuySellFooter = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  min-height: 56px;
  padding-right: 24px;
  padding-left: 24px;
  justify-content: space-between;
  span {
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    transition: color 0.15s ease-out, opacity 0.15s ease-out;
    margin: 0;
    color: #95a1bb;
    :last-child {
      color: #d9d9d9;
    }
  }
`;

const PlaceOrder = () => {
  const coinsQty = useSelector((state) => state.coinDetailReducer.coinQty);
  const dispatch = useDispatch();
  const { symbol } = useParams();
  const coin = symbol.replace(/USDT/, "");
  const email = useContext(EmailContext);
  const [inputValue, setInputValue] = useState("0");
  const [inputTopContent, setInputTopContent] = useState("USDT");
  const [inputBottomContent, setInputBottomContent] = useState(coin);
  const [buyOrSell, setBuyOrSell] = useState("buy");
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    const readUserUsdtAndCoin = async () => {
      if (email) {
        const userCoinAsset = await firebaseReadCoinAsset(email, coin);
        const userUsdtAsset = await firebaseReadCoinAsset(email, "USDT");
        if (userCoinAsset.qty === 0) {
          dispatch(updateUsdtPrice(userUsdtAsset.qty));
          dispatch(updateCoinPrice(0));
        } else {
          dispatch(updateUsdtPrice(userUsdtAsset.qty));
          dispatch(updateCoinPrice(userCoinAsset.qty));
        }
      }
    };
    readUserUsdtAndCoin();
    setInputTopContent("USDT");
    setInputBottomContent(coin);
  }, [coin, dispatch, email, symbol]);

  return (
    <>
      <BuySellStyle>
        <BuySellContainer>
          <CryptoContainer>
            <TrasitionerContainer>
              <ModuleFade>
                <ContentContainer>
                  <BuySellHeader>
                    <span>Trade</span>
                  </BuySellHeader>
                  <BuySellBody>
                    <TradeInput
                      setQty={setQty}
                      setInputValue={setInputValue}
                      inputTopContent={inputTopContent}
                      setInputTopContent={setInputTopContent}
                      setInputBottomContent={setInputBottomContent}
                      setBuyOrSell={setBuyOrSell}
                      setTotal={setTotal}
                      coin={coin}
                      inputValue={inputValue}
                    />
                    <BuySellBodyItem>
                      <BuySellTradeColumn>
                        <BuySellTradeContainer>
                          <BuySellTradeTopContainer>
                            <BuySellTradeTopSubTitle>
                              <span>From</span>
                            </BuySellTradeTopSubTitle>
                            <BuySellTradeTopName>
                              <BuySellTradeTopNameContainer>
                                <BuySellTradeTopNameContainer>
                                  <span>{inputTopContent}</span>
                                </BuySellTradeTopNameContainer>
                              </BuySellTradeTopNameContainer>
                            </BuySellTradeTopName>
                          </BuySellTradeTopContainer>
                        </BuySellTradeContainer>
                        <BuySellTradeContainer>
                          <BuySellTradeTopContainer>
                            <BuySellTradeTopSubTitle>
                              <span>To</span>
                            </BuySellTradeTopSubTitle>
                            <BuySellTradeTopName>
                              <BuySellTradeTopNameContainer>
                                <BuySellTradeTopNameContainer>
                                  <span>{inputBottomContent}</span>
                                </BuySellTradeTopNameContainer>
                              </BuySellTradeTopNameContainer>
                            </BuySellTradeTopName>
                          </BuySellTradeTopContainer>
                        </BuySellTradeContainer>
                        <Entry
                          inputBottomContent={inputBottomContent}
                          setBuyOrSell={setBuyOrSell}
                          setInputValue={setInputValue}
                          setInputTopContent={setInputTopContent}
                          setInputBottomContent={setInputBottomContent}
                          coin={coin}
                        />
                      </BuySellTradeColumn>
                      <span />
                      <TradeButton
                        buyOrSell={buyOrSell}
                        qty={qty}
                        total={total}
                        setInputValue={setInputValue}
                        setInputTopContent={setInputTopContent}
                        setInputBottomContent={setInputBottomContent}
                        coin={coin}
                        inputValue={inputValue}
                        setTotal={setTotal}
                      />
                    </BuySellBodyItem>
                  </BuySellBody>
                  <BuySellFooter>
                    <span>{coin}</span>
                    <span>
                      {Number(coinsQty).toLocaleString()} {coin}
                    </span>
                  </BuySellFooter>
                </ContentContainer>
              </ModuleFade>
            </TrasitionerContainer>
          </CryptoContainer>
        </BuySellContainer>
      </BuySellStyle>
    </>
  );
};

export default PlaceOrder;
