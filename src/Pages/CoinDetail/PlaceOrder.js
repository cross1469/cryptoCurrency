import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import AutosizeInput from "react-input-autosize";
import { color, space, typography, flexbox } from "styled-system";
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
    font-size: 31px;
    line-height: 1.5;
    align-self: flex-start;
    margin-top: 8px;
  }
  input {
    font-size: 62px;
    text-align: left;
    color: #f0b90b;
    font-weight: 400;
    background-color: #121212;
    width: 40px;
    padding: 0px;
    margin: 0px;
    box-shadow: none;
    border: none;
    overflow: hidden;
    outline: none;
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
  background-image: linear-gradient(
    rgb(248, 209, 47) 0%,
    rgb(240, 185, 11) 100%
  );

  :hover {
    background-image: linear-gradient(
      rgb(255, 226, 81) 0%,
      rgb(237, 196, 35) 100%
    );
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

const PlaceOrderTitle = styled.div`
  ${color}
  ${space}
  ${typography}
`;

const RenderPlaceOrder = styled.div`
  display: flex;
  flex-direction: column;
  ${space}
`;

const PlaceOrderBtn = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  ${space}
  ${flexbox}
`;

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
`;

const AllInput = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  ${space}
  display: flex;
  height: 32px;
  border: 1px solid rgba(43, 47, 54, 0.8);
  border-radius: 4px;
  align-items: center;
  :hover {
    border-color: rgb(240, 185, 11);
  }
`;

const InputText = styled.div`
  min-width: 48px;
  flex-grow: 1;
  ${color}
  ${space}
  ${typography}
`;

const InputUnit = styled.div`
  min-width: 40px;
  ${color}
  ${space}
  ${typography}
`;

const Input = styled.input`
  max-width: 40%;
  outline: none;
  border: none;
  ${color}
  ${space}
  ${typography}
`;

const PlaceOrder = (props) => {
  const marketPrice = useSelector(
    (state) => state.coinDetailReducer.marketPrice
  );
  const dispatch = useDispatch();
  const { symbol } = useParams();
  const coin = symbol.replace(/USDT/, "");

  const { email } = props;

  const [list, setList] = useState([]);
  let toastProperties = null;
  const [buyOrSellPrice, setBuyOrSellValue] = useState("");
  const [buyOrSell, setBuyOrSell] = useState("buy");
  const [limitOrMarket, setLimitOrMarket] = useState("limit");
  const [buyColor, setBuyColor] = useState({
    color: "white",
    bg: "#02c077",
  });
  const [sellColor, setSellColor] = useState({
    color: "#848e9c",
    bg: "#2b3139",
  });
  const [marketColor, setMarketColor] = useState({
    color: "white",
    bg: "#14151a",
  });
  const [orderBtnColor, setOrderBtnColor] = useState({
    color: "white",
    bg: "#02c077",
  });

  const [coinPrice, setCoinPrice] = useState("");
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState("");
  const [userUsdt, setUserUsdt] = useState();

  const handleClickBuy = (e) => {
    if (e.target.innerHTML === "買入") {
      setBuyOrSell("buy");
      setBuyColor({
        color: "white",
        bg: "#02c077",
      });
      setSellColor({
        color: "#848e9c",
        bg: "#2b3139",
      });
      setOrderBtnColor({
        color: "white",
        bg: "#02c077",
      });
    } else if (e.target.innerHTML === "賣出") {
      setBuyOrSell("sell");
      setBuyColor({
        color: "#848e9c",
        bg: "#2b3139",
      });
      setSellColor({
        color: "white",
        bg: "#f84960",
      });
      setOrderBtnColor({
        color: "white",
        bg: "#f84960",
      });
    }
  };

  const handleClickPrice = (e) => {
    if (e.target.innerHTML === "市價") {
      setLimitOrMarket("market");
      setMarketColor({
        color: "white",
        bg: "#14151a",
      });
    }
  };

  const handleChangeInputNewValue = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setBuyOrSellValue(e.target.value);
    }
  };

  const handleChangeInputValue = (e) => {
    const orderTotal = Number(marketPrice * e.target.value).toFixed(6);
    setCoinPrice(marketPrice);
    setQty(e.target.value);
    setTotal(orderTotal);
  };

  const showToast = (type) => {
    const id = Math.floor(Math.random() * 101 + 1);
    switch (type) {
      case "success":
        toastProperties = {
          id,
          title: "Success",
          description: "下單成功",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "danger":
        toastProperties = {
          id,
          title: "Danger",
          description: "下單前，請先登入",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "dangerTotal":
        toastProperties = {
          id,
          title: "Danger",
          description: "金額不得為 0",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "dangerUsdt":
        toastProperties = {
          id,
          title: "Danger",
          description: "USDT 可用金額不足，請先充值",
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
      firebaseWriteCoinAsset(email, "USDT", allUsdtQty);
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
      firebaseWriteCoinAsset(email, "USDT", allUsdtQty);
      dispatch(updateUsdtPrice(allUsdtQty));
      dispatch(updateCoinPrice(allcoinQty));
    }
  };

  const readUserUsdt = async () => {
    if (email) {
      const userCoinAsset = await firebaseReadCoinAsset(email, coin);
      const userUsdtAsset = await firebaseReadCoinAsset(email, "USDT");
      setUserUsdt(userUsdtAsset.qty);
      if (userCoinAsset === null) {
        dispatch(updateUsdtPrice(userUsdtAsset.qty));
        dispatch(updateCoinPrice(0));
      } else {
        dispatch(updateUsdtPrice(userUsdtAsset.qty));
        dispatch(updateCoinPrice(userCoinAsset.qty));
      }
    }
  };

  const handleClickUploadOrder = () => {
    if (email && total > 0 && userUsdt > total) {
      const orderData = {
        coinPrice,
        coinType: coin,
        qty,
        tradingType: limitOrMarket,
        type: buyOrSell,
      };
      firebaseAddOrder(orderData, email);
      calcAssetForUploadOrder(email, coin, coinPrice, qty);
      showToast("success");
      setCoinPrice("");
      setTotal("");
      setQty("");
    } else if (!total) {
      showToast("dangerTotal");
    } else if (userUsdt < total) {
      showToast("dangerUsdt");
    } else {
      showToast("danger");
    }
  };

  useEffect(() => {
    readUserUsdt();
  }, [email]);

  const renderBtn = () => (
    <PlaceOrderBtn>
      <ButtonGroup onClick={handleClickBuy} mb={2}>
        <Button
          px={{ md: 3, lg: 4 }}
          py={2}
          bg={buyColor.bg}
          color={buyColor.color}
          lineHeight={2}
          flexGrow={1}
          fontSize={{ md: 14, lg: 16 }}
          mr={2}
          fontFamily="Roboto"
          fontWeight="100"
        >
          買入
        </Button>
        <Button
          px={{ md: 3, lg: 4 }}
          py={2}
          bg={sellColor.bg}
          color={sellColor.color}
          lineHeight={2}
          flexGrow={1}
          fontSize={{ md: 14, lg: 16 }}
          fontFamily="Roboto"
        >
          賣出
        </Button>
      </ButtonGroup>
      <ButtonGroup onClick={handleClickPrice} mb={2}>
        <Button
          id="marketPrice"
          px={{ md: 3, lg: 4 }}
          py={2}
          bg={marketColor.bg}
          color={marketColor.color}
          lineHeight={2}
          flexGrow={1}
          fontSize={{ md: 14, lg: 16 }}
          fontFamily="Roboto"
        >
          市價
        </Button>
      </ButtonGroup>
    </PlaceOrderBtn>
  );

  const renderInput = () => (
    <AllInput>
      <InputGroup mb={2}>
        <InputText ml={2} fontSize={{ _: 14, lg: 16 }} fontFamily="Roboto">
          市價
        </InputText>
        <Input
          id="price"
          value={Number(marketPrice).toFixed(6)}
          textAlign="right"
          px={1}
          fontFamily="Roboto"
          disabled
        />
        <InputUnit mr={2} fontSize={{ _: 14, lg: 16 }} fontFamily="Roboto">
          USDT
        </InputUnit>
      </InputGroup>
      <InputGroup mb={2}>
        <InputText ml={2} fontSize={{ _: 14, lg: 16 }} fontFamily="Roboto">
          數量
        </InputText>
        <Input
          id="qty"
          value={qty}
          onChange={handleChangeInputValue}
          textAlign="right"
          px={1}
          fontFamily="Roboto"
        />
        <InputUnit mr={2} fontSize={{ _: 14, lg: 16 }} fontFamily="Roboto">
          {coin}
        </InputUnit>
      </InputGroup>
      <InputGroup mb={2}>
        <InputText ml={2} fontSize={{ _: 14, lg: 16 }} fontFamily="Roboto">
          成交額
        </InputText>
        <Input
          id="orderTotal"
          textAlign="right"
          px={1}
          fontFamily="Roboto"
          value={total}
          disabled
        />
        <InputUnit mr={2} fontSize={{ _: 14, lg: 16 }} fontFamily="Roboto">
          USDT
        </InputUnit>
      </InputGroup>
    </AllInput>
  );

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
                              inputStyle={{
                                fontSize: 54,
                              }}
                              adjustsFontSizeToFit
                              placeholder="0"
                              value={buyOrSellPrice}
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
                                  <span>{coin}</span>
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
                                  <span>USDT</span>
                                </BuySellTradeTopNameContainer>
                              </BuySellTradeTopNameContainer>
                            </BuySellTradeTopName>
                          </BuySellTradeTopContainer>
                        </BuySellTradeContainer>
                        <EntrySelector>
                          <EntrySelectorContainer>
                            <EntrySelectorSize>
                              <Switch />
                            </EntrySelectorSize>
                          </EntrySelectorContainer>
                        </EntrySelector>
                      </BuySellTradeColumn>
                      <span />
                      <BuySellBodyButton>
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
      <RenderPlaceOrder className="placeOrder" ml={5}>
        <PlaceOrderTitle
          fontFamily="Roboto"
          fontSize={28}
          fontWeight="bold"
          mb={2}
        >
          下單
        </PlaceOrderTitle>
        {renderBtn()}
        {renderInput()}
        <Button
          onClick={handleClickUploadOrder}
          px={3}
          py={12}
          mb={2}
          bg={orderBtnColor.bg}
          color={orderBtnColor.color}
          fontFamily="Roboto"
          fontSize={16}
        >
          Send
        </Button>
        <Toast toastList={list} autoDelete dismissTime={5000} />
      </RenderPlaceOrder>
    </>
  );
};

PlaceOrder.propTypes = {
  email: PropTypes.string.isRequired,
};

export default PlaceOrder;
