import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  color,
  space,
  typography,
  layout,
  flexbox,
  border,
} from "styled-system";
import firebaseAddOrder, {
  firebaseReadCoinAsset,
  firebaseWriteCoinAsset,
} from "../../Utils/firebase";
import {
  updateUsdtPrice,
  updateCoinPrice,
} from "../../Redux/Actions/actionCreator";
import Toast from "../../Component/Toast";
import checkIcon from "../../images/check.svg";
import errorIcon from "../../images/error.svg";

const Button = styled.div`
  box-sizing: border-box;
  padding: 28px 16px;
  justify-content: space-around;
  ${layout}
`;

const PlaceOrderBtn = styled.button`
  appearance: none;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  font-family: inherit;
  text-align: center;
  text-decoration: none;
  outline: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  word-break: keep-all;
  padding: 6px 12px;
  min-height: 24px;
  border: none;
  background-color: #02c076;
  width: 45%;
  height: 40px;
  border-radius: 4px;
  color: white;
  ${space}
`;
const AddValueBtn = styled.button`
  appearance: none;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-family: inherit;
  text-align: center;
  text-decoration: none;
  outline: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  word-break: keep-all;
  padding: 6px 12px;
  min-height: 24px;
  border: none;
  background-color: #f84960;
  width: 45%;
  height: 40px;
  border-radius: 4px;
  color: white;
  ${space}
`;
const PlaceOrderSection = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  z-index: 23;
  font-size: 14px;
  color: rgb(255, 255, 255);
  position: relative;
  user-select: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: rgb(30, 33, 38);
  transition: transform 0.3s ease-in-out 0s;
  transform: translate3d(0px, -100%, 0px);
  padding: 12px 16px 16px;
  ${layout}
`;
const PlaceOrderTitleSection = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  padding-bottom: 20px;
  align-items: center;
  justify-content: space-between;
`;
const PlaceOrderTitle = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  line-height: 18px;
  font-size: 14px;
  font-weight: 600;
`;
const PlaceOrderClose = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  line-height: 0;
`;
const PlaceOrderBody = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-size: 14px;
  line-height: 16px;
`;
const BuyOrSellBtn = styled.div`
  box-sizing: border-box;
  margin: 0px 0px 12px;
  min-width: 0px;
  display: flex;
  font-weight: 500;
  border-radius: 4px;
`;
const BuyBtn = styled.span`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  flex: 1 1 0%;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  text-transform: uppercase;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  ${color}
`;
const SellBtn = styled.span`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  flex: 1 1 0%;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  text-transform: uppercase;
  ${color}
`;
const PlaceOrderInputSection = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
`;
const PlaceOrderInputPart = styled.div`
  width: 100%;
  display: block;
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
`;
const LimitOrMarketPrice = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  font-size: 14px;
  line-height: 12px;
  border-bottom: 1px solid rgb(24, 26, 32);
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

const MarketBtn = styled.span`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: inline-block;
  padding-top: 8px;
  padding-bottom: 10px;
  font-weight: 500;
  color: white;
  border-bottom: 2px solid;
  cursor: pointer;
  ${border}
`;

const AllInput = styled.div`
  flex-direction: column;
`;

const InputGroup = styled.div`
  ${space}
  display: flex;
  height: 32px;
  border: 1px solid rgba(43, 47, 54, 0.8);
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
  :hover {
    border-color: rgb(240, 185, 11);
  }
`;

const InputText = styled.div`
  min-width: 48px;
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
  width: 80%;
  outline: none;
  border: none;
  :disabled {
    background: #fff;
  }
  ${color}
  ${space}
  ${typography}
`;
const PlaceOrderButton = styled.button`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: rgb(2, 192, 118);
  color: white;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
`;

