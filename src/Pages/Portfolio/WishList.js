import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color, space, typography, flexbox } from "styled-system";
import { readWishList } from "../../Utils/firebase";

const WishListContainer = styled.div`
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 4px;
  ${color}
  ${space}
`;
const WishListTitle = styled.div`
  ${color}
  ${space}
  ${typography}
`;
const WishListTableHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${color}
  ${space}
  ${typography}
`;
const WishListTableHeadItem = styled.div`
  width: 120px;
  min-width: 120px;
  text-align: center;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
`;
const WishListTableBody = styled.div`
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
const WishListTableBodyItem = styled.div`
  width: 120px;
  min-width: 120px;
  text-align: center;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
`;

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
            <WishListTableBody
              key={wishData}
              fontFamily="Roboto"
              fontSize={16}
              py={2}
            >
              <WishListTableBodyItem flexGrow={1}>
                {wishData}
              </WishListTableBodyItem>
              <WishListTableBodyItem flexGrow={1}>
                {item.c}
              </WishListTableBodyItem>
              <WishListTableBodyItem flexGrow={1}>
                {item.P}
              </WishListTableBodyItem>
              <WishListTableBodyItem flexGrow={1}>
                {item.h}
              </WishListTableBodyItem>
              <WishListTableBodyItem flexGrow={1}>
                {item.l}
              </WishListTableBodyItem>
              <WishListTableBodyItem flexGrow={1}>
                {item.v}
              </WishListTableBodyItem>
            </WishListTableBody>
          );
        }
        return null;
      })
    );

  return (
    <WishListContainer bg="white" py={2} px={3} mb={4}>
      <WishListTitle
        fontFamily="Roboto"
        fontSize={28}
        mt={3}
        mb={3}
        fontWeight="bold"
      >
        收藏清單
      </WishListTitle>
      <WishListTableHead
        color="#707a8a"
        bg="#f5f5f5"
        fontFamily="Roboto"
        fontSize={16}
        py={2}
      >
        <WishListTableHeadItem flexGrow={1}>交易對</WishListTableHeadItem>
        <WishListTableHeadItem flexGrow={1}>最新價格</WishListTableHeadItem>
        <WishListTableHeadItem flexGrow={1}>24H 漲跌</WishListTableHeadItem>
        <WishListTableHeadItem flexGrow={1}>24H 最高</WishListTableHeadItem>
        <WishListTableHeadItem flexGrow={1}>24H 最低</WishListTableHeadItem>
        <WishListTableHeadItem flexGrow={1}>24H 成交量</WishListTableHeadItem>
      </WishListTableHead>
      {renderWishListTable()}
    </WishListContainer>
  );
};

export default WishList;
