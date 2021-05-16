import React, { useEffect, useState } from "react";
import { Table, Thead, Tr, Th, Tbody, Td } from "@bootstrap-styled/v4";

const CoinData = () => {
  const [realTimeDatas, setRealTimeDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const realTimeCoinData = () => {
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
    realTimeCoinData();
  }, []);

  useEffect(() => {
    if (JSON.stringify(realTimeDatas) !== "[]") {
      const results = realTimeDatas.filter((realTimeData) =>
        realTimeData.s.includes(searchTerm)
      );
      setSearchResults(results);
    }
  }, [searchTerm]);

  if (JSON.stringify(realTimeDatas) === "[]") {
    return null;
  }

  const renderCoinDatas = () => {
    if (searchTerm === "") {
      return realTimeDatas.map((realTimeData) => (
        <Tr key={realTimeData.L + 1}>
          <Td scope="row">{realTimeData.s}</Td>
          <Td>{realTimeData.c}</Td>
          <Td>{realTimeData.P}</Td>
          <Td>{realTimeData.h}</Td>
          <Td>{realTimeData.l}</Td>
          <Td>{realTimeData.v}</Td>
          <Td>
            <button type="button">收藏</button>
          </Td>
        </Tr>
      ));
    }
    return searchResults.map((item) => (
      <Tr key={item.L + 1}>
        <Td scope="row">{item.s}</Td>
        <Td>{item.c}</Td>
        <Td>{item.P}</Td>
        <Td>{item.h}</Td>
        <Td>{item.l}</Td>
        <Td>{item.v}</Td>
        <Td>
          <button type="button">收藏</button>
        </Td>
      </Tr>
    ));
  };

  return (
    <>
      <h2>貨幣資料</h2>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <Table id="CoinDatas" hover>
        <Thead>
          <Tr color="active">
            <Th>交易對</Th>
            <Th>最新價格</Th>
            <Th>24H 漲跌</Th>
            <Th>24H 最高</Th>
            <Th>24H 最低</Th>
            <Th>24H 成交量</Th>
            <Th>收藏</Th>
          </Tr>
        </Thead>
        <Tbody>{renderCoinDatas()}</Tbody>
      </Table>
    </>
  );
};

export default CoinData;
