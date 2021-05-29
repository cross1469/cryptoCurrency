import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import { useDispatch, useSelector } from "react-redux";
import { updateUsdtPrice } from "../../Redux/Actions/actionCreator";
import { firebaseWriteCoinAsset } from "../../Utils/firebase";
import Toast from "../../Component/Toast";
import checkIcon from "../../images/check.svg";
import errorIcon from "../../images/error.svg";

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
  const dispatch = useDispatch();
  const usdtQty = useSelector((state) => state.coinDetailReducer.usdtQty);

  const [addValue, setAddValue] = useState("");

  const { email } = props;

  const [list, setList] = useState([]);
  let toastProperties = null;

  const handlAddValueInput = (e) => {
    setAddValue(e.target.value);
  };

  const showToast = (type) => {
    const id = Math.floor(Math.random() * 101 + 1);
    switch (type) {
      case "success":
        toastProperties = {
          id,
          title: "Success",
          description: "加值成功",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "danger":
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
      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  };

  const handleClickAddValue = () => {
    const total = Number(usdtQty) + Number(addValue);
    if (email && addValue > 0) {
      firebaseWriteCoinAsset(email, "USDT", total);
      dispatch(updateUsdtPrice(total));
      setAddValue("");
      showToast("success");
    } else if (!addValue) {
      showToast("dangerTotal");
    } else {
      showToast("danger");
    }
  };

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
          加值
        </AddValueBtn>
      </FlexBox>

      <Asset fontFamily="Roboto" fontSize={16} mb={2}>
        <CoinText>USDT 可用：</CoinText>
        <CoinSum>{Number(usdtQty).toFixed(2)}</CoinSum>
      </Asset>
      <Toast toastList={list} autoDelete dismissTime={5000} />
    </RenderAddValue>
  );
};

AddValue.propTypes = {
  email: PropTypes.string.isRequired,
};

export default AddValue;
