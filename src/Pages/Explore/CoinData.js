import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, space, typography, flexbox, border } from "styled-system";
import { addWishList } from "../../Utils/firebase";

const CoinDataTitle = styled.div`
  ${typography}
  ${space}
  ${flexbox}
  ${color}
`;

const SearchInput = styled.input`
  outline: none;
  height: 32px;
  border: 1px solid rgba(43, 47, 54, 0.8);
  border-radius: 4px;
  :hover {
    border-color: rgb(240, 185, 11);
  }
  ${space}
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${space}
`;

const CoinTable = styled.div`
  ${space}
`;

const CoinTableHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${space}
`;

const CoinTableHeadItem = styled.div`
  width: 120px;
  min-width: 120px;
  text-align: center;
`;

const CoinTableBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${space}
`;

const CoinTableBodyItem = styled.div`
  width: 120px;
  min-width: 120px;
  text-align: center;
`;

const OptionBtn = styled.button`
  outline: none;
  cursor: pointer;
  ${color}
  ${border}
  ${space}
  ${typography}
`;
const MarketBtn = styled.button`
  outline: none;
  cursor: pointer;
  ${color}
  ${border}
  ${space}
  ${typography}
`;

const CoinData = () => {
  const [realTimeDatas, setRealTimeDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [optionBtnColor, setOptionBtnColor] = useState({
    color: "#c99400",
    border: "1px solid #FCEA9C",
    bg: "#fffdf0",
  });

  const [marketBtnColor, setMarketBtnColor] = useState({
    color: "#1e2329",
    border: "1px solid #e6e6e6",
    bg: "transparent",
  });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClickToWish = (e) => {
    addWishList(e.target.parentNode.parentNode.id);
  };

  const handleClickBtn = (e) => {
    if (e.target.innerHTML === "自選") {
      setOptionBtnColor({
        color: "#c99400",
        border: "1px solid #FCEA9C",
        bg: "#fffdf0",
      });
      setMarketBtnColor({
        color: "#1e2329",
        border: "1px solid #e6e6e6",
        bg: "transparent",
      });
    } else if (e.target.innerHTML === "現貨市場") {
      setOptionBtnColor({
        color: "#1e2329",
        border: "1px solid #e6e6e6",
        bg: "transparent",
      });
      setMarketBtnColor({
        color: "#c99400",
        border: "1px solid #FCEA9C",
        bg: "#fffdf0",
      });
    }
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
        <CoinTableBody mb={3} key={realTimeData.L} id={realTimeData.s}>
          <CoinTableBodyItem scope="row">{realTimeData.s}</CoinTableBodyItem>
          <CoinTableBodyItem>{realTimeData.c}</CoinTableBodyItem>
          <CoinTableBodyItem>{realTimeData.P}</CoinTableBodyItem>
          <CoinTableBodyItem>{realTimeData.h}</CoinTableBodyItem>
          <CoinTableBodyItem>{realTimeData.l}</CoinTableBodyItem>
          <CoinTableBodyItem>{realTimeData.v}</CoinTableBodyItem>
          <CoinTableBodyItem>
            <button type="button" onClick={handleClickToWish}>
              收藏
            </button>
          </CoinTableBodyItem>
        </CoinTableBody>
      ));
    }
    return searchResults.map((item) => (
      <CoinTableBody mb={3} key={item.L} id={item.s}>
        <CoinTableBodyItem scope="row">{item.s}</CoinTableBodyItem>
        <CoinTableBodyItem>{item.c}</CoinTableBodyItem>
        <CoinTableBodyItem>{item.P}</CoinTableBodyItem>
        <CoinTableBodyItem>{item.h}</CoinTableBodyItem>
        <CoinTableBodyItem>{item.l}</CoinTableBodyItem>
        <CoinTableBodyItem>{item.v}</CoinTableBodyItem>
        <CoinTableBodyItem>
          <button type="button" onClick={handleClickToWish}>
            收藏
          </button>
        </CoinTableBodyItem>
      </CoinTableBody>
    ));
  };

  return (
    <>
      <OptionBtn
        mt={4}
        mr={2}
        px={2}
        py={1}
        fontFamily="Roboto"
        fontSize={12}
        color={optionBtnColor.color}
        border={optionBtnColor.border}
        bg={optionBtnColor.bg}
        onClick={handleClickBtn}
      >
        自選
      </OptionBtn>
      <MarketBtn
        mt={4}
        px={2}
        py={1}
        fontFamily="Roboto"
        fontSize={12}
        color={marketBtnColor.color}
        border={marketBtnColor.border}
        bg={marketBtnColor.bg}
        onClick={handleClickBtn}
      >
        現貨市場
      </MarketBtn>
      <FlexBox mt={2} mb={3}>
        <CoinDataTitle fontFamily="Roboto" fontSize={28} fontWeight="bold">
          貨幣資料
        </CoinDataTitle>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          fontFamily="Roboto"
          px={2}
        />
      </FlexBox>

      <CoinTable mb={3} id="CoinDatas" hover>
        <CoinTableHead mb={3}>
          <CoinTableHeadItem>交易對</CoinTableHeadItem>
          <CoinTableHeadItem>最新價格</CoinTableHeadItem>
          <CoinTableHeadItem>24H 漲跌</CoinTableHeadItem>
          <CoinTableHeadItem>24H 最高</CoinTableHeadItem>
          <CoinTableHeadItem>24H 最低</CoinTableHeadItem>
          <CoinTableHeadItem>24H 成交量</CoinTableHeadItem>
          <CoinTableHeadItem>收藏</CoinTableHeadItem>
        </CoinTableHead>
        {renderCoinDatas()}
      </CoinTable>
    </>
  );
};

export default CoinData;
