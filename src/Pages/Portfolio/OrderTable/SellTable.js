import React from "react";
import styled from "styled-components";

const OrderTbodySellItem = styled.td`
  padding: 14px 48px 14px 0px;
  border-top: 1px solid #2f3336;
  cursor: default;
  position: relative;
  text-align: center;
  width: 85px;
  :first-child {
    padding-left: 32px;
  }
  :nth-child(4) {
    min-width: 135px;
  }
  :last-child {
    padding-right: 32px;
  }
`;

const SellTable = (props) => {
  const { sellDatas } = props;

  const renderSellTable = () => {
    sellDatas.sort((a, b) => a.timestamp - b.timestamp);
    return sellDatas.map((sellData, index) => (
      <tr key={sellData.timestamp}>
        <OrderTbodySellItem>{index + 1}</OrderTbodySellItem>
        <OrderTbodySellItem>
          {new Date(sellData.timestamp).toLocaleDateString("zh-TW", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })}
        </OrderTbodySellItem>
        <OrderTbodySellItem>{sellData.coinType}</OrderTbodySellItem>
        <OrderTbodySellItem>
          $ {Number(sellData.coinPrice).toLocaleString()}
        </OrderTbodySellItem>
        <OrderTbodySellItem>
          {Number(sellData.qty).toLocaleString()}
        </OrderTbodySellItem>
        <OrderTbodySellItem>
          {Number(sellData.coinPrice * sellData.qty).toLocaleString()}
        </OrderTbodySellItem>
      </tr>
    ));
  };
  return renderSellTable();
};

export default SellTable;
