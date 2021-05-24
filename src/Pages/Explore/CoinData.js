import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, space, typography, flexbox, border } from "styled-system";
import { addWishList } from "../../Utils/firebase";
import defaultStar from "../../images/default_star.png";
import activeStar from "../../images/active_star.png";

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
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 1304px;
  overflow-x: auto;
  ${space}
`;

const CoinTableHead = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 16px 16px 16px 0px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eaecef;
  border-top-color: #eaecef;
  border-right-color: #eaecef;
  border-left-color: #eaecef;
  background-color: #fafafa;
  ${space}
`;

const CoinTableHeadItem = styled.div`
  width: 120px;
  min-width: 120px;
  text-align: center;
  @media only screen and (max-width: 768px) {
    width: 80px;
    min-width: 80px;
  }
`;

const CoinTableBody = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  padding-left: 0px;
  padding-right: 16px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eaecef;
  border-top-color: #eaecef;
  border-right-color: #eaecef;
  border-left-color: #eaecef;
  flex: 1 1 0%;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  color: #1e2329;
  ${space}
`;

const CoinTableBodyItem = styled.div`
  width: 120px;
  min-width: 120px;
  text-align: center;
  @media only screen and (max-width: 768px) {
    width: 80px;
    min-width: 80px;
  }
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

const Star = styled.img`
  width: 16px;
  height: 16px;
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

  const [star, setStar] = useState(defaultStar);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClickToWish = (e) => {
    setStar(activeStar);
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
        if (data.s.indexOf("USDT", 2) !== -1) {
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
          <CoinTableBodyItem>
            <Star src={star} onClick={handleClickToWish} />
            {realTimeData.s}
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            {Number(realTimeData.c).toFixed(5)}
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            {Number(realTimeData.P).toFixed(2)}%
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            {Number(realTimeData.h).toFixed(5)}
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            {Number(realTimeData.l).toFixed(5)}
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            {Number(realTimeData.v).toFixed(2)}
          </CoinTableBodyItem>
        </CoinTableBody>
      ));
    }
    return searchResults.map((item) => (
      <CoinTableBody mb={3} key={item.L} id={item.s}>
        <CoinTableBodyItem>
          <Star src={star} onClick={handleClickToWish} />
          {item.s}
        </CoinTableBodyItem>
        <CoinTableBodyItem>{Number(item.c).toFixed(5)}</CoinTableBodyItem>
        <CoinTableBodyItem>{Number(item.P).toFixed(2)}%</CoinTableBodyItem>
        <CoinTableBodyItem>{Number(item.h).toFixed(5)}</CoinTableBodyItem>
        <CoinTableBodyItem>{Number(item.l).toFixed(5)}</CoinTableBodyItem>
        <CoinTableBodyItem>{Number(item.v).toFixed(2)}</CoinTableBodyItem>
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
      <FlexBox px={{ sm: 0, md: "16px", lg: "8px" }} mt={2} mb={3}>
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

      <CoinTable
        px={{ sm: 0, md: "16px", lg: "8px" }}
        mb={3}
        id="CoinDatas"
        hover
      >
        <CoinTableHead mb={3}>
          <CoinTableHeadItem>交易對</CoinTableHeadItem>
          <CoinTableHeadItem>最新價格</CoinTableHeadItem>
          <CoinTableHeadItem>24H 漲跌</CoinTableHeadItem>
          <CoinTableHeadItem>24H 最高</CoinTableHeadItem>
          <CoinTableHeadItem>24H 最低</CoinTableHeadItem>
          <CoinTableHeadItem>24H 成交量</CoinTableHeadItem>
        </CoinTableHead>
        {renderCoinDatas()}
      </CoinTable>
    </>
  );
};

export default CoinData;
