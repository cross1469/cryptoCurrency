import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  addWishList,
  removeWishList,
  readWishList,
} from "../../Utils/firebase";
import { ReactComponent as DefaultStar } from "../../images/default_star.svg";
import { ReactComponent as ActiveStar } from "../../images/active_star.svg";
import Pagination from "../../Component/Pagination";
import Toast from "../../Component/Toast";
import errorIcon from "../../images/error.svg";
import checkIcon from "../../images/check.svg";
import { ReactComponent as Search } from "../../images/search.svg";
import MobileTable from "./MobileTable";

const override = css`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const LoadingContainer = styled.div`
  height: 100vh;
  background-color: #14151a;
`;

const CoinDataSection = styled.section`
  background-color: #14151a;
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
  @media only screen and (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CoinDataHeadLeft = styled.div`
  flex: 1 1 0%;
  @media only screen and (max-width: 576px) {
    margin-bottom: 26px;
  }
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
  @media only screen and (max-width: 576px) {
    max-width: none;
    width: 100%;
  }
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
  background: #14151a;
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
  background: #14151a;
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
      background-color: #2b2f36;
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
  :nth-child(3) {
    color: ${(props) => {
      if (props.children[0] > 0) {
        return "#0ecb81";
      }
      if (props.children[0] === 0) {
        return "#707a8a";
      }
      return "#f6465d";
    }};
  }

  img {
    height: 20px;
    aspect-ratio: auto 16 / 16;
    width: 20px;
    margin-right: 8px;
  }

  svg {
    width: 24px;
    height: 23px;
    cursor: pointer;
  }
  .defaultStar {
    fill: #fff;
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
  font-weight: 500;
  letter-spacing: 1px;
  border: 1px solid #f0b90b;
  background-color: #f0b90b;
  :hover {
    box-shadow: none;
    background-color: #ffe251;
  }
`;

const CoinData = (props) => {
  let dataFirstOpen = true;
  const [currentPage, setCurrentPage] = useState(1);
  const [realTimeDatas, setRealTimeDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
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
          title: "Please signin",
          description: "Before add your wishlist, please signin",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "successAddWishList":
        toastProperties = {
          id,
          title: "Add to wish list",
          description: "Successfully add to wish list",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "successRemoveWishList":
        toastProperties = {
          id,
          title: "Remove the wish list",
          description: "Successfully remove the wish list",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
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
    if (email) {
      if (starList.indexOf(e.target.parentNode.parentNode.id) === -1) {
        await addWishList(email, e.target.parentNode.parentNode.id);
        const newStarList = [...starList];
        newStarList.push(e.target.parentNode.parentNode.id);
        setStarList(newStarList);
        showToast("successAddWishList");
      } else {
        await removeWishList(email, e.target.parentNode.parentNode.id);
        const num = starList.indexOf(e.target.parentNode.parentNode.id);
        const newStarList = [...starList];
        newStarList.splice(num, 1);
        setStarList(newStarList);
        showToast("successRemoveWishList");
      }
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
        setLoading(false);
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
        realTimeData.s.includes(searchTerm.toUpperCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm]);

  if (JSON.stringify(realTimeDatas) === "[]") {
    return (
      <LoadingContainer>
        <ClipLoader
          color="#f0b90b"
          loading={loading}
          css={override}
          size={40}
        />
      </LoadingContainer>
    );
  }

  const renderCoinDatas = () => {
    if (!searchTerm) {
      return currentData.map((realTimeData) => {
        const symbol = realTimeData.s.replace(/USDT/, "");
        return (
          <tr key={realTimeData.L} id={realTimeData.s}>
            <CoinTableBodyItem>
              <img src={`/icon/${symbol.toLowerCase()}.svg`} alt="coinIcon" />
              {realTimeData.s}
            </CoinTableBodyItem>
            <CoinTableBodyItem>
              {Number(realTimeData.c).toLocaleString()}
            </CoinTableBodyItem>
            <CoinTableBodyItem>
              {Number(realTimeData.P).toLocaleString()}%
            </CoinTableBodyItem>
            <CoinTableBodyItem>
              {Number(realTimeData.n).toLocaleString()}
            </CoinTableBodyItem>
            <CoinTableBodyItem>
              <Link to={`/coinDetail/${realTimeData.s}`} key={realTimeData.s}>
                <TradeButton type="button">Trade</TradeButton>
              </Link>
            </CoinTableBodyItem>
            <CoinTableBodyItem id={realTimeData.s} onClick={handleClickToWish}>
              {starList.indexOf(realTimeData.s) === -1 ? (
                <DefaultStar className="defaultStar" />
              ) : (
                <ActiveStar />
              )}
            </CoinTableBodyItem>
          </tr>
        );
      });
    }
    return searchResults.map((item) => {
      const symbol = item.s.replace(/USDT/, "");
      return (
        <tr key={item.L} id={item.s}>
          <CoinTableBodyItem>
            <img src={`/icon/${symbol.toLowerCase()}.svg`} alt="coinIcon" />
            {item.s}
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            {Number(item.c).toLocaleString()}
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            {Number(item.P).toLocaleString()}%
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            {Number(item.n).toLocaleString()}
          </CoinTableBodyItem>
          <CoinTableBodyItem>
            <Link to={`/coinDetail/${item.s}`} key={item.s}>
              <TradeButton type="button">Trade</TradeButton>
            </Link>
          </CoinTableBodyItem>
          <CoinTableBodyItem id={item.s} onClick={handleClickToWish}>
            {starList.indexOf(item.s) === -1 ? (
              <DefaultStar className="defaultStar" />
            ) : (
              <ActiveStar />
            )}
          </CoinTableBodyItem>
        </tr>
      );
    });
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
