import React, { useState } from "react";
import styled from "styled-components";
import { Button, ButtonGroup } from "@bootstrap-styled/v4/";

const PlaceOrderBtn = styled.div`
  display: flex;
  flex-direction: column;
`;

const BuyAndSell = () => {
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

  const HandleClickBuy = (e) => {
    if (e.target.innerHTML === "買入") {
      setBuyColor({
        "$btn-primary-border": "#198754",
        "$btn-primary-bg": "#198754",
      });
      setSellColor({
        "$btn-primary-border": "black",
        "$btn-primary-bg": "black",
      });
    } else if (e.target.innerHTML === "賣出") {
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

  const HandleClickPrice = (e) => {
    if (e.target.innerHTML === "限價") {
      setLimitColor({
        "$btn-primary-border": "#6c757d",
        "$btn-primary-bg": "#6c757d",
      });
      setMarketColor({
        "$btn-primary-border": "black",
        "$btn-primary-bg": "black",
      });
    } else if (e.target.innerHTML === "市價") {
      setLimitColor({
        "$btn-primary-border": "black",
        "$btn-primary-bg": "black",
      });
      setMarketColor({
        "$btn-primary-border": "#6c757d",
        "$btn-primary-bg": "#6c757d",
      });
    }
  };

  return (
    <PlaceOrderBtn>
      <ButtonGroup onClick={HandleClickBuy}>
        <Button size="lg" theme={buyColor}>
          買入
        </Button>
        <Button size="lg" theme={sellColor}>
          賣出
        </Button>
      </ButtonGroup>
      <ButtonGroup onClick={HandleClickPrice}>
        <Button size="lg" theme={limitColor}>
          限價
        </Button>
        <Button size="lg" theme={marketColor}>
          市價
        </Button>
      </ButtonGroup>
    </PlaceOrderBtn>
  );
};

export default BuyAndSell;
