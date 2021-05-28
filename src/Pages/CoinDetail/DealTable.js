import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { color, space, typography, flexbox } from "styled-system";

const DealTableContent = styled.div`
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const DealTableTile = styled.div`
  ${color}
  ${space}
  ${typography}
`;

const DealTableHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${color}
  ${space}
  ${typography}
`;

const DealTableHeadItem = styled.div`
  width: 160px;
  min-width: 160px;
  text-align: center;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
  @media only screen and (max-width: 568px) {
    width: 120px;
    min-width: 120px;
  }
`;

const DealTableBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${color}
  ${space}
  ${typography}
`;

const DealTableBodyItem = styled.div`
  width: 160px;
  min-width: 160px;
  text-align: center;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
  @media only screen and (max-width: 568px) {
    width: 120px;
    min-width: 120px;
  }
`;

const DealTable = () => {
  const { symbol } = useParams();
  const coin = symbol.replace(/USDT/, "");

  const [dealDatas, setDealDatas] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@aggTrade`
    );
    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setDealDatas((prev) => [eventData, ...prev.slice(0, 49)]);
      // max 50 筆，後續第一筆進來就刪除最後一筆
      // setDealDatas([eventData]);
    };
  }, []);

  const renderDealTable = () =>
    dealDatas.map((data) => {
      const date = new Date(data.E);
      const hours = date.getHours();
      const minutes = `0${date.getMinutes()}`;
      const seconds = `0${date.getSeconds()}`;
      return (
        <DealTableBody key={data.a} fontFamily="Roboto" fontSize={16} py={2}>
          <DealTableBodyItem flexGrow={1}>{data.p}</DealTableBodyItem>
          <DealTableBodyItem flexGrow={1}>{data.q}</DealTableBodyItem>
          <DealTableBodyItem flexGrow={1}>
            {`${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`}
          </DealTableBodyItem>
        </DealTableBody>
      );
    });

  return (
    <>
      <DealTableTile
        fontFamily="Roboto"
        fontSize={28}
        mt={3}
        mb={3}
        fontWeight="bold"
      >
        最新成交
      </DealTableTile>
      <DealTableHead fontFamily="Roboto" fontSize={16} py={2}>
        <DealTableHeadItem flexGrow={1}>價格 (USDT)</DealTableHeadItem>
        <DealTableHeadItem flexGrow={1}>數量 ({coin})</DealTableHeadItem>
        <DealTableHeadItem flexGrow={1}>時間</DealTableHeadItem>
      </DealTableHead>
      <DealTableContent>{renderDealTable()}</DealTableContent>
    </>
  );
};

export default DealTable;
