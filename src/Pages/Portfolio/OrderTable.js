import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import { color, space, typography, flexbox } from "styled-system";
import { firebaseReadOrder } from "../../Utils/firebase";

const OrderContainer = styled.div`
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 4px;
  overflow-x: auto;
  ${color}
  ${space}
`;

const OrderTitle = styled.div`
  ${color}
  ${space}
  ${typography}
`;

const OrderTableHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${color}
  ${space}
  ${typography}
`;

const OrderTableHeadItem = styled.div`
  width: 120px;
  min-width: 120px;
  text-align: center;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
`;

const OrderTableBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${color}
  ${space}
  ${typography}
  :hover {
    background-color: rgba(249, 249, 250, 0.7);
  }
`;

const OrderTableBodyItem = styled.div`
  width: 120px;
  min-width: 120px;
  text-align: center;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
`;

const OrderTable = (props) => {
  const [buyDatas, setBuyDatas] = useState([]);
  const [sellDatas, setSellDatas] = useState([]);
  const [coinLastPrice, setCoinLastPrice] = useState([]);
  const { email } = props;

  const getOrderData = async () => {
    if (email) {
      const orderDatas = await firebaseReadOrder(email);
      orderDatas.forEach((orderData) => {
        if (orderData.type === "buy") {
          setBuyDatas((buy) => [...buy, orderData]);
        } else if (orderData.type === "sell") {
          setSellDatas((sell) => [...sell, orderData]);
        }
      });
    }
  };

  const getLastPrice = () =>
    axios
      .get(
        `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/portfolio`
      )
      .then((res) => {
        const usdtLastPrice = [];
        res.data.forEach((data) => {
          if (data.symbol.indexOf("USDT", 2) !== -1) {
            usdtLastPrice.push(data);
          }
        });
        setCoinLastPrice(usdtLastPrice);
      });

  const renderBuyTable = () =>
    buyDatas.map((buyData, index) =>
      coinLastPrice.map((coinPrice) => {
        const symbol = coinPrice.symbol.replace(/USDT/, "");

        if (symbol === buyData.coinType) {
          return (
            <OrderTableBody
              key={buyData.timestamp}
              fontFamily="Roboto"
              fontSize={16}
              py={2}
            >
              <OrderTableBodyItem flexGrow={1}>{index + 1}</OrderTableBodyItem>
              <OrderTableBodyItem flexGrow={1}>
                {new Date(buyData.timestamp).toLocaleDateString()}
              </OrderTableBodyItem>
              <OrderTableBodyItem flexGrow={1}>
                {buyData.coinType}
              </OrderTableBodyItem>
              <OrderTableBodyItem flexGrow={1}>
                $ {buyData.coinPrice}
              </OrderTableBodyItem>
              <OrderTableBodyItem flexGrow={1}>
                $ {Number(coinPrice.price).toFixed(2)}
              </OrderTableBodyItem>
              <OrderTableBodyItem flexGrow={1}>
                {buyData.qty}
              </OrderTableBodyItem>
              <OrderTableBodyItem flexGrow={1}>
                $ {Number(buyData.coinPrice - coinPrice.price).toFixed(2)}
              </OrderTableBodyItem>
            </OrderTableBody>
          );
        }
        return null;
      })
    );

  const renderSellTable = () =>
    sellDatas.map((sellData, index) => (
      <OrderTableBody
        key={sellData.timestamp}
        fontFamily="Roboto"
        fontSize={16}
        py={2}
      >
        <OrderTableBodyItem flexGrow={1}>{index + 1}</OrderTableBodyItem>
        <OrderTableBodyItem flexGrow={1}>
          {new Date(sellData.timestamp).toLocaleDateString()}
        </OrderTableBodyItem>
        <OrderTableBodyItem flexGrow={1}>
          {sellData.coinType}
        </OrderTableBodyItem>
        <OrderTableBodyItem flexGrow={1}>
          {sellData.coinPrice}
        </OrderTableBodyItem>
        <OrderTableBodyItem flexGrow={1}>{sellData.qty}</OrderTableBodyItem>
        <OrderTableBodyItem flexGrow={1}>
          {Number(sellData.coinPrice * sellData.qty).toFixed(2)}
        </OrderTableBodyItem>
      </OrderTableBody>
    ));

  useEffect(() => {
    getOrderData();
  }, [email]);

  useEffect(() => {
    getLastPrice();
  }, []);

  return (
    <>
      <OrderContainer bg="white" py={2} px={3} mb={4}>
        <OrderTitle
          fontFamily="Roboto"
          fontSize={28}
          mt={3}
          mb={3}
          fontWeight="bold"
        >
          買入清單
        </OrderTitle>
        <OrderTableHead
          color="#707a8a"
          bg="#f5f5f5"
          fontFamily="Roboto"
          fontSize={16}
          py={2}
        >
          <OrderTableHeadItem flexGrow={1}>#</OrderTableHeadItem>
          <OrderTableHeadItem flexGrow={1}>時間</OrderTableHeadItem>
          <OrderTableHeadItem flexGrow={1}>幣別</OrderTableHeadItem>
          <OrderTableHeadItem flexGrow={1}>購入價格</OrderTableHeadItem>
          <OrderTableHeadItem flexGrow={1}>最新價格</OrderTableHeadItem>
          <OrderTableHeadItem flexGrow={1}>數量</OrderTableHeadItem>
          <OrderTableHeadItem flexGrow={1}>盈虧</OrderTableHeadItem>
        </OrderTableHead>
        {renderBuyTable()}
      </OrderContainer>
      <OrderContainer bg="white" py={2} px={3} mb={4}>
        <OrderTitle
          fontFamily="Roboto"
          fontSize={28}
          mt={3}
          mb={3}
          fontWeight="bold"
        >
          賣出清單
        </OrderTitle>
        <OrderTableHead
          color="#707a8a"
          bg="#f5f5f5"
          fontFamily="Roboto"
          fontSize={16}
          py={2}
        >
          <OrderTableHeadItem flexGrow={1}>#</OrderTableHeadItem>
          <OrderTableHeadItem flexGrow={1}>時間</OrderTableHeadItem>
          <OrderTableHeadItem flexGrow={1}>幣別</OrderTableHeadItem>
          <OrderTableHeadItem flexGrow={1}>賣出價格</OrderTableHeadItem>
          <OrderTableHeadItem flexGrow={1}>賣出數量</OrderTableHeadItem>
          <OrderTableHeadItem flexGrow={1}>賣出總金額</OrderTableHeadItem>
        </OrderTableHead>
        {renderSellTable()}
      </OrderContainer>
    </>
  );
};

OrderTable.propTypes = {
  email: PropTypes.string.isRequired,
};

export default OrderTable;
