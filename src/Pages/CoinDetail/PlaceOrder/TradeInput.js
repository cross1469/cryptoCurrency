import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

const BuySellBodyItem = styled.div`
  display: flex;
  flex-direction: column;
  span {
    flex-grow: 0;
    flex-shrink: 0;
    height: 16px;
  }
  :first-child {
    margin-bottom: 24px;
  }
`;

const BuySellBodyInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 60px;
  flex-direction: row;
  overflow: hidden;
  height: 60px;
`;

const BuySellBodyInputContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  transform: scale(1);
  flex: 1 1 0%;
  max-width: 250px;
`;

const BuySellInputText = styled.div`
  display: flex;
  align-items: baseline;
  text-align: left;
  color: #f0b90b;
  font-weight: 400;
  animation: 0.5s ease 0s 1 normal none running hBgzBc;
  span {
    font-weight: 500;
    color: rgba(#f0b90b, 0.3);
    line-height: 1.5;
    align-self: flex-start;
    margin-top: 8px;
    font-size: ${(props) => {
      if (props.children[1].props.value.length < 3) {
        return "32px";
      }
      if (props.children[1].props.value.length < 7) {
        return "24px";
      }
      return "20px";
    }};
  }
  input {
    text-align: left;
    font-weight: 400;
    background-color: #14151a;
    padding: 0px;
    margin: 0px;
    box-shadow: none;
    border: none;
    overflow: hidden;
    outline: none;
    font-size: ${(props) => {
      if (props.children[1].props.value.length < 3) {
        return "54px";
      }
      if (props.children[1].props.value.length < 5) {
        return "48px";
      }
      if (props.children[1].props.value.length < 7) {
        return "42px";
      }
      return "36px";
    }};
    color: ${(props) => {
      if (props.children[1].props.value === "0") {
        return "#757575";
      }
      return "#f0b90b";
    }};
    width: ${(props) => {
      if (props.children[1].props.value.length < 2) {
        return "40px";
      }
      if (props.children[1].props.value.length < 4) {
        return "80px";
      }
      if (props.children[1].props.value.length < 6) {
        return "120px";
      }
      if (props.children[1].props.value.length < 8) {
        return "160px";
      }
      return "200px";
    }};
  }
`;

const TradeInput = (props) => {
  const marketPrice = useSelector(
    (state) => state.coinDetailReducer.marketPrice
  );
  const {
    setInputValue,
    inputTopContent,
    setInputTopContent,
    setInputBottomContent,
    setBuyOrSell,
    setQty,
    setTotal,
    coin,
    inputValue,
  } = props;

  const handleChangeInputNewValue = (e) => {
    const re = /^[.,0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      const num = e.target.value.replace(/,/g, "");
      if (num.indexOf(".") === -1) {
        setInputValue(Number(num).toLocaleString());
      } else {
        setInputValue(num);
      }

      if (inputTopContent.indexOf("USDT") === -1) {
        setInputTopContent(`${Number(num).toLocaleString()} ${coin}`);
        setInputBottomContent(
          `${Number(Number(num) * Number(marketPrice)).toLocaleString()} USDT`
        );
        setBuyOrSell("sell");
        setQty(num);
        setTotal(num);
      } else {
        setInputTopContent(`${Number(num).toLocaleString()} USDT`);
        setInputBottomContent(
          `${Number(
            Number(num) / Number(marketPrice)
          ).toLocaleString()} ${coin}`
        );
        setBuyOrSell("buy");
        setQty(Number(Number(num) / Number(marketPrice)));
        setTotal(num);
      }
    }
  };

  return (
    <BuySellBodyItem>
      <BuySellBodyInput>
        <BuySellBodyInputContainer>
          <BuySellInputText>
            <span>$</span>
            <input
              inputMode="decimal"
              maxLength="11"
              placeholder="0"
              value={inputValue}
              onChange={handleChangeInputNewValue}
            />
          </BuySellInputText>
        </BuySellBodyInputContainer>
      </BuySellBodyInput>
    </BuySellBodyItem>
  );
};

TradeInput.propTypes = {
  inputTopContent: PropTypes.string,
  setBuyOrSell: PropTypes.func.isRequired,
  setInputValue: PropTypes.func.isRequired,
  setInputTopContent: PropTypes.func.isRequired,
  setInputBottomContent: PropTypes.func.isRequired,
  coin: PropTypes.string.isRequired,
  setQty: PropTypes.func.isRequired,
  setTotal: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

TradeInput.defaultProps = {
  inputTopContent: "",
};

export default TradeInput;
