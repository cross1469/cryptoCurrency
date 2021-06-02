import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addAndRemoveWishList, readWishList } from "../../Utils/firebase";
import { ReactComponent as DefaultStar } from "../../images/default_star.svg";
import { ReactComponent as ActiveStar } from "../../images/active_star.svg";
import Pagination from "../../Component/Pagination";
import Toast from "../../Component/Toast";
import errorIcon from "../../images/error.svg";
import { ReactComponent as Search } from "../../images/search.svg";
import MobileTable from "./MobileTable";

const CoinDataSection = styled.section`
  background-color: #1c1c1e;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  flex-direction: column;
  padding: 0px 24px;
`;

const CoinDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  height: 100%;
  max-height: 100%;
  margin: 0px;
  padding: 25px 0px;
  width: 100%;
  max-width: 1280px;
`;

const CoinDataHeadContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

const CoinDataHeadLeft = styled.div`
  flex: 1 1 0%;
`;

const CoinDataTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  margin: 0px;
  padding: 0px;
`;

const CoinDataHeadRight = styled.div`
  display: flex;
  flex: 1 1 0%;
  max-width: 250px;
  justify-content: flex-end;
`;

const SearchSection = styled.section`
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0px 16px;
  border: 1px solid #dfe1e5;
  border-radius: 4px;
  background: #1c1c1e;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex: 1 1 0%;
`;

const SearchInputIconContainer = styled.div`
  margin-right: 16px;
  width: 20px;
  height: 20px;
  svg {
    filter: invert(100%) sepia(0%) saturate(7471%) hue-rotate(99deg)
      brightness(102%) contrast(100%);
  }
`;

const SearchInput = styled.input`
  color: #fff;
  width: 100%;
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  appearance: none;
  font-size: 16px;
  :focus {
    outline: none;
  }
`;

const CoinTableStyle = styled.section`
  width: 100%;
  color: #fff;
  margin-bottom: 24px;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const DisplayMobileTable = styled(MobileTable)`
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const CoinTableContainer = styled.div`
  border: 1px solid #dfe1e5;
  width: auto;
  border-radius: 0px;
  overflow-x: auto;
`;

const CoinTable = styled.table`
  width: 100%;
  padding: 0px;
  background: #1c1c1e;
  border-spacing: 0px;
  border-collapse: separate;
  caption-side: top;
`;

const CoinTableHead = styled.thead`
  border: none;
  tr {
    border-bottom: 1px solid #dfe1e5;
  }
`;

const CoinTableHeadItem = styled.th`
  padding: 16px 48px 16px 0px;
  border-bottom: none;
  text-align: left;
  :first-child {
    padding-left: 32px;
  }
  :last-child {
    width: 70px;
    padding-right: 32px;
  }
  :nth-child(5) {
    padding-left: 16px;
  }
`;

const CoinTableBody = styled.tbody`
  padding: 0px;
  border: none;
  transition: opacity 300ms ease 0s;
  tr {
    user-select: none;
    :hover {
      background-color: #323539;
    }
  }
`;

const CoinTableBodyItem = styled.td`
  padding: 14px 48px 14px 0px;
  border-top: 1px solid rgb(236, 239, 241);
  cursor: default;
  position: relative;
  width: 85px;
  :first-child {
    padding-left: 32px;
  }
  :last-child {
    width: 70px;
    padding-top: 20px;
  }
  svg {
    width: 24px;
    height: 23px;
    cursor: pointer;
  }
  .defaultStar {
    filter: invert(100%) sepia(93%) saturate(0%) hue-rotate(202deg)
      brightness(107%) contrast(109%);
  }
`;

