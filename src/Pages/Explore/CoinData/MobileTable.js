import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MobileDataSection = styled.section`
  width: 100%;
  color: #d9d9d9;
  margin-bottom: 24px;
`;

const TableContainer = styled.div`
  width: 100%;
  border-right: 0px;
  border-left: 0px;
  margin-top: -1px;
  border-radius: 0px;
  overflow-x: auto;
`;

const MobileCoinTable = styled.table`
  width: 100%;
  padding: 0px;
  background-color: #14151a;
  border-spacing: 0px;
  border-collapse: separate;
  caption-side: top;
`;

const MobileTbody = styled.tbody`
  padding: 0px;
  border: none;
  transition: opacity 300ms ease 0s;
  tr {
    user-select: none;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #2f3336;
    :hover {
      background-color: #323539;
    }
  }
`;

const MobileBodyItem = styled.td`
  cursor: pointer;
  min-width: 140px;
  padding: 14px 24px 14px 0px;
  :first-child {
    display: flex;
    align-content: center;
    padding-left: 24px;
    img {
      height: 16px;
      aspect-ratio: auto 16 / 16;
      width: 16px;
      margin-right: 8px;
    }
  }
  :last-child {
    padding-right: 24px;
    cursor: default;
    width: 70px;
  }
  a {
    color: #d9d9d9;
  }
`;

const PriceColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  h4 {
    display: block;
    line-height: 23px;
    color: #d9d9d9;
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    :last-child {
      width: 100%;
      text-align: right;
      font-variant-numeric: tabular-nums;
      display: unset;
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
  }
`;

const MobileTable = (props) => {
  const { className, currentData, searchCurrentData, searchTerm } = props;

  const renderCoinDatas = () => {
    if (!searchTerm) {
      return currentData.map((realTimeData) => {
        const symbol = realTimeData.s.replace(/USDT/, "");
        return (
          <tr key={realTimeData.s}>
            <MobileBodyItem>
              <img src={`/icon/${symbol.toLowerCase()}.svg`} alt="CoinSymbol" />
              <Link to={`/coinDetail/${realTimeData.s}`}>{realTimeData.s}</Link>
            </MobileBodyItem>
            <MobileBodyItem>
              <PriceColumn>
                <h4>{Number(realTimeData.c).toLocaleString()}</h4>
                <h4>{Number(realTimeData.P).toLocaleString()}%</h4>
              </PriceColumn>
            </MobileBodyItem>
          </tr>
        );
      });
    }
    return searchCurrentData.map((item) => {
      const symbol = item.s.replace(/USDT/, "");
      return (
        <tr key={item.s}>
          <MobileBodyItem>
            <img src={`/icon/${symbol.toLowerCase()}.svg`} alt="coinIcon" />
            <Link to={`/coinDetail/${item.s}`}>{item.s}</Link>
          </MobileBodyItem>
          <MobileBodyItem>
            <PriceColumn>
              <h4>{Number(item.c).toLocaleString()}</h4>
              <h4>{Number(item.P).toLocaleString()}%</h4>
            </PriceColumn>
          </MobileBodyItem>
        </tr>
      );
    });
  };

  return (
    <MobileDataSection className={className}>
      <TableContainer>
        <MobileCoinTable>
          <MobileTbody>{renderCoinDatas()}</MobileTbody>
        </MobileCoinTable>
      </TableContainer>
    </MobileDataSection>
  );
};

MobileTable.propTypes = {
  currentData: PropTypes.arrayOf(PropTypes.objectOf),
  searchCurrentData: PropTypes.arrayOf(PropTypes.objectOf),
  searchTerm: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

MobileTable.defaultProps = {
  searchCurrentData: [],
  currentData: [],
};

export default MobileTable;
