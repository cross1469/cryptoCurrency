import React, { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { space } from "styled-system";
import Modal from "../../component/Modal";
import PlaceOrder from "./PlaceOrder";
import AddValue from "./AddValue";

const Button = styled.div`
  box-sizing: border-box;
  padding: 16px 16px;
  justify-content: space-around;
  display: flex;
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
  background-color: #f0b90b;
  width: 45%;
  height: 40px;
  border-radius: 4px;
  ${space}
  :hover {
    background-color: #ffe251;
  }
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
  width: 45%;
  height: 40px;
  border-radius: 4px;
  color: #f0b90b;
  border: 1px solid #f0b90b;
  ${space}
  :hover {
    background-color: #ffe251;
    color: #000;
    border: none;
  }
`;

const MobileButton = (props) => {
  const { className } = props;
  const placeOrderModal = useRef(null);
  const addValueModal = useRef(null);

  return (
    <div className={className}>
      <Button>
        <PlaceOrderBtn onClick={() => placeOrderModal.current.open()}>
          Trades
        </PlaceOrderBtn>
        <AddValueBtn onClick={() => addValueModal.current.open()}>
          Deposit
        </AddValueBtn>
      </Button>
      <Modal ref={placeOrderModal}>
        <PlaceOrder />
      </Modal>
      <Modal ref={addValueModal}>
        <AddValue />
      </Modal>
    </div>
  );
};

MobileButton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default MobileButton;
