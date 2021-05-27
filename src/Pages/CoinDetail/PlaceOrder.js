import React, { useState } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { color, space, typography, flexbox } from "styled-system";
import firebaseAddOrder from "../../Utils/firebase";
import Toast from "../../Component/Toast";
import checkIcon from "../../images/check.svg";
import errorIcon from "../../images/error.svg";

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
  const { symbol } = useParams();
  const coin = symbol.replace(/USDT/, "");

  const { email } = props;

  const [list, setList] = useState([]);
  let toastProperties = null;

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
  const [limitColor, setLimitColor] = useState({
    color: "white",
    bg: "#14151a",
  });
  const [marketColor, setMarketColor] = useState({
    color: "#848e9c",
    bg: "#14151a",
  });
  const [orderBtnColor, setOrderBtnColor] = useState({
    color: "white",
    bg: "#02c077",
  });

  const [isLimit, setIsLimit] = useState(true);
  const [coinPrice, setCoinPrice] = useState("");
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState("");

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
    if (e.target.innerHTML === "限價") {
      setLimitOrMarket("limit");
      setLimitColor({
        color: "white",
        bg: "#14151a",
      });
      setMarketColor({
        color: "#848e9c",
        bg: "#14151a",
      });
      setIsLimit(true);
    } else if (e.target.innerHTML === "市價") {
      setLimitOrMarket("market");
      setLimitColor({
        color: "#848e9c",
        bg: "#14151a",
      });
      setMarketColor({
        color: "white",
        bg: "#14151a",
      });
      setIsLimit(false);
    }
  };

  const handleChangeInputValue = (e) => {
    if (e.target.id === "price") {
      const orderTotal = Number(e.target.value * qty).toFixed(6);
      setCoinPrice(e.target.value);
      setTotal(orderTotal);
    } else if (e.target.id === "qty") {
      if (isLimit) {
        const orderTotal = Number(coinPrice * e.target.value).toFixed(6);
        setQty(e.target.value);
        setTotal(orderTotal);
      } else {
        const orderTotal = Number(marketPrice * e.target.value).toFixed(6);
        setQty(e.target.value);
        setTotal(orderTotal);
      }
    }
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
      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  };

  const handleClickUploadOrder = () => {
    if (email && total > 0) {
      const orderData = {
        coinPrice,
        coinType: coin,
        qty,
        tradingType: limitOrMarket,
        type: buyOrSell,
      };
      firebaseAddOrder(orderData, email);
      showToast("success");
      setCoinPrice("");
      setTotal("");
      setQty("");
    } else if (!total) {
      showToast("dangerTotal");
    } else {
      showToast("danger");
    }
  };

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
          id="limitPrice"
          px={{ md: 3, lg: 4 }}
          py={2}
          bg={limitColor.bg}
          color={limitColor.color}
          lineHeight={2}
          flexGrow={1}
          fontSize={{ md: 14, lg: 16 }}
          mr={2}
          fontFamily="Roboto"
        >
          限價
        </Button>
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

  const renderInput = () => {
    if (isLimit === true) {
      return (
        <AllInput>
          <InputGroup mb={2}>
            <InputText ml={2} fontSize={{ _: 14, lg: 16 }} fontFamily="Roboto">
              限價
            </InputText>
            <Input
              id="price"
              value={coinPrice}
              onChange={handleChangeInputValue}
              textAlign="right"
              px={1}
              fontFamily="Roboto"
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
              onChange={handleChangeInputValue}
              textAlign="right"
              fontFamily="Roboto"
              px={1}
              value={total}
              disabled
            />
            <InputUnit mr={2} fontSize={{ _: 14, lg: 16 }} fontFamily="Roboto">
              USDT
            </InputUnit>
          </InputGroup>
        </AllInput>
      );
    }
    return (
      <AllInput>
        <InputGroup mb={2}>
          <InputText ml={2} fontSize={{ _: 14, lg: 16 }} fontFamily="Roboto">
            市價
          </InputText>
          <Input
            id="price"
            value={Number(marketPrice).toFixed(6)}
            onChange={handleChangeInputValue}
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
            onChange={handleChangeInputValue}
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
  };

  return (
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
  );
};

PlaceOrder.propTypes = {
  email: PropTypes.string.isRequired,
};

export default PlaceOrder;
