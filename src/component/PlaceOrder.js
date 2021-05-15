import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonGroup,
  InputGroup,
  Input,
  InputGroupButton,
} from "@bootstrap-styled/v4/";
import firebaseAddOrder from "../Utils/firebase";

const PlaceOrderBtn = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaceOrder = () => {
  const [buyOrSell, setBuyOrSell] = useState("buy");
  const [limitOrMarket, setLimitOrMarket] = useState("limit");
  const [buyColor, setBuyColor] = useState({
    "$btn-primary-border": "#198754",
    "$btn-primary-bg": "#198754",
  });
  const [sellColor, setSellColor] = useState({
    "$btn-primary-border": "black",
    "$btn-primary-bg": "black",
  });
  const [limitColor, setLimitColor] = useState({
    "$btn-primary-border": "#6c757d",
    "$btn-primary-bg": "#6c757d",
  });
  const [marketColor, setMarketColor] = useState({
    "$btn-primary-border": "black",
    "$btn-primary-bg": "black",
  });
  const [isLimit, setIsLimit] = useState(true);

  const [coinPrice, setCoinPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);

  const handleClickBuy = (e) => {
    if (e.target.innerHTML === "買入") {
      setBuyOrSell("buy");
      setBuyColor({
        "$btn-primary-border": "#198754",
        "$btn-primary-bg": "#198754",
      });
      setSellColor({
        "$btn-primary-border": "black",
        "$btn-primary-bg": "black",
      });
    } else if (e.target.innerHTML === "賣出") {
      setBuyOrSell("sell");
      setBuyColor({
        "$btn-primary-border": "black",
        "$btn-primary-bg": "black",
      });
      setSellColor({
        "$btn-primary-border": "#dc3545",
        "$btn-primary-bg": "#dc3545",
      });
    }
  };

  const handleClickPrice = (e) => {
    if (e.target.innerHTML === "限價") {
      setLimitOrMarket("limit");
      setLimitColor({
        "$btn-primary-border": "#6c757d",
        "$btn-primary-bg": "#6c757d",
      });
      setMarketColor({
        "$btn-primary-border": "black",
        "$btn-primary-bg": "black",
      });
      setIsLimit(true);
    } else if (e.target.innerHTML === "市價") {
      setLimitOrMarket("market");
      setLimitColor({
        "$btn-primary-border": "black",
        "$btn-primary-bg": "black",
      });
      setMarketColor({
        "$btn-primary-border": "#6c757d",
        "$btn-primary-bg": "#6c757d",
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
      <ButtonGroup onClick={handleClickBuy}>
        <Button size="lg" theme={buyColor}>
          買入
        </Button>
        <Button size="lg" theme={sellColor}>
          賣出
        </Button>
      </ButtonGroup>
      <ButtonGroup onClick={handleClickPrice}>
        <Button size="lg" id="limitPrice" theme={limitColor}>
          限價
        </Button>
        <Button size="lg" id="marketPrice" theme={marketColor}>
          市價
        </Button>
      </ButtonGroup>
    </PlaceOrderBtn>
  );

  const renderInput = () => {
    if (isLimit === true) {
      return (
        <InputGroup>
          <Input placeholder="價格" onChange={handleChangeInputValue} />
          <Input placeholder="數量" onChange={handleChangeInputValue} />
          <Input
            placeholder="成交額"
            id="orderTotal"
            onChange={handleChangeInputValue}
          />
          <InputGroupButton onClick={handleClickUploadOrder}>
            Send
          </InputGroupButton>
        </InputGroup>
      );
    }
    return (
      <InputGroup>
        <Input placeholder="市價" size="lg" onChange={handleChangeInputValue} />
        <Input placeholder="數量" size="lg" onChange={handleChangeInputValue} />
        <Input
          placeholder="成交額"
          size="lg"
          onChange={handleChangeInputValue}
        />
        <InputGroupButton>Send</InputGroupButton>
      </InputGroup>
    );
  };

  return (
    <div>
      {renderBtn()}
      {renderInput()}
    </div>
  );
};

export default PlaceOrder;
