import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { ReactComponent as Right } from "../../images/next.svg";

const override = css`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;
  border-top: 1px solid rgb(236, 239, 241);
  border-bottom: 1px solid rgb(236, 239, 241);
  color: #fff;
`;

const MobileWishListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  height: 54px;
  padding: 0px 24px;
  border-bottom: 1px solid rgb(236, 239, 241);
`;

const WishListTitle = styled.div`
  display: flex;
  flex-direction: row;
  h2 {
    font-size: 18px;
    font-weight: 500;
    line-height: 23px;
    display: block;
    margin: 0px;
  }
`;

const MobileWishListBody = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const WishListBodyContainer = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: none 0s ease 0s;
`;

const WishListBodyModule = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 1;
`;

const WishListTableContainer = styled.div`
  width: 100%;
  border-right: 0px;
  border-left: 0px;
  margin-top: -1px;
  border-radius: 0px;
  overflow-x: auto;
`;

const WishListTable = styled.table`
  width: 100%;
  padding: 0px;
  border-spacing: 0px;
  border-collapse: separate;
  caption-side: top;
`;

const WishListTbody = styled.tbody`
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

const WishListItem = styled.td`
  border-top: 1px solid rgb(236, 239, 241);
  cursor: pointer;
  min-width: 140px;
  padding: 14px 24px 14px 0px;
  :first-child {
    padding-left: 24px;
  }
  :last-child {
    padding-right: 24px;
    width: 70px;
  }
  a {
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    text-decoration: none;
    transition: color 0.25s ease 0s;
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    flex-direction: row;
  }
`;

const WishListCoinName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  h4 {
    display: block;
    margin: 0px;
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    text-align: left;
    padding-left: 16px;
  }
`;

const WishListPriceColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  h4 {
    display: block;
    margin: 0px;
    line-height: 23px;
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    :last-child {
      width: 100%;
      text-align: right;
      font-variant-numeric: tabular-nums;
      display: unset;
      line-height: 23px;
      font-size: 18px;
      font-weight: 400;
      margin: 0px;
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

const MobileWishListFooter = styled.div`
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
    cursor: pointer;
  }
`;

const WishListFooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  height: 54px;
  border-top: 1px solid rgb(236, 239, 241);
  font-weight: 500;
  transition: all 0.25s ease 0s;
  cursor: pointer;
  color: #fff;
  fill: #fff;
  svg {
    width: 10px;
    height: 10px;
    margin-top: 2px;
    margin-left: 6px;
  }
  :hover {
    fill: #f0b90b;
    color: #f0b90b;
    transition: all 0.25s ease 0s;
  }
`;

const MobileWishList = (props) => {
  const { className, wishList, coinLastPrice, loading } = props;

  const renderWishList = () =>
    wishList.map((wishData) =>
      coinLastPrice.map((item) => {
        if (wishData === item.symbol) {
          return (
            <tr key={item.closeTime}>
              <WishListItem>
                <Link to={`/coinDetail/${wishData}`}>
                  <WishListCoinName>
                    <h4>{wishData}</h4>
                  </WishListCoinName>
                </Link>
              </WishListItem>
              <WishListItem>
                <WishListPriceColumn>
                  <h4>{Number(item.lastPrice).toLocaleString()}</h4>
                  <h4>{Number(item.priceChangePercent).toLocaleString()}%</h4>
                </WishListPriceColumn>
              </WishListItem>
            </tr>
          );
        }
        return null;
      })
    );

  return (
    <PanelContainer className={className}>
      <MobileWishListHeader>
        <WishListTitle>
          <h2>WishList</h2>
        </WishListTitle>
      </MobileWishListHeader>
      <MobileWishListBody>
        <WishListBodyContainer>
          <WishListBodyModule>
            <WishListTableContainer>
              <WishListTable>
                <WishListTbody>
                  {coinLastPrice.length > 0 ? (
                    renderWishList()
                  ) : (
                    <ClipLoader
                      color="#f0b90b"
                      loading={loading}
                      css={override}
                      size={40}
                    />
                  )}
                </WishListTbody>
              </WishListTable>
            </WishListTableContainer>
          </WishListBodyModule>
        </WishListBodyContainer>
      </MobileWishListBody>
      <MobileWishListFooter>
        <Link to="/explore">
          <WishListFooterContent>
            Discover more assets
            <Right />
          </WishListFooterContent>
        </Link>
      </MobileWishListFooter>
    </PanelContainer>
  );
};

MobileWishList.propTypes = {
  wishList: PropTypes.arrayOf(PropTypes.string),
  coinLastPrice: PropTypes.arrayOf(PropTypes.objectOf),
  className: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

MobileWishList.defaultProps = {
  wishList: undefined,
  coinLastPrice: undefined,
};

export default MobileWishList;
