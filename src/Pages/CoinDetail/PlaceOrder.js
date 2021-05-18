import React, { useState } from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import firebaseAddOrder from "../../Utils/firebase";

const PlaceOrderBtn = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  ${space}
`;

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  ${color}
  ${space}
  ${typography}
`;

const AllInput = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
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
  console.log(buyColor, sellColor, limitColor, marketColor);
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
      <ButtonGroup onClick={handleClickBuy} mb={2}>
        <Button px={4} py={2} bg="#02c077" color="white" lineHeight={2}>
          買入
        </Button>
        <Button px={4} py={2} bg="#2b3139" color="#848e9c" lineHeight={2}>
          賣出
        </Button>
      </ButtonGroup>
      <ButtonGroup onClick={handleClickPrice} mb={2}>
        <Button id="limitPrice" px={4} py={2} bg="#14151a" color="white">
          限價
        </Button>
        <Button id="marketPrice" px={4} py={2} bg="#14151a" color="#848e9c">
          市價
        </Button>
      </ButtonGroup>
    </PlaceOrderBtn>
  );

  const renderInput = () => {
    if (isLimit === true) {
      return (
        <AllInput>
          <InputGroup>
            <InputText ml={2}>價格</InputText>
            <Input onChange={handleChangeInputValue} textAlign="right" px={1} />
            <InputText mr={2}>USDT</InputText>
          </InputGroup>
          <InputGroup>
            <InputText ml={2}>數量</InputText>
            <Input onChange={handleChangeInputValue} textAlign="right" px={1} />
            <InputText mr={2}>ETH</InputText>
          </InputGroup>
          <InputGroup>
            <InputText ml={2}>成交額</InputText>
            <Input
              id="orderTotal"
              onChange={handleChangeInputValue}
              textAlign="right"
              px={1}
            />
            <InputText mr={2}>USDT</InputText>
          </InputGroup>
        </AllInput>
      );
    }
    return (
      <AllInput>
        <InputGroup>
          <InputText ml={2}>市價</InputText>
          <Input onChange={handleChangeInputValue} textAlign="right" px={1} />
          <InputText mr={2}>USDT</InputText>
        </InputGroup>
        <InputGroup>
          <InputText ml={2}>數量</InputText>
          <Input onChange={handleChangeInputValue} textAlign="right" px={1} />
          <InputText mr={2}>ETH</InputText>
        </InputGroup>
        <InputGroup>
          <InputText ml={2}>成交額</InputText>
          <Input onChange={handleChangeInputValue} textAlign="right" px={1} />
          <InputText mr={2}>USDT</InputText>
        </InputGroup>
      </AllInput>
    );
  };

  return (
    <div>
      {renderBtn()}
      {renderInput()}
      <Button onClick={handleClickUploadOrder} px={3} py={2}>
        Send
      </Button>
    </div>
  );
};

export default PlaceOrder;
