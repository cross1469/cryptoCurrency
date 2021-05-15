import React, { useEffect, useState } from "react";
import { Table, Thead, Tr, Th, Tbody, Td } from "@bootstrap-styled/v4";
import { firebaseReadOrder } from "../Utils/firebase";

const AssetsForm = () => {
  const [buyDatas, setBuyDatas] = useState([]);
  const [sellDatas, setSellDatas] = useState([]);

  const getOrderData = async () => {
    const orderDatas = await firebaseReadOrder();
    orderDatas.forEach((orderData) => {
      if (orderData.type === "buy") {
        setBuyDatas((buy) => [...buy, orderData]);
      } else if (orderData.type === "sell") {
        setSellDatas((sell) => [...sell, orderData]);
      }
    });
  };

  const renderBuyTable = () =>
    buyDatas.map((buyData, index) => (
      <Tr key={buyData.timestamp}>
        <Td scope="row">{index + 1}</Td>
        <Td>{new Date(buyData.timestamp).toLocaleDateString()}</Td>
        <Td>{buyData.coinType}</Td>
        <Td>{buyData.tradingType}</Td>
        <Td>{buyData.coinPrice}</Td>
        <Td>123</Td>
        <Td>{buyData.qty}</Td>
        <Td>123</Td>
      </Tr>
    ));

  const renderSellTable = () =>
    sellDatas.map((sellData, index) => (
      <Tr key={sellData.timestamp}>
        <Td scope="row">{index + 1}</Td>
        <Td>{new Date(sellData.timestamp).toLocaleDateString()}</Td>
        <Td>{sellData.coinType}</Td>
        <Td>{sellData.tradingType}</Td>
        <Td>{sellData.coinPrice}</Td>
        <Td>123</Td>
        <Td>{sellData.qty}</Td>
        <Td>123</Td>
      </Tr>
    ));

  useEffect(() => {
    getOrderData();
  }, []);

  if (JSON.stringify(buyDatas) === "[]" || JSON.stringify(sellDatas) === "[]") {
    return null;
  }

  return (
    <div>
      <h2>購買清單</h2>
      <Table id="buy" hover>
        <Thead>
          <Tr color="active">
            <Th>#</Th>
            <Th>時間</Th>
            <Th>幣別</Th>
            <Th>交易類別</Th>
            <Th>購入價格</Th>
            <Th>最新價格</Th>
            <Th>數量</Th>
            <Th>盈虧</Th>
          </Tr>
        </Thead>
        <Tbody>{renderBuyTable()}</Tbody>
      </Table>
      <h2>成交清單</h2>
      <Table id="sell" hover>
        <Thead>
          <Tr color="active">
            <Th>#</Th>
            <Th>時間</Th>
            <Th>幣別</Th>
            <Th>交易類別</Th>
            <Th>購入價格</Th>
            <Th>最新價格</Th>
            <Th>數量</Th>
            <Th>盈虧</Th>
          </Tr>
        </Thead>
        <Tbody>{renderSellTable()}</Tbody>
      </Table>
    </div>
  );
};

export default AssetsForm;
