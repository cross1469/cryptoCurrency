import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MobileDataSection = styled.section`
  width: 100%;
  color: #fff;
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
  background-color: #1c1c1e;
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
    :hover {
      background-color: #323539;
    }
  }
`;

const MobileBodyItem = styled.td`
  border-top: 1px solid rgb(236, 239, 241);
  cursor: pointer;
  min-width: 140px;
  padding: 14px 24px 14px 0px;
  :first-child {
    padding-left: 24px;
  }
  :last-child {
    adding-right: 24px;
    cursor: default;
    width: 70px;
  }
  a {
    color: #fff;
  }
`;

const PriceColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  h4 {
    display: block;
    line-height: 23px;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    :last-child {
      width: 100%;
      text-align: right;
      font-variant-numeric: tabular-nums;
      display: unset;
    }
  }
`;

const MobileTable = (props) => {
  const { className, currentData, searchResults, searchTerm } = props;

  const renderCoinDatas = () => {
    if (!searchTerm) {
      return currentData.map((realTimeData) => (
        <tr key={realTimeData.s}>
          <MobileBodyItem>
            <Link to={`/coinDetail/${realTimeData.s}`}>{realTimeData.s}</Link>
          </MobileBodyItem>
          <MobileBodyItem>
            <PriceColumn>
              <h4>{Number(realTimeData.c).toFixed(5)}</h4>
              <h4>{Number(realTimeData.P).toFixed(2)}%</h4>
            </PriceColumn>
          </MobileBodyItem>
        </tr>
      ));
    }
    return searchResults.map((item) => (
      <tr key={item.s}>
        <MobileBodyItem>
          <Link to={`/coinDetail/${item.s}`}>{item.s}</Link>
        </MobileBodyItem>
        <MobileBodyItem>
          <PriceColumn>
            <h4>{Number(item.c).toFixed(5)}</h4>
            <h4>{Number(item.P).toFixed(2)}%</h4>
          </PriceColumn>
        </MobileBodyItem>
      </tr>
    ));
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
  currentData: PropTypes.arrayOf.isRequired,
  searchResults: PropTypes.arrayOf.isRequired,
  searchTerm: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default MobileTable;
