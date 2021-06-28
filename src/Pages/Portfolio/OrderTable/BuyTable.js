import React from "react";
import styled from "styled-components";

const OrderTbodyItem = styled.td`
  padding: 14px 48px 14px 0px;
  border-top: 1px solid #2f3336;
  cursor: default;
  text-align: center;
  position: relative;
  width: 85px;
  :first-child {
    padding-left: 32px;
  }
  :nth-child(4),
  :nth-child(5) {
    min-width: 135px;
  }
  :last-child {
    padding-right: 32px;
    color: ${(props) => {
      if (props.children[0] > 0) {
        return "#0ecb81";
      }
      if (props.children[0] === 0) {
        return "#707a8a";
      }
      return "#f6465d";
    }};
  }
`;

const BuyTable = (props) => {
  const { buyDatas, coinLastPrice } = props;

  const renderBuyTable = () => {
    buyDatas.sort((a, b) => a.timestamp - b.timestamp);
    return buyDatas.map((buyData, index) =>
      coinLastPrice.map((coinPrice) => {
        const symbol = coinPrice.symbol.replace(/USDT/, "");
        if (symbol === buyData.coinType) {
          return (
            <tr key={buyData.timestamp}>
              <OrderTbodyItem>
                <h4>{index + 1}</h4>
              </OrderTbodyItem>
              <OrderTbodyItem>
                {new Date(buyData.timestamp).toLocaleDateString("zh-TW", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </OrderTbodyItem>
              <OrderTbodyItem>{buyData.coinType}</OrderTbodyItem>
              <OrderTbodyItem>
                $ {Number(buyData.coinPrice).toLocaleString()}
              </OrderTbodyItem>
              <OrderTbodyItem>
                $ {Number(coinPrice.price).toLocaleString()}
              </OrderTbodyItem>
              <OrderTbodyItem>
                {Number(buyData.qty).toLocaleString()}
              </OrderTbodyItem>
              <OrderTbodyItem>
                {(
                  (Number((coinPrice.price - buyData.coinPrice) * buyData.qty) /
                    Number(coinPrice.price)) *
                  100
                ).toLocaleString()}
                %
              </OrderTbodyItem>
            </tr>
          );
        }
        return null;
      })
    );
  };
  return renderBuyTable();
};

export default BuyTable;
