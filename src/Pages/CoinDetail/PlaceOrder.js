import React, { useState } from "react";
import styled from "styled-components";
import { color, space, typography, flexbox } from "styled-system";
import firebaseAddOrder from "../../Utils/firebase";

const RenderPlaceOrder = styled.div`
  display: inline-flex;
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
  display: inline-flex;
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
  ${color}
  ${space}
  ${typography}
`;

const Input = styled.input`
  outline: none;
  border: none;
  ${color}
  ${space}
  ${typography}
`;

const PlaceOrder = () => {
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
  const [coinPrice, setCoinPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);

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
    if (e.target.placeholder === "價格") {
      setCoinPrice(e.target.value);
    } else if (e.target.placeholder === "數量") {
      const totalInput = document.getElementById("orderTotal");
      const orderTotal = coinPrice * e.target.value;

      setQty(e.target.value);
      setTotal(orderTotal);

      totalInput.value = orderTotal;

      console.log(total);
    }
  };

  const handleClickUploadOrder = () => {
    const OrderData = {
      coinPrice,
      coinType: "ETH",
      qty,
      tradingType: limitOrMarket,
      type: buyOrSell,
    };
    firebaseAddOrder(OrderData);
  };

  const renderBtn = () => (
    <PlaceOrderBtn>
      <ButtonGroup onClick={handleClickBuy} mb={2}>
        <Button
          px={4}
          py={2}
          bg={buyColor.bg}
          color={buyColor.color}
          lineHeight={2}
          flexGrow={1}
          fontSize={16}
          mr={2}
          fontFamily="Roboto"
          fontWeight="100"
        >
          買入
        </Button>
        <Button
          px={4}
          py={2}
          bg={sellColor.bg}
          color={sellColor.color}
          lineHeight={2}
          flexGrow={1}
          fontSize={16}
          fontFamily="Roboto"
        >
          賣出
        </Button>
      </ButtonGroup>
      <ButtonGroup onClick={handleClickPrice} mb={2}>
        <Button
          id="limitPrice"
          px={4}
          py={2}
          bg={limitColor.bg}
          color={limitColor.color}
          lineHeight={2}
          flexGrow={1}
          fontSize={16}
          mr={2}
          fontFamily="Roboto"
        >
          限價
        </Button>
        <Button
          id="marketPrice"
          px={4}
          py={2}
          bg={marketColor.bg}
          color={marketColor.color}
          lineHeight={2}
          flexGrow={1}
          fontSize={16}
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
            <InputText ml={2} fontFamily="Roboto">
              價格
            </InputText>
            <Input
              onChange={handleChangeInputValue}
              textAlign="right"
              px={1}
              fontFamily="Roboto"
            />
            <InputText mr={2} fontFamily="Roboto">
              USDT
            </InputText>
          </InputGroup>
          <InputGroup mb={2}>
            <InputText ml={2} fontFamily="Roboto">
              數量
            </InputText>
            <Input
              onChange={handleChangeInputValue}
              textAlign="right"
              px={1}
              fontFamily="Roboto"
            />
            <InputText mr={2} fontFamily="Roboto">
              ETH
            </InputText>
          </InputGroup>
          <InputGroup mb={2}>
            <InputText ml={2} fontSize={16} fontFamily="Roboto">
              成交額
            </InputText>
            <Input
              id="orderTotal"
              onChange={handleChangeInputValue}
              textAlign="right"
              fontFamily="Roboto"
              px={1}
            />
            <InputText mr={2} fontFamily="Roboto">
              USDT
            </InputText>
          </InputGroup>
        </AllInput>
      );
    }
    return (
      <AllInput>
        <InputGroup mb={2}>
          <InputText ml={2} fontFamily="Roboto">
            市價
          </InputText>
          <Input
            onChange={handleChangeInputValue}
            textAlign="right"
            px={1}
            fontFamily="Roboto"
          />
          <InputText mr={2} fontFamily="Roboto">
            USDT
          </InputText>
        </InputGroup>
        <InputGroup mb={2}>
          <InputText ml={2} fontFamily="Roboto">
            數量
          </InputText>
          <Input
            onChange={handleChangeInputValue}
            textAlign="right"
            px={1}
            fontFamily="Roboto"
          />
          <InputText mr={2} fontFamily="Roboto">
            ETH
          </InputText>
        </InputGroup>
        <InputGroup mb={2}>
          <InputText ml={2} fontFamily="Roboto">
            成交額
          </InputText>
          <Input
            onChange={handleChangeInputValue}
            textAlign="right"
            px={1}
            fontFamily="Roboto"
          />
          <InputText mr={2} fontFamily="Roboto">
            USDT
          </InputText>
        </InputGroup>
      </AllInput>
    );
  };

  return (
    <RenderPlaceOrder ml={5}>
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
    </RenderPlaceOrder>
  );
};

export default PlaceOrder;
