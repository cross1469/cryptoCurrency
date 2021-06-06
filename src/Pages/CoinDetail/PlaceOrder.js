import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import AutosizeInput from "react-input-autosize";
import {
  updateUsdtPrice,
  updateCoinPrice,
} from "../../Redux/Actions/actionCreator";
import firebaseAddOrder, {
  firebaseWriteCoinAsset,
  firebaseReadCoinAsset,
} from "../../Utils/firebase";
import Toast from "../../Component/Toast";
import checkIcon from "../../images/check.svg";
import errorIcon from "../../images/error.svg";
import { ReactComponent as Switch } from "../../images/sort.svg";

const BuySellStyle = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  border-width: 2px 1px 1px;
  border-style: solid;
  border-color: #f0b90b rgb(236, 239, 241) rgb(236, 239, 241);
  border-image: initial;
  border-radius: 4px;
  box-shadow: rgb(17 51 83 / 2%) 0px 4px 12px 0px;
  padding-top: 0px;
  margin-bottom: 56px;
  @media only screen and (max-width: 768px) {
    margin-bottom: 0;
    margin-top: 36px;
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
  margin-bottom: 42px;
  span {
    flex-grow: 0;
    flex-shrink: 0;
    height: 16px;
  }
`;

const BuySellBodyInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 60px;
  flex-direction: row;
  overflow: hidden;
  height: 60px;
`;

const BuySellBodyInputContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  transform: scale(1);
  flex: 1 1 0%;
  max-width: 250px;
`;

const BuySellInputText = styled.div`
  display: flex;
  align-items: baseline;
  text-align: left;
  color: #f0b90b;
  font-weight: 400;
  animation: 0.5s ease 0s 1 normal none running hBgzBc;
  span {
    font-weight: 500;
    color: rgba(#f0b90b, 0.3);
    line-height: 1.5;
    align-self: flex-start;
    margin-top: 8px;
    font-size: ${(props) => {
      if (props.children[1].props.value.length < 3) {
        return "32px";
      }
      if (props.children[1].props.value.length < 7) {
        return "26px";
      }
      return "20px";
    }};
  }
  input {
    text-align: left;
    font-weight: 400;
    background-color: #121212;
    width: 40px;
    padding: 0px;
    margin: 0px;
    box-shadow: none;
    border: none;
    overflow: hidden;
    outline: none;
    font-size: ${(props) => {
      if (props.children[1].props.value.length < 3) {
        return "54px";
      }
      if (props.children[1].props.value.length < 7) {
        return "45px";
      }
      return "40px";
    }};
    color: ${(props) => {
      if (props.children[1].props.value === "0") {
        return "#757575";
      }
      return "#f0b90b";
    }};
  }
`;

const BuySellTradeColumn = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  border-radius: 4px;
  border: 1px solid #fff;
`;

const BuySellTradeContainer = styled.div`
  position: relative;
  border-radius: 4px;
  border-radius: 4px;
  user-select: none;
  text-decoration: none;
  margin: 0;
  :first-child {
    border-bottom: 1px solid;
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
  width: calc(100% - 80px);
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

const EntrySelector = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 100%;
  background-color: #121212;
`;

const EntrySelectorContainer = styled.div`
  position: relative;
  display: flex;
  padding: 4px;
`;

const EntrySelectorSize = styled.div`
  width: 13px;
  height: 13px;
  svg {
    fill: #fff;
  }
`;

const BuySellBodyButton = styled.button`
  position: relative;
  width: 100%;
  margin: 0px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 80ms ease-in-out 0s;
  padding: 24px;
  font-size: 16px;
  background-color: #f0b90b;
  :hover {
    background-color: #ffe251;
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
  }
`;

const PlaceOrder = (props) => {
  const marketPrice = useSelector(
    (state) => state.coinDetailReducer.marketPrice
  );
  const dispatch = useDispatch();
  const { symbol } = useParams();
  const coin = symbol.replace(/USDT/, "");

  const { email } = props;
  const [inputValue, setInputValue] = useState("0");
  const [inputTopContent, setInputTopContent] = useState("USDT");
  const [inputBottomContent, setInputBottomContent] = useState(coin);
  const [list, setList] = useState([]);
  let toastProperties = null;
  const [buyOrSell, setBuyOrSell] = useState("buy");
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState("");
  const [userUsdt, setUserUsdt] = useState();
  const [userCoin, setUserCoin] = useState();

  const handleChangeInputNewValue = (e) => {
    const re = /^[-.,0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      const num = e.target.value.replace(/,/g, "");
      setInputValue(num);
      if (inputTopContent.indexOf("USDT") === -1) {
        setInputTopContent(`${e.target.value} ${coin}`);
        setInputBottomContent(
          `${Number(Number(num) * Number(marketPrice)).toLocaleString()} USDT`
        );
        setBuyOrSell("sell");
        setQty(num);
      } else {
        setInputTopContent(`${Number(num).toLocaleString()} USDT`);
        setInputBottomContent(
          `${Number(
            Number(num) / Number(marketPrice)
          ).toLocaleString()} ${coin}`
        );
        setBuyOrSell("buy");
        setQty(Number(Number(num) / Number(marketPrice)).toLocaleString());
        setTotal(num);
      }
    }
  };

  const handleClickChangeCoin = () => {
    setInputTopContent(inputBottomContent);
    setInputBottomContent(inputTopContent);
    if (inputBottomContent.indexOf("USDT") === -1) {
      const firstContent = inputBottomContent.replace(` ${coin}`, "");
      const sencondContent = firstContent.replace(/,/g, "");
      setInputValue(sencondContent);
    } else {
      const firstContent = inputBottomContent.replace(` USDT`, "");
      const sencondContent = firstContent.replace(/,/g, "");
      setInputValue(sencondContent);
    }
  };

  const showToast = (type) => {
    const id = Math.floor(Math.random() * 101 + 1);
    switch (type) {
      case "success":
        toastProperties = {
          id,
          title: "Success",
          description: "Order successful",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "danger":
        toastProperties = {
          id,
          title: "Please signin",
          description: "Before placing your order, please signin",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "dangerTotal":
        toastProperties = {
          id,
          title: "Danger",
          description: "The amount cannot be 0",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "dangerUsdt":
        toastProperties = {
          id,
          title: "Ｐlease deposit",
          description:
            "USDT available amount is not enough, please deposit first",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "dangerCoin":
        toastProperties = {
          id,
          title: "Please reduce the sell quantity",
          description: `The ${coin} quantity is not enough, please reduce the sell quantity`,
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  };

  const calcAssetForUploadOrder = async (
    userEmail,
    coinType,
    coinPriceForUSDT,
    coinQty
  ) => {
    const coinAsset = await firebaseReadCoinAsset(userEmail, coinType);
    const usdtAsset = await firebaseReadCoinAsset(userEmail, "USDT");

    if (buyOrSell === "buy") {
      const allcoinQty = Number(coinAsset.qty) + Number(coinQty);
      const allUsdtQty =
        Number(usdtAsset.qty) - Number(coinPriceForUSDT * coinQty);
      const averageCoinPrice =
        (Number(coinAsset.averagePrice) * Number(coinAsset.qty) +
          Number(coinPriceForUSDT) * Number(coinQty)) /
        allcoinQty;
      firebaseWriteCoinAsset(
        email,
        coin,
        allcoinQty,
        averageCoinPrice,
        coinAsset.profitLoss
      );
      firebaseWriteCoinAsset(email, "USDT", allUsdtQty, 0, 0);
      dispatch(updateUsdtPrice(allUsdtQty));
      dispatch(updateCoinPrice(allcoinQty));
    } else if (buyOrSell === "sell") {
      const allcoinQty = Number(coinAsset.qty) - Number(coinQty);
      const allUsdtQty =
        Number(usdtAsset.qty) + Number(coinPriceForUSDT * coinQty);
      const averageCoinPrice =
        (Number(coinAsset.averagePrice) * Number(coinAsset.qty) -
          Number(coinPriceForUSDT) * Number(coinQty)) /
        allcoinQty;
      firebaseWriteCoinAsset(
        email,
        coin,
        allcoinQty,
        averageCoinPrice,
        coinAsset.profitLoss
      );
      firebaseWriteCoinAsset(email, "USDT", allUsdtQty, 0, 0);
      dispatch(updateUsdtPrice(allUsdtQty));
      dispatch(updateCoinPrice(allcoinQty));
    }
  };

  const readUserUsdtAndCoin = async () => {
    if (email) {
      const userCoinAsset = await firebaseReadCoinAsset(email, coin);
      const userUsdtAsset = await firebaseReadCoinAsset(email, "USDT");

      if (userCoinAsset === null) {
        setUserUsdt(userUsdtAsset.qty);
        setUserCoin(0);
        dispatch(updateUsdtPrice(userUsdtAsset.qty));
        dispatch(updateCoinPrice(0));
      } else {
        setUserUsdt(userUsdtAsset.qty);
        setUserCoin(userCoinAsset.qty);
        dispatch(updateUsdtPrice(userUsdtAsset.qty));
        dispatch(updateCoinPrice(userCoinAsset.qty));
      }
    }
  };

  const handleClickUploadOrder = () => {
    if ((email && total > 0 && userUsdt > total) || userCoin > total) {
      const orderData = {
        coinPrice: marketPrice,
        coinType: coin,
        qty,
        tradingType: "market",
        type: buyOrSell,
      };
      firebaseAddOrder(orderData, email);
      calcAssetForUploadOrder(email, coin, marketPrice, qty);
      if (buyOrSell === "buy") {
        setInputTopContent("USDT");
        setInputBottomContent(coin);
      } else {
        setInputTopContent(coin);
        setInputBottomContent("USDT");
      }
      showToast("success");
    } else if (!total) {
      showToast("dangerTotal");
    } else if (userUsdt < total) {
      showToast("dangerUsdt");
    } else if (userCoin < total) {
      showToast("dangerCoin");
    } else {
      showToast("danger");
    }
  };

  useEffect(() => {
    readUserUsdtAndCoin();
  }, [email]);

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
                    <BuySellBodyItem>
                      <BuySellBodyInput>
                        <BuySellBodyInputContainer>
                          <BuySellInputText>
                            <span>$</span>
                            <AutosizeInput
                              inputMode="decimal"
                              maxLength="7"
                              placeholder="0"
                              value={Number(inputValue).toLocaleString()}
                              onChange={handleChangeInputNewValue}
                            />
                          </BuySellInputText>
                        </BuySellBodyInputContainer>
                      </BuySellBodyInput>
                    </BuySellBodyItem>
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
                        <EntrySelector>
                          <EntrySelectorContainer
                            onClick={handleClickChangeCoin}
                          >
                            <EntrySelectorSize>
                              <Switch />
                            </EntrySelectorSize>
                          </EntrySelectorContainer>
                        </EntrySelector>
                      </BuySellTradeColumn>
                      <span />
                      <BuySellBodyButton onClick={handleClickUploadOrder}>
                        <span>Trade</span>
                      </BuySellBodyButton>
                    </BuySellBodyItem>
                  </BuySellBody>
                </ContentContainer>
              </ModuleFade>
            </TrasitionerContainer>
          </CryptoContainer>
        </BuySellContainer>
      </BuySellStyle>

      <Toast toastList={list} autoDelete dismissTime={5000} />
    </>
  );
};

PlaceOrder.propTypes = {
  email: PropTypes.string,
};

PlaceOrder.defaultProps = {
  email: undefined,
};

export default PlaceOrder;
