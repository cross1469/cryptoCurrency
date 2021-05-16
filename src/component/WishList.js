import React, { useState, useEffect } from "react";
import { Table, Thead, Tr, Th, Tbody, Td } from "@bootstrap-styled/v4";
import { readWishList } from "../Utils/firebase";

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const [realTimeDatas, setRealTimeDatas] = useState([]);

  const getWishListData = async () => {
    const wishListData = await readWishList();
    setWishList(wishListData);
  };

  const getCoinData = () => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/!ticker@arr`
    );
    socket.onmessage = (event) => {
      const coinDatas = JSON.parse(event.data);
      const usdtDatas = [];
      coinDatas.forEach((data) => {
        if (data.s.indexOf("USDT") !== -1) {
          usdtDatas.push(data);
        }
      });
      setRealTimeDatas([...realTimeDatas, ...usdtDatas]);
    };
  };

  useEffect(() => {
    getWishListData();
    getCoinData();
  }, []);

  const renderWishListTable = () =>
    wishList.map((wishData) =>
      realTimeDatas.map((item) => {
        if (wishData === item.s) {
          return (
            <Tr key={wishData}>
              <Td scope="row">{wishData}</Td>
              <Td>{item.c}</Td>
              <Td>{item.P}</Td>
              <Td>{item.h}</Td>
              <Td>{item.l}</Td>
              <Td>{item.v}</Td>
            </Tr>
          );
        }
        return null;
      })
    );

  return (
    <>
      <h2>收藏清單</h2>
      <Table id="wishList" hover>
        <Thead>
          <Tr color="active">
            <Th>交易對</Th>
            <Th>最新價格</Th>
            <Th>24H 漲跌</Th>
            <Th>24H 最高</Th>
            <Th>24H 最低</Th>
            <Th>24H 成交量</Th>
          </Tr>
        </Thead>
        <Tbody>{renderWishListTable()}</Tbody>
      </Table>
    </>
  );
};

export default WishList;
