import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ReactComponent as DefaultStar } from "../../../images/defaultStar.svg";
import { ReactComponent as ActiveStar } from "../../../images/activeStar.svg";
import {
  addWishList,
  removeWishList,
  readWishList,
} from "../../../Utils/firebase";
import { ShowToastContext, EmailContext } from "../../../context/Context";

const CoinTableStyle = styled.section`
  width: 100%;
  color: #d9d9d9;
  margin-bottom: 24px;
  min-height: calc(100vh - 499px);
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const CoinTableContainer = styled.div`
  border: 1px solid #2f3336;
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
  text-align: center;
  :first-child {
    padding-left: 32px;
  }
  :nth-child(2) {
    padding-left: 28px;
  }
  :nth-child(4) {
    padding-right: 66px;
  }
  :last-child {
    width: 70px;
    padding-right: 32px;
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
  border-top: 1px solid #2f3336;
  cursor: default;
  position: relative;
  text-align: center;
  width: 85px;
  :first-child {
    a {
      color: #d9d9d9;
    }
    padding-left: 32px;
    .symbolContainer {
      display: flex;
      align-content: center;
      justify-content: center;
    }
  }
  :last-child {
    width: 70px;
    padding-top: 20px;
  }
  :nth-child(2),
  :nth-child(3),
  :nth-child(4) {
    min-width: 148px;
    width: 148px;
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
    height: 16px;
    aspect-ratio: auto 16 / 16;
    width: 16px;
    margin-right: 8px;
  }

  svg {
    width: 24px;
    height: 23px;
    cursor: pointer;
  }
  .defaultStar {
    fill: #d9d9d9;
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

const CoinDataTable = (props) => {
  const { searchCurrentData, currentData, searchTerm } = props;
  const [starList, setStarList] = useState([]);
  const email = useContext(EmailContext);
  const showToast = useContext(ShowToastContext);

  const handleClickToWish = async (e) => {
    if (email) {
      if (starList.indexOf(e.target.parentNode.parentNode.id) === -1) {
        await addWishList(email, e.target.parentNode.parentNode.id);
        setStarList([...starList, e.target.parentNode.parentNode.id]);
        showToast("successAddWishList");
      } else {
        await removeWishList(email, e.target.parentNode.parentNode.id);
        const newStarList = starList.filter(
          (coinType) => coinType !== e.target.parentNode.parentNode.id
        );
        setStarList(newStarList);
        showToast("successRemoveWishList");
      }
    } else {
      showToast("dangerWishList");
    }
  };

  useEffect(() => {
    const renderInitActiveStar = async () => {
      if (email) {
        const wishList = await readWishList(email);
        setStarList(wishList);
      } else {
        setStarList([]);
      }
    };
    renderInitActiveStar();
  }, [email]);

  const renderCoinDatas = () => {
    if (searchTerm === "") {
      return currentData.map((realTimeData) => {
        const symbol = realTimeData.s.replace(/USDT/, "");
        return (
          <tr key={realTimeData.s} id={realTimeData.s}>
            <CoinTableBodyItem>
              <Link to={`/coinDetail/${realTimeData.s}`}>
                <div className="symbolContainer">
                  <img
                    src={`/icon/${symbol.toLowerCase()}.svg`}
                    alt="coinIcon"
                  />
                  {realTimeData.s}
                </div>
              </Link>
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
              <Link to={`/coinDetail/${realTimeData.s}`}>
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
    if (searchCurrentData.length === 0) {
      return (
        <tr>
          <CoinTableBodyItem colSpan="6">No data available</CoinTableBodyItem>
        </tr>
      );
    }
    return searchCurrentData.map((item) => {
      const symbol = item.s.replace(/USDT/, "");
      return (
        <tr key={item.L} id={item.s}>
          <CoinTableBodyItem>
            <Link to={`/coinDetail/${item.s}`}>
              <div className="symbolContainer">
                <img src={`/icon/${symbol.toLowerCase()}.svg`} alt="coinIcon" />
                {item.s}
              </div>
            </Link>
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
            <Link to={`/coinDetail/${item.s}`}>
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
              <CoinTableHeadItem>Wish</CoinTableHeadItem>
            </tr>
          </CoinTableHead>
          <CoinTableBody>{renderCoinDatas()}</CoinTableBody>
        </CoinTable>
      </CoinTableContainer>
    </CoinTableStyle>
  );
};

CoinDataTable.propTypes = {
  currentData: PropTypes.arrayOf(PropTypes.objectOf),
  searchCurrentData: PropTypes.arrayOf(PropTypes.objectOf),
  searchTerm: PropTypes.string.isRequired,
};

CoinDataTable.defaultProps = {
  searchCurrentData: [],
  currentData: [],
};

export default CoinDataTable;
