import React from "react";
import styled from "styled-components";
import { color, space, typography, flexbox } from "styled-system";

const AssetTableTile = styled.div`
  ${color}
  ${space}
  ${typography}
`;

const AssetTableHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${color}
  ${space}
  ${typography}
`;

const AssetTableHeadItem = styled.div`
  width: 60px;
  min-width: 60px;
  text-align: center;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
`;

const AssetTableBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${color}
  ${space}
  ${typography}
`;

const AssetTableBodyItem = styled.div`
  width: 160px;
  min-width: 160px;
  text-align: center;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
`;

const AssetTable = () => (
  <>
    <AssetTableTile
      fontFamily="Roboto"
      fontSize={28}
      mt={3}
      mb={3}
      fontWeight="bold"
    >
      資產管理
    </AssetTableTile>
    <AssetTableHead fontFamily="Roboto" fontSize={16} py={2}>
      <AssetTableHeadItem flexGrow={1}>幣種</AssetTableHeadItem>
      <AssetTableHeadItem flexGrow={1}>總額</AssetTableHeadItem>
      <AssetTableHeadItem flexGrow={1}>可用資產</AssetTableHeadItem>
      <AssetTableHeadItem flexGrow={1}>下單鎖定</AssetTableHeadItem>
    </AssetTableHead>
    <AssetTableBody fontFamily="Roboto" fontSize={16} py={2}>
      <AssetTableBodyItem flexGrow={1}>ETH</AssetTableBodyItem>
      <AssetTableBodyItem flexGrow={1}>0.05007971</AssetTableBodyItem>
      <AssetTableBodyItem flexGrow={1}>0.05007971</AssetTableBodyItem>
      <AssetTableBodyItem flexGrow={1}>0.00000000</AssetTableBodyItem>
    </AssetTableBody>
  </>
);

export default AssetTable;
