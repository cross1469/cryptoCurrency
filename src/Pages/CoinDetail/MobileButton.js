import React, { useState } from "react";
import styled from "styled-components";
import { color, space, typography, layout, flexbox } from "styled-system";
// import MobileAddValue from "./MobileAddValue";

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
  color: white;
  background-color: rgb(2, 192, 118);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
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
  color: rgb(132, 142, 156);
  background-color: rgb(43, 49, 57);
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
const LimitBtn = styled.span`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: inline-block;
  padding-top: 8px;
  padding-bottom: 10px;
  font-weight: 500;
  color: rgb(255, 255, 255);
  border-bottom: 2px solid rgb(240, 185, 11);
  cursor: pointer;
`;
const MarketBtn = styled.span`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: inline-block;
  padding-top: 8px;
  padding-bottom: 10px;
  font-weight: 500;
  color: rgb(132, 142, 156);
  border-bottom: 2px solid transparent;
  cursor: pointer;
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

const MobileButton = () => {
  const [displayPlaceOrder, setDisplayPlaceOrder] = useState("none");
  const [displayBtn, setDisplayBtn] = useState("flex");
  const [displayAddValue, setDisplayAddValue] = useState("none");

  const handleClickPlaceOrderBtn = (e) => {
    e.preventDefault();
    setDisplayPlaceOrder("block");
    setDisplayBtn("none");
  };
  const handleClickAddValueBtn = (e) => {
    e.preventDefault();
    setDisplayAddValue("block");
    setDisplayBtn("none");
  };
  const handleClickClose = (e) => {
    e.preventDefault();
    setDisplayPlaceOrder("none");
    setDisplayAddValue("none");
    setDisplayBtn("flex");
  };

  return (
    <>
      <Button display={displayBtn}>
        <PlaceOrderBtn onClick={handleClickPlaceOrderBtn}>下單</PlaceOrderBtn>
        <AddValueBtn onClick={handleClickAddValueBtn}>充值</AddValueBtn>
      </Button>
      <PlaceOrderSection display={displayPlaceOrder}>
        <PlaceOrderTitleSection>
          <PlaceOrderTitle>下單</PlaceOrderTitle>
          <PlaceOrderClose onClick={handleClickClose}>X</PlaceOrderClose>
        </PlaceOrderTitleSection>
        <PlaceOrderBody>
          <BuyOrSellBtn>
            <BuyBtn>買入</BuyBtn>
            <SellBtn>賣出</SellBtn>
          </BuyOrSellBtn>
          <PlaceOrderInputSection>
            <PlaceOrderInputPart>
              <div>
                <LimitOrMarketPrice>
                  <LimitBtn>限價</LimitBtn>
                  <MarketBtn>市價</MarketBtn>
                </LimitOrMarketPrice>
                <AllInput>
                  <InputGroup mb={2}>
                    <InputText
                      ml={2}
                      fontSize={{ md: 14, lg: 16 }}
                      fontFamily="Roboto"
                    >
                      價格
                    </InputText>
                    <Input
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
                      ETH
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
                      id="orderTotal"
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
                </AllInput>
                <PlaceOrderButton
                  px={3}
                  py={12}
                  mb={2}
                  fontFamily="Roboto"
                  fontSize={16}
                >
                  加值
                </PlaceOrderButton>
              </div>
            </PlaceOrderInputPart>
          </PlaceOrderInputSection>
        </PlaceOrderBody>
      </PlaceOrderSection>
    </>
  );
};

export default MobileButton;
