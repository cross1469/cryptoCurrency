import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as Switch } from "../../../images/sort.svg";

const EntrySelector = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  cursor: pointer;
  border: 1px solid #d9d9d9;
  border-radius: 100%;
  background-color: #14151a;
`;

const EntrySelectorContainer = styled.div`
  position: relative;
  display: flex;
  padding: 4px;
`;

const EntrySelectorSize = styled.div`
  width: 13px;
  height: 13px;
  svg {
    fill: #d9d9d9;
  }
`;

const Entry = (props) => {
  const {
    inputBottomContent,
    setBuyOrSell,
    setInputValue,
    setInputTopContent,
    setInputBottomContent,
    coin,
  } = props;

  const handleClickChangeCoin = () => {
    if (inputBottomContent.indexOf("USDT") === -1) {
      setBuyOrSell("buy");
      setInputValue("");
      setInputTopContent(coin);
      setInputBottomContent("USDT");
    } else {
      setBuyOrSell("sell");
      setInputValue("");
      setInputTopContent("USDT");
      setInputBottomContent(coin);
    }
  };
  return (
    <EntrySelector>
      <EntrySelectorContainer onClick={handleClickChangeCoin}>
        <EntrySelectorSize>
          <Switch />
        </EntrySelectorSize>
      </EntrySelectorContainer>
    </EntrySelector>
  );
};

Entry.propTypes = {
  inputBottomContent: PropTypes.string,
  setBuyOrSell: PropTypes.func.isRequired,
  setInputValue: PropTypes.func.isRequired,
  setInputTopContent: PropTypes.func.isRequired,
  setInputBottomContent: PropTypes.func.isRequired,
  coin: PropTypes.string.isRequired,
};

Entry.defaultProps = {
  inputBottomContent: "",
};

export default Entry;
