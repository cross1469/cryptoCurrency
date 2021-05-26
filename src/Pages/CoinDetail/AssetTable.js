import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import styled from "styled-components";
import { color, space, typography, flexbox } from "styled-system";
import {
  firebaseReadCoinAsset,
  firebaseGetLimitOrderData,
} from "../../Utils/firebase";

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
  width: 160px;
  min-width: 160px;
  text-align: center;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
  @media only screen and (max-width: 996px) {
    width: 120px;
    min-width: 120px;
  }
  @media only screen and (max-width: 568px) {
    width: 80px;
    min-width: 80px;
  }
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
  @media only screen and (max-width: 996px) {
    width: 120px;
    min-width: 120px;
  }
  @media only screen and (max-width: 568px) {
    width: 80px;
    min-width: 80px;
  }
`;

const AssetTable = (props) => {
  const { symbol } = useParams();
  const coin = symbol.replace(/USDT/, "");
  const { email } = props;
  const [coinData, setCoinData] = useState({ profitLoss: "", qty: "" });
  const [limitData, setLimitData] = useState("");
  const [total, setTotal] = useState("");

  const getUserCoinAsset = async () => {
    let limitQty = 0;
    if (email) {
      const coinAsset = await firebaseReadCoinAsset(email, coin);
      const limitOrderData = await firebaseGetLimitOrderData(email, coin);
      if (coinAsset) {
        setCoinData(coinAsset);
      }
      if (limitOrderData.length > 0) {
        limitOrderData.forEach((item) => {
          limitQty += item.qty;
        });
        setLimitData(limitQty);
      }
      const coinTotal = Number(coinAsset) + Number(limitQty);
      setTotal(coinTotal);
    }
  };

  useEffect(() => {
    getUserCoinAsset();
  }, [email]);

  return (
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
        <AssetTableBodyItem flexGrow={1}>{coin}</AssetTableBodyItem>
        <AssetTableBodyItem flexGrow={1}>
          {total === "" ? 0 : total}
        </AssetTableBodyItem>
        <AssetTableBodyItem flexGrow={1}>
          {coinData.qty === "" ? 0 : coinData.qty}
        </AssetTableBodyItem>
        <AssetTableBodyItem flexGrow={1}>
          {limitData === "" ? 0 : limitData}
        </AssetTableBodyItem>
      </AssetTableBody>
    </>
  );
};

AssetTable.propTypes = {
  email: PropTypes.string.isRequired,
};

export default AssetTable;
