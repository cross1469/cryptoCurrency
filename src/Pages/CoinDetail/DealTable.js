import React from "react";
import styled from "styled-components";
import { color, space, typography, flexbox } from "styled-system";

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
  width: 60px;
  min-width: 60px;
  text-align: center;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
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
`;

const DealTable = () => (
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
      <DealTableHeadItem flexGrow={1}>數量 (ETH)</DealTableHeadItem>
      <DealTableHeadItem flexGrow={1}>時間</DealTableHeadItem>
    </DealTableHead>
    <DealTableBody fontFamily="Roboto" fontSize={16} py={2}>
      <DealTableBodyItem flexGrow={1}>2900.05000</DealTableBodyItem>
      <DealTableBodyItem flexGrow={1}>0.05007971</DealTableBodyItem>
      <DealTableBodyItem flexGrow={1}>20:49:11</DealTableBodyItem>
    </DealTableBody>
  </>
);

export default DealTable;
