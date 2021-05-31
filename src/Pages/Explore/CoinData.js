import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { color, space, typography, flexbox } from "styled-system";
import { Link } from "react-router-dom";
import { addAndRemoveWishList, readWishList } from "../../Utils/firebase";
import defaultStar from "../../images/default_star.png";
import activeStar from "../../images/active_star.png";
import Pagination from "../../Component/Pagination";
import Toast from "../../Component/Toast";
import errorIcon from "../../images/error.svg";

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
  a {
    text-decoration: none;
  }
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

const Star = styled.img`
  width: 16px;
  height: 16px;
`;

const CoinData = (props) => {
  let dataFirstOpen = true;
  const [currentPage, setCurrentPage] = useState(1);
  const [realTimeDatas, setRealTimeDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { email } = props;

  const [starList, setStarList] = useState([]);

  const [list, setList] = useState([]);
  let toastProperties = null;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const showToast = (type) => {
    const id = Math.floor(Math.random() * 101 + 1);
    switch (type) {
      case "danger":
        toastProperties = {
          id,
          title: "Danger",
          description: "請先登入",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  };

  const renderInitActiveStar = async () => {
    if (email) {
      const wishList = await readWishList(email);
      setStarList(wishList);
    } else {
      setStarList([]);
    }
  };

  const handleClickToWish = async (e) => {
    e.preventDefault();
    if (email) {
      await addAndRemoveWishList(email, e.target.parentNode.parentNode.id);
      renderInitActiveStar();
    } else {
      showToast("danger");
    }
  };

  const NUM_OF_RECORDS = realTimeDatas.length;
  const limit = 15;
  const onPageChanged = useCallback(
    (e, page) => {
      e.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const currentData = realTimeDatas.slice(
    (currentPage - 1) * limit,
    (currentPage - 1) * limit + limit
  );

  useEffect(() => {
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

      if (dataFirstOpen) {
        setRealTimeDatas(usdtDatas);
        dataFirstOpen = false;
      }

      /*
        realTimeDatas [{ s: "BTC", l:  }]
      */

      /*
        realTimeDatasOrder: ["BTC", "ETH"]
        realTimeDatsByCoinType: {
          BTC: {
            l:
          },
          ETH: {

          }
        }

        realTimeDataOrder.map(coinType => {
          const data = realTimeDatsByCoinType[coinType]
        })
      */

      // useReducer

      if (!dataFirstOpen) {
        setRealTimeDatas((usdt) => {
          const newUsdtDatas = [...usdt];
          coinDatas.forEach((data) => {
            const index = newUsdtDatas.findIndex((coin) => coin.s === data.s);
            newUsdtDatas[index] = data;
          });
          return newUsdtDatas;
        });
      }
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    renderInitActiveStar();
  }, [email]);

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
    if (!searchTerm) {
      return currentData.map((realTimeData) => (
        <Link to={`/coinDetail/${realTimeData.s}`} key={realTimeData.s}>
          <CoinTableBody mb={3} key={realTimeData.L} id={realTimeData.s}>
            <CoinTableBodyItem>
              <Star
                id={realTimeData.s}
                src={
                  starList.indexOf(realTimeData.s) === -1
                    ? defaultStar
                    : activeStar
                }
                onClick={handleClickToWish}
              />
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
        </Link>
      ));
    }
    return searchResults.map((item) => (
      <Link to={`/coinDetail/${item.s}`} key={item.s}>
        <CoinTableBody mb={3} key={item.L} id={item.s}>
          <CoinTableBodyItem>
            <Star
              id={item.s}
              src={starList.indexOf(item.s) === -1 ? defaultStar : activeStar}
              onClick={handleClickToWish}
            />
            {item.s}
          </CoinTableBodyItem>
          <CoinTableBodyItem>{Number(item.c).toFixed(5)}</CoinTableBodyItem>
          <CoinTableBodyItem>{Number(item.P).toFixed(2)}%</CoinTableBodyItem>
          <CoinTableBodyItem>{Number(item.h).toFixed(5)}</CoinTableBodyItem>
          <CoinTableBodyItem>{Number(item.l).toFixed(5)}</CoinTableBodyItem>
          <CoinTableBodyItem>{Number(item.v).toFixed(2)}</CoinTableBodyItem>
        </CoinTableBody>
      </Link>
    ));
  };

  return (
    <>
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
      <div className="pagination-wrapper">
        <Pagination
          totalRecords={NUM_OF_RECORDS}
          pageLimit={limit}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
          currentPage={currentPage}
        />
      </div>
      <Toast toastList={list} autoDelete dismissTime={5000} />
    </>
  );
};

CoinData.propTypes = {
  email: PropTypes.string.isRequired,
};

export default CoinData;
