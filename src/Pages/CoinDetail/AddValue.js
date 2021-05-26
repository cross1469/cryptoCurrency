import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import { firebaseAddValue, firebaseReadCoinAsset } from "../../Utils/firebase";

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

const InputGroup = styled.div`
  ${space}
  max-width:70%;
  display: flex;
  height: 32px;
  border: 1px solid rgba(43, 47, 54, 0.8);
  border-radius: 4px;
  align-items: center;
  :hover {
    border-color: rgb(240, 185, 11);
  }
`;
const Input = styled.input`
  width: calc(100% - 40px);
  outline: none;
  border: none;
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

const AddValue = (props) => {
  const { symbol } = useParams();
  const coin = symbol.replace(/USDT/, "");

  const [addValue, setAddValue] = useState("");
  const [usdtData, setUsdtData] = useState({ profitLoss: "", qty: "" });
  const [coinData, setCoinData] = useState({ profitLoss: "", qty: "" });

  const { email } = props;

  const handlAddValueInput = (e) => {
    setAddValue(e.target.value);
  };

  const getUserCoinAsset = async () => {
    if (email !== "") {
      const usdtAsset = await firebaseReadCoinAsset(email, "USDT");
      const coinAsset = await firebaseReadCoinAsset(email, coin);
      if (usdtAsset) {
        setUsdtData(usdtAsset);
      } else if (coinAsset) {
        setCoinData(coinAsset);
      }
    }
  };

  const handleClickAddValue = () => {
    const total = Number(usdtData.qty) + Number(addValue);

    firebaseAddValue(email, "USDT", total);
    getUserCoinAsset();
    setAddValue("");
  };

  useEffect(() => {
    getUserCoinAsset();
  }, [email]);

  return (
    <RenderAddValue ml={5} mt={4}>
      <AddValueTitle fontFamily="Roboto" fontSize={28} fontWeight="bold" mb={2}>
        充值
      </AddValueTitle>
      <FlexBox mb={2}>
        <InputGroup mr={2}>
          <Input
            value={addValue}
            onChange={handlAddValueInput}
            textAlign="right"
            px={1}
            fontFamily="Roboto"
          />
          <InputUnit mr={2} fontSize={{ _: 14, lg: 16 }} fontFamily="Roboto">
            USDT
          </InputUnit>
        </InputGroup>
        <AddValueBtn
          fontSize={{ _: 10, lg: 16 }}
          fontFamily="Roboto"
          bg="#02c077}"
          px={{ _: 3 }}
          color="white"
          onClick={handleClickAddValue}
        >
          充值
        </AddValueBtn>
      </FlexBox>

      <Asset fontFamily="Roboto" fontSize={16} mb={2}>
        <CoinText>{coin} 可用：</CoinText>
        <CoinSum>{coinData.qty === "" ? 0 : coinData.qty}</CoinSum>
      </Asset>
      <Asset fontFamily="Roboto" fontSize={16} mb={2}>
        <CoinText>USDT 可用：</CoinText>
        <CoinSum>{usdtData.qty}</CoinSum>
      </Asset>
    </RenderAddValue>
  );
};

AddValue.propTypes = {
  email: PropTypes.string.isRequired,
};

export default AddValue;