const MobileButton = (props) => {
  const marketPrice = useSelector(
    (state) => state.coinDetailReducer.marketPrice
  );
  const dispatch = useDispatch();
  const [displayPlaceOrder, setDisplayPlaceOrder] = useState("none");
  const [displayBtn, setDisplayBtn] = useState("flex");
  const [displayAddValue, setDisplayAddValue] = useState("none");
  const [buyOrSell, setBuyOrSell] = useState("buy");
  const [buyColor, setBuyColor] = useState({
    color: "white",
    bg: "#02c077",
  });
  const [sellColor, setSellColor] = useState({
    color: "#848e9c",
    bg: "#2b3139",
  });
  const [orderBtnColor, setOrderBtnColor] = useState({
    color: "white",
    bg: "#02c077",
  });
  const [limitOrMarket, setLimitOrMarket] = useState("limit");
  const [marketColor, setMarketColor] = useState({
    color: "white",
    borderBottomColor: "#f0b90b",
  });
  const [coinPrice, setCoinPrice] = useState("");
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState("");

  const [addValue, setAddValue] = useState("");
  const [usdtData, setUsdtData] = useState({ profitLoss: "", qty: "" });
  const [userUsdt, setUserUsdt] = useState();
  const { symbol } = useParams();
  const coin = symbol.replace(/USDT/, "");
  const { email } = props;
  const [list, setList] = useState([]);
  let toastProperties = null;

  const handleClickClose = (e) => {
    e.preventDefault();
    setDisplayPlaceOrder("none");
    setDisplayAddValue("none");
    setDisplayBtn("flex");
  };

  const handleChangeInputValue = (e) => {
    if (e.target.id === "price") {
      const orderTotal = Number(marketPrice * qty).toFixed(6);
      setCoinPrice(e.target.value);
      setTotal(orderTotal);
    } else if (e.target.id === "qty") {
      const orderTotal = Number(marketPrice * e.target.value).toFixed(6);
      setCoinPrice(marketPrice);
      setQty(e.target.value);
      setTotal(orderTotal);
    }
  };

  const showToast = (type) => {
    const id = Math.floor(Math.random() * 101 + 1);
    switch (type) {
      case "successOrder":
        toastProperties = {
          id,
          title: "Success",
          description: "下單成功",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "successAdd":
        toastProperties = {
          id,
          title: "Success",
          description: "下單成功",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "dangerOrder":
        toastProperties = {
          id,
          title: "Danger",
          description: "下單前，請先登入",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "dangerAdd":
        toastProperties = {
          id,
          title: "Danger",
          description: "加值前，請先登入",
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

  const handleClickPlaceOrderBtn = (e) => {
    e.preventDefault();
    if (email) {
      setDisplayPlaceOrder("block");
      setDisplayBtn("none");
    } else {
      showToast("dangerOrder");
    }
  };
  const handleClickAddValueBtn = (e) => {
    e.preventDefault();
    if (email) {
      setDisplayAddValue("block");
      setDisplayBtn("none");
    } else {
      showToast("dangerAdd");
    }
  };

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
        borderBottomColor: "#f0b90b",
      });
    }
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
      showToast("successOrder");
      setCoinPrice("");
      setTotal("");
      setQty("");
    } else if (!total) {
      showToast("dangerTotal");
    } else if (userUsdt < total) {
      showToast("dangerUsdt");
    } else {
      showToast("dangerOrder");
    }
  };

  const handlAddValueInput = (e) => {
    setAddValue(e.target.value);
  };

  const getUserCoinAsset = async () => {
    if (email) {
      const usdtAsset = await firebaseReadCoinAsset(email, "USDT");
      if (usdtAsset) {
        setUsdtData(usdtAsset);
      }
    }
  };
  const handleClickAddValue = () => {
    const totalValue = Number(usdtData.qty) + Number(addValue);
    if (email && addValue > 0) {
      firebaseWriteCoinAsset(email, "USDT", totalValue);
      getUserCoinAsset();
      setAddValue("");
      showToast("successAdd");
    } else if (!addValue) {
      showToast("dangerTotal");
    } else {
      showToast("dangerAdd");
    }
  };

  useEffect(() => {
    getUserCoinAsset();
    readUserUsdt();
  }, [email]);

  return (
    <>
      <Button display={displayBtn}>
        <PlaceOrderBtn onClick={handleClickPlaceOrderBtn}>下單</PlaceOrderBtn>
        <AddValueBtn onClick={handleClickAddValueBtn}>加值</AddValueBtn>
      </Button>
      <PlaceOrderSection display={displayPlaceOrder}>
        <PlaceOrderTitleSection>
          <PlaceOrderTitle>下單</PlaceOrderTitle>
          <PlaceOrderClose onClick={handleClickClose}>X</PlaceOrderClose>
        </PlaceOrderTitleSection>
        <PlaceOrderBody>
          <BuyOrSellBtn onClick={handleClickBuy}>
            <BuyBtn bg={buyColor.bg} color={buyColor.color}>
              買入
            </BuyBtn>
            <SellBtn bg={sellColor.bg} color={sellColor.color}>
              賣出
            </SellBtn>
          </BuyOrSellBtn>
          <PlaceOrderInputSection>
            <PlaceOrderInputPart>
              <div>
                <LimitOrMarketPrice onClick={handleClickPrice}>
                  <MarketBtn
                    borderBottomColor={marketColor.borderBottomColor}
                    color={marketColor.color}
                  >
                    市價
                  </MarketBtn>
                </LimitOrMarketPrice>
                <AllInput>
                  <InputGroup mb={2}>
                    <InputText
                      ml={2}
                      fontSize={{ md: 14, lg: 16 }}
                      fontFamily="Roboto"
                    >
                      市價
                    </InputText>
                    <Input
                      id="price"
                      value={Number(marketPrice).toFixed(6)}
                      onChange={handleChangeInputValue}
                      mr={2}
                      textAlign="right"
                      px={1}
                      fontFamily="Roboto"
                      disabled
                    />
                    <InputUnit
                      mr={2}
                      fontSize={{ md: 14, lg: 16 }}
                      fontFamily="Roboto"
                    >
                      USDT
                    </InputUnit>
                  </InputGroup>
                  <InputGroup mb={2}>
                    <InputText
                      ml={2}
                      fontSize={{ md: 14, lg: 16 }}
                      fontFamily="Roboto"
                    >
                      數量
                    </InputText>
                    <Input
                      id="qty"
                      value={qty}
                      onChange={handleChangeInputValue}
                      mr={2}
                      textAlign="right"
                      px={1}
                      fontFamily="Roboto"
                    />
                    <InputUnit
                      mr={2}
                      fontSize={{ md: 14, lg: 16 }}
                      fontFamily="Roboto"
                    >
                      {symbol}
                    </InputUnit>
                  </InputGroup>
                  <InputGroup mb={2}>
                    <InputText
                      ml={2}
                      fontSize={{ md: 14, lg: 16 }}
                      fontFamily="Roboto"
                    >
                      成交額
                    </InputText>
                    <Input
                      id="orderTotal"
                      textAlign="right"
                      fontFamily="Roboto"
                      px={1}
                      mr={2}
                      value={total}
                      disabled
                    />
                    <InputUnit
                      mr={2}
                      fontSize={{ md: 14, lg: 16 }}
                      fontFamily="Roboto"
                    >
                      USDT
                    </InputUnit>
                  </InputGroup>
                </AllInput>
                <PlaceOrderButton
                  px={3}
                  py={12}
                  mb={2}
                  fontFamily="Roboto"
                  bg={orderBtnColor.bg}
                  color={orderBtnColor.color}
                  fontSize={16}
                  onClick={handleClickUploadOrder}
                >
                  Send
                </PlaceOrderButton>
              </div>
            </PlaceOrderInputPart>
          </PlaceOrderInputSection>
        </PlaceOrderBody>
      </PlaceOrderSection>
      <PlaceOrderSection display={displayAddValue}>
        <PlaceOrderTitleSection>
          <PlaceOrderTitle>加值</PlaceOrderTitle>
          <PlaceOrderClose onClick={handleClickClose}>X</PlaceOrderClose>
        </PlaceOrderTitleSection>
        <PlaceOrderBody>
          <PlaceOrderInputSection>
            <PlaceOrderInputPart>
              <div>
                <AllInput>
                  <InputGroup mb={2}>
                    <InputText
                      ml={2}
                      fontSize={{ md: 14, lg: 16 }}
                      fontFamily="Roboto"
                    >
                      金額
                    </InputText>
                    <Input
                      value={addValue}
                      onChange={handlAddValueInput}
                      textAlign="right"
                      fontFamily="Roboto"
                      px={1}
                      mr={2}
                    />
                    <InputUnit
                      mr={2}
                      fontSize={{ md: 14, lg: 16 }}
                      fontFamily="Roboto"
                    >
                      USDT
                    </InputUnit>
                  </InputGroup>
                  <InputGroup mb={2}>
                    <InputText
                      ml={2}
                      fontSize={{ md: 14, lg: 16 }}
                      fontFamily="Roboto"
                    >
                      可用
                    </InputText>
                    <Input
                      textAlign="right"
                      fontFamily="Roboto"
                      value={usdtData.qty === "" ? 0 : usdtData.qty}
                      px={1}
                      mr={2}
                      disabled
                    />
                    <InputUnit
                      mr={2}
                      fontSize={{ md: 14, lg: 16 }}
                      fontFamily="Roboto"
                    >
                      USDT
                    </InputUnit>
                  </InputGroup>
                </AllInput>
                <PlaceOrderButton
                  px={3}
                  py={12}
                  mb={2}
                  fontFamily="Roboto"
                  fontSize={16}
                  onClick={handleClickAddValue}
                >
                  加值
                </PlaceOrderButton>
              </div>
            </PlaceOrderInputPart>
          </PlaceOrderInputSection>
        </PlaceOrderBody>
      </PlaceOrderSection>
      <Toast toastList={list} autoDelete dismissTime={5000} />
    </>
  );
};

MobileButton.propTypes = {
  email: PropTypes.string.isRequired,
};

export default MobileButton;
