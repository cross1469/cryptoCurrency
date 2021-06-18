import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "../../../component/Pagination";
import { ReactComponent as Search } from "../../../images/search.svg";
import MobileTable from "./MobileTable";
import CoinDataTable from "./CoinDataTable";

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
  color: #d9d9d9;
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
  color: #d9d9d9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0px 16px;
  border: 1px solid;
  border-color: ${(props) => props.focusStyle};
  border-radius: 4px;
  background: #14151a;
  :hover {
    border: 1px solid #f0b90b;
  }
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
    fill: #d9d9d9;
  }
`;

const SearchInput = styled.input`
  color: #d9d9d9;
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

const DisplayMobileTable = styled(MobileTable)`
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const getCurrentData = (array, currentPage, limit) =>
  array.slice((currentPage - 1) * limit, (currentPage - 1) * limit + limit);

const CoinData = () => {
  const [dataFirstOpen, setDataFirstOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [realTimeDatas, setRealTimeDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [focusStyle, setFocusStyle] = useState("#2f3336");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFocusStyle = (e) => {
    if (e.type === "focus") {
      setFocusStyle("#f0b90b");
    } else {
      setFocusStyle("#2f3336");
    }
  };

  const NUM_OF_RECORDS = realTimeDatas.length;
  const SEARCH_NUM_OF_RECORDS = searchResults.length;
  const limit = 15;
  const onPageChanged = useCallback(
    (e, page) => {
      e.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const currentData = getCurrentData(realTimeDatas, currentPage, limit);
  const searchCurrentData = getCurrentData(searchResults, currentPage, limit);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/!ticker@arr`
    );
    socket.onmessage = (event) => {
      const coinDatas = JSON.parse(event.data);
      const usdtDatas = coinDatas.filter(
        (data) => data.s.indexOf("USDT", 2) !== -1
      );

      if (dataFirstOpen) {
        setRealTimeDatas(usdtDatas);
        setDataFirstOpen(false);
        setLoading(false);
      }

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
  }, [dataFirstOpen]);

  useEffect(() => {
    const results = realTimeDatas?.filter((realTimeData) =>
      realTimeData.s.includes(searchTerm.toUpperCase())
    );
    setSearchResults(results);
  }, [realTimeDatas, searchTerm]);

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

  return (
    <CoinDataSection>
      <CoinDataContainer>
        <CoinDataHeadContainer>
          <CoinDataHeadLeft>
            <CoinDataTitle>Coin Datas / Prices</CoinDataTitle>
          </CoinDataHeadLeft>
          <CoinDataHeadRight>
            <SearchSection focusStyle={focusStyle}>
              <SearchInputContainer>
                <SearchInputIconContainer>
                  <Search />
                </SearchInputIconContainer>
                <SearchInput
                  type="text"
                  placeholder="Search all coins..."
                  value={searchTerm}
                  onChange={handleChange}
                  onFocus={handleFocusStyle}
                  onBlur={handleFocusStyle}
                />
              </SearchInputContainer>
            </SearchSection>
          </CoinDataHeadRight>
        </CoinDataHeadContainer>

        <CoinDataTable
          currentData={currentData}
          searchCurrentData={searchCurrentData}
          searchTerm={searchTerm}
        />

        <DisplayMobileTable
          currentData={currentData}
          searchTerm={searchTerm}
          searchCurrentData={searchCurrentData}
        />
        <div className="pagination-wrapper">
          {searchTerm ? (
            <Pagination
              totalRecords={SEARCH_NUM_OF_RECORDS}
              pageLimit={limit}
              pageNeighbours={1}
              onPageChanged={onPageChanged}
              currentPage={currentPage}
            />
          ) : (
            <Pagination
              totalRecords={NUM_OF_RECORDS}
              pageLimit={limit}
              pageNeighbours={1}
              onPageChanged={onPageChanged}
              currentPage={currentPage}
            />
          )}
        </div>
      </CoinDataContainer>
    </CoinDataSection>
  );
};

export default CoinData;
