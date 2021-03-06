import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { Scrollbars } from "react-custom-scrollbars-2";
import { firebaseReadOrder } from "../../../Utils/firebase";
import { EmailContext } from "../../../context/Context";
import { getCoinLastPrice } from "../../../Utils/api";
import BuyTable from "./BuyTable";
import SellTable from "./SellTable";

const override = css`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const OrderContainer = styled.div`
  color: #d9d9d9;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  flex-direction: column;
  overflow-x: auto;
  margin-bottom: 56px;
`;

const OrderStyledContent = styled.div`
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

const OrderHeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 32px;
`;

const OrderHeaderContent = styled.div`
  flex: 1 1 0%;
`;

const OrderHeaderContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  h1 {
    font-weight: 400;
    margin: 0px;
    padding: 0px;
    span {
      margin: 8px 0px 0px;
      font-size: 24px;
      font-weight: 500;
    }
  }
`;

const OrderSection = styled.section`
  width: 100%;
  h3,
  a {
    display: flex;
    justify-content: center;
  }
`;

const OrderTableDiv = styled.div`
  border: 1px solid #2f3336;
  width: auto;
  border-radius: 0px;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const OrderTableContainer = styled.table`
  width: 100%;
  padding: 0px;
  border-spacing: 0px;
  border-collapse: separate;
  caption-side: top;
`;

const OrderThead = styled.thead`
  border: none;
  tr {
    border-bottom: 1px solid #2f3336;
  }
`;

const OrderTheadItem = styled.th`
  padding: 16px 48px 16px 0px;
  border-bottom: none;
  text-align: center;
  :first-child {
    padding-left: 32px;
  }
  :nth-child(4) {
    padding-right: 56px;
  }
  :nth-child(5) {
    padding-right: 74px;
  }
  :nth-child(6) {
    padding-right: 60px;
  }
  :last-child {
    padding-right: 46px;
  }
`;
const OrderTbody = styled.tbody`
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

const NoData = styled(Link)`
  color: #d9d9d9;
  padding: 56px;
  cursor: pointer;
  :hover {
    color: #f6465d;
  }
`;

const OrderTable = () => {
  const [buyDatas, setBuyDatas] = useState([]);
  const [sellDatas, setSellDatas] = useState([]);
  const [coinLastPrice, setCoinLastPrice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const email = useContext(EmailContext);

  const renderThumb = ({ style }) => {
    const thumbStyle = {
      backgroundColor: "#2f3336",
      width: "3px",
      borderRadius: "3px",
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  };

  useEffect(() => {
    const getOrderData = async () => {
      if (email) {
        const orderDatas = await firebaseReadOrder(email);
        orderDatas.forEach((orderData) => {
          if (orderData.type === "buy") {
            setBuyDatas((buy) => [...buy, orderData]);
          } else if (orderData.type === "sell") {
            setSellDatas((sell) => [...sell, orderData]);
          }
        });
      }
      setIsLoading(false);
    };
    getOrderData();
  }, [email]);

  useEffect(() => {
    const getCoinPrice = async () => {
      const coinPrice = await getCoinLastPrice();
      setCoinLastPrice(coinPrice);
    };
    getCoinPrice();
  }, []);

  const renderLoadingAndTable = (array, type) => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan="7">
            <ClipLoader
              color="#f0b90b"
              loading={isLoading}
              css={override}
              size={40}
            />
          </td>
        </tr>
      );
    }
    if (array.length > 0) {
      if (type === "buy") {
        return <BuyTable buyDatas={buyDatas} coinLastPrice={coinLastPrice} />;
      }
      if (type === "sell") {
        return (
          <SellTable sellDatas={sellDatas} coinLastPrice={coinLastPrice} />
        );
      }
    }

    if (type === "buy") {
      return (
        <tr>
          <td colSpan="7">
            <NoData to="/explore">You haven&apos;t buy the data</NoData>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan="6">
          <NoData to="/explore">You haven&apos;t sell the data</NoData>
        </td>
      </tr>
    );
  };

  return (
    <>
      <OrderContainer>
        <OrderStyledContent>
          <OrderHeaderContainer>
            <OrderHeaderContent>
              <OrderHeaderContentContainer>
                <h1>
                  <span>Buy List</span>
                </h1>
              </OrderHeaderContentContainer>
            </OrderHeaderContent>
          </OrderHeaderContainer>
          <OrderSection>
            <OrderTableDiv>
              <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                renderThumbVertical={renderThumb}
                renderThumbHorizontal={renderThumb}
                style={{ width: "100%", height: "275px" }}
              >
                <OrderTableContainer>
                  <OrderThead>
                    <tr>
                      <OrderTheadItem>#</OrderTheadItem>
                      <OrderTheadItem>Time</OrderTheadItem>
                      <OrderTheadItem>Name</OrderTheadItem>
                      <OrderTheadItem>Buy Price</OrderTheadItem>
                      <OrderTheadItem>Price</OrderTheadItem>
                      <OrderTheadItem>Quantity</OrderTheadItem>
                      <OrderTheadItem>Balance</OrderTheadItem>
                    </tr>
                  </OrderThead>
                  <OrderTbody>
                    {renderLoadingAndTable(buyDatas, "buy")}
                  </OrderTbody>
                </OrderTableContainer>
              </Scrollbars>
            </OrderTableDiv>
          </OrderSection>
        </OrderStyledContent>
      </OrderContainer>

      <OrderContainer>
        <OrderStyledContent>
          <OrderHeaderContainer>
            <OrderHeaderContent>
              <OrderHeaderContentContainer>
                <h1>
                  <span>Sell List</span>
                </h1>
              </OrderHeaderContentContainer>
            </OrderHeaderContent>
          </OrderHeaderContainer>

          <OrderSection>
            <OrderTableDiv>
              <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                renderThumbVertical={renderThumb}
                renderThumbHorizontal={renderThumb}
                style={{ width: "100%", height: "275px" }}
              >
                <OrderTableContainer>
                  <OrderThead>
                    <tr>
                      <OrderTheadItem>#</OrderTheadItem>
                      <OrderTheadItem>Time</OrderTheadItem>
                      <OrderTheadItem>Name</OrderTheadItem>
                      <OrderTheadItem>Sell Price</OrderTheadItem>
                      <OrderTheadItem>Quantity</OrderTheadItem>
                      <OrderTheadItem>Total</OrderTheadItem>
                    </tr>
                  </OrderThead>
                  <OrderTbody>
                    {renderLoadingAndTable(sellDatas, "sell")}
                  </OrderTbody>
                </OrderTableContainer>
              </Scrollbars>
            </OrderTableDiv>
          </OrderSection>
        </OrderStyledContent>
      </OrderContainer>
    </>
  );
};

export default OrderTable;