const TradeButton = styled.button`
  position: relative;
  width: auto;
  margin: 0px;
  border-radius: 4px;
  cursor: pointer;
  color: #212833;
  transition: all 80ms ease-in-out 0s;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  border: 1px solid #f0b90b;
  background-image: linear-gradient(
    rgb(248, 209, 47) 0%,
    rgb(240, 185, 11) 100%
  );
  :hover {
    box-shadow: none;
    background-image: linear-gradient(
      rgb(255, 226, 81) 0%,
      rgb(237, 196, 35) 100%
    );
  }
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
      await addAndRemoveWishList(email, e.target.id);
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
        <tr key={realTimeData.L}>
          <CoinTableBodyItem>{realTimeData.s}</CoinTableBodyItem>
          <CoinTableBodyItem>
            {Number(realTimeData.c).toFixed(5)}
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            {Number(realTimeData.P).toFixed(2)}%
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            {Number(realTimeData.n).toFixed(2)}
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            <Link to={`/coinDetail/${realTimeData.s}`} key={realTimeData.s}>
              <TradeButton type="button">Trade</TradeButton>
            </Link>
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            {starList.indexOf(realTimeData.s) === -1 ? (
              <DefaultStar
                className="defaultStar"
                id={realTimeData.s}
                onClick={handleClickToWish}
              />
            ) : (
              <ActiveStar id={realTimeData.s} onClick={handleClickToWish} />
            )}
          </CoinTableBodyItem>
        </tr>
      ));
    }
    return searchResults.map((item) => (
      <tr key={item.L}>
        <CoinTableBodyItem>{item.s}</CoinTableBodyItem>
        <CoinTableBodyItem>{Number(item.c).toFixed(5)}</CoinTableBodyItem>
        <CoinTableBodyItem>{Number(item.P).toFixed(2)}%</CoinTableBodyItem>
        <CoinTableBodyItem>{Number(item.n).toFixed(2)}</CoinTableBodyItem>
        <CoinTableBodyItem>
          <Link to={`/coinDetail/${item.s}`} key={item.s}>
            <TradeButton type="button">Trade</TradeButton>
          </Link>
        </CoinTableBodyItem>
        <CoinTableBodyItem>
          {starList.indexOf(item.s) === -1 ? (
            <DefaultStar id={item.s} onClick={handleClickToWish} />
          ) : (
            <ActiveStar id={item.s} onClick={handleClickToWish} />
          )}
        </CoinTableBodyItem>
      </tr>
    ));
  };

  return (
    <CoinDataSection>
      <CoinDataContainer>
        <CoinDataHeadContainer>
          <CoinDataHeadLeft>
            <CoinDataTitle>Coin Datas / Prices</CoinDataTitle>
          </CoinDataHeadLeft>
          <CoinDataHeadRight>
            <SearchSection>
              <SearchInputContainer>
                <SearchInputIconContainer>
                  <Search />
                </SearchInputIconContainer>
                <SearchInput
                  type="text"
                  placeholder="Search all coins..."
                  value={searchTerm}
                  onChange={handleChange}
                />
              </SearchInputContainer>
            </SearchSection>
          </CoinDataHeadRight>
        </CoinDataHeadContainer>

        <CoinTableStyle>
          <CoinTableContainer>
            <CoinTable id="CoinDatas" hover>
              <CoinTableHead>
                <tr>
                  <CoinTableHeadItem>Name</CoinTableHeadItem>
                  <CoinTableHeadItem>Price</CoinTableHeadItem>
                  <CoinTableHeadItem>Change</CoinTableHeadItem>
                  <CoinTableHeadItem>Market Cap</CoinTableHeadItem>
                  <CoinTableHeadItem>Trade</CoinTableHeadItem>
                  <CoinTableHeadItem>Watch</CoinTableHeadItem>
                </tr>
              </CoinTableHead>
              <CoinTableBody>{renderCoinDatas()}</CoinTableBody>
            </CoinTable>
          </CoinTableContainer>
        </CoinTableStyle>

        <DisplayMobileTable
          currentData={currentData}
          searchTerm={searchTerm}
          searchResults={searchResults}
        />
        <div className="pagination-wrapper">
          <Pagination
            totalRecords={NUM_OF_RECORDS}
            pageLimit={limit}
            pageNeighbours={1}
            onPageChanged={onPageChanged}
            currentPage={currentPage}
          />
        </div>
      </CoinDataContainer>

      <Toast toastList={list} autoDelete dismissTime={5000} />
    </CoinDataSection>
  );
};

CoinData.propTypes = {
  email: PropTypes.string.isRequired,
};

export default CoinData;
