import React, { useState } from "react";
import styled from "styled-components";
import { color, space, typography, flexbox } from "styled-system";

const RenderAddValue = styled.div`
  ${space}
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  ${space}
`;

const AddValueTitle = styled.div`
  ${color}
  ${space}
  ${typography}
`;
const AddValueInput = styled.input`
  flex-grow: 1;
  max-width: 55%;
  border: 1px solid rgba(43, 47, 54, 0.8);
  outline: none;
  text-align: right;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
  :hover {
    border-color: rgb(240, 185, 11);
  }
  @media only screen and (max-width: 996px) {
    max-width: 50%;
  }
`;
const AddValueBtn = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  ${color}
  ${space}
`;

const Asset = styled.div`
  display: flex;
  justify-content: space-between;
  ${space}
  ${typography}
`;
const CoinText = styled.div``;
const CoinSum = styled.div``;

const AddValue = () => {
  const [addValue, setAddValue] = useState("");

  const handlAddValueInput = (e) => {
    setAddValue(e.target.value);
  };

  return (
    <RenderAddValue ml={5} mt={4}>
      <AddValueTitle fontFamily="Roboto" fontSize={28} fontWeight="bold" mb={2}>
        充值
      </AddValueTitle>
      <FlexBox mb={2}>
        <AddValueInput
          value={addValue}
          onChange={handlAddValueInput}
          fontFamily="Roboto"
          fontSize={{ md: 14, lg: 16 }}
          mr={{ md: 2 }}
          px={3}
          py={2}
        />
        <AddValueBtn
          fontFamily="Roboto"
          fontSize={{ md: 14, lg: 16 }}
          bg="#02c077}"
          px={{ md: 2, lg: 3 }}
          py={{ md: 2 }}
          color="white"
        >
          充值
        </AddValueBtn>
      </FlexBox>

      <Asset fontFamily="Roboto" fontSize={16} mb={2}>
        <CoinText>ETH 可用：</CoinText>
        <CoinSum>0.05</CoinSum>
      </Asset>
      <Asset fontFamily="Roboto" fontSize={16} mb={2}>
        <CoinText>USDT 可用：</CoinText>
        <CoinSum>0.00012</CoinSum>
      </Asset>
    </RenderAddValue>
  );
};

export default AddValue;
