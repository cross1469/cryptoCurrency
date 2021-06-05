import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import { firebaseReadOrder } from "../../Utils/firebase";

const OrderContainer = styled.div`
  color: #fff;
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
`;

const OrderTableDiv = styled.div`
  border: 1px solid rgb(236, 239, 241);
  width: auto;
  border-radius: 0px;
  overflow-x: auto;
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
    border-bottom: 1px solid rgb(236, 239, 241);
  }
`;

const OrderTheadItem = styled.th`
  padding: 16px 48px 16px 0px;
  border-bottom: none;
  text-align: left;
  :first-child {
    padding-left: 32px;
  }
  :last-child {
    padding-right: 32px;
  }
`;
const OrderTbody = styled.tbody`
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

const OrderTbodyItem = styled.td`
  padding: 14px 48px 14px 0px;
  border-top: 1px solid rgb(236, 239, 241);
  cursor: default;
  position: relative;
  width: 85px;
  :first-child {
    padding-left: 32px;
  }
  :last-child {
    padding-right: 32px;
  }
`;

const OrderTable = (props) => {
  const [buyDatas, setBuyDatas] = useState([]);
  const [sellDatas, setSellDatas] = useState([]);
  const [coinLastPrice, setCoinLastPrice] = useState([]);
  const { email } = props;

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
  };

  const getLastPrice = () =>
    axios
      .get(
        `https://us-central1-cryptocurrency-0511.cloudfunctions.net/binanceAPI/portfolio`
      )
      .then((res) => {
        const usdtLastPrice = [];
        res.data.forEach((data) => {
          if (data.symbol.indexOf("USDT", 2) !== -1) {
            usdtLastPrice.push(data);
          }
        });
        setCoinLastPrice(usdtLastPrice);
      });

  const renderBuyTable = () => {
    buyDatas.sort((a, b) => a.timestamp - b.timestamp);

    return buyDatas.map((buyData, index) =>
      coinLastPrice.map((coinPrice) => {
        const symbol = coinPrice.symbol.replace(/USDT/, "");

        if (symbol === buyData.coinType) {
          return (
            <tr key={buyData.timestamp}>
              <OrderTbodyItem>
                <h4>{index + 1}</h4>
              </OrderTbodyItem>
              <OrderTbodyItem>
                {new Date(buyData.timestamp).toLocaleDateString()}
              </OrderTbodyItem>
              <OrderTbodyItem>{buyData.coinType}</OrderTbodyItem>
              <OrderTbodyItem>$ {buyData.coinPrice}</OrderTbodyItem>
              <OrderTbodyItem>
                $ {Number(coinPrice.price).toFixed(2)}
              </OrderTbodyItem>
              <OrderTbodyItem>{buyData.qty}</OrderTbodyItem>
              <OrderTbodyItem>
                {" "}
                {(
                  (Number(coinPrice.price - buyData.coinPrice) /
                    Number(coinPrice.price)) *
                  100
                ).toFixed(2)}{" "}
                %
              </OrderTbodyItem>
            </tr>
          );
        }
        return null;
      })
    );
  };

  const renderSellTable = () => {
    sellDatas.sort((a, b) => a.timestamp - b.timestamp);
    return sellDatas.map((sellData, index) => (
      <tr key={sellData.timestamp}>
        <OrderTbodyItem>{index + 1}</OrderTbodyItem>
        <OrderTbodyItem>
          {new Date(sellData.timestamp).toLocaleDateString()}
        </OrderTbodyItem>
        <OrderTbodyItem>{sellData.coinType}</OrderTbodyItem>
        <OrderTbodyItem>$ {sellData.coinPrice}</OrderTbodyItem>
        <OrderTbodyItem>{sellData.qty}</OrderTbodyItem>
        <OrderTbodyItem>
          $ {Number(sellData.coinPrice * sellData.qty).toFixed(2)}
        </OrderTbodyItem>
      </tr>
    ));
  };

  useEffect(() => {
    getOrderData();
  }, [email]);

  useEffect(() => {
    getLastPrice();
  }, []);

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
                <OrderTbody>{renderBuyTable()}</OrderTbody>
              </OrderTableContainer>
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
                <OrderTbody>{renderSellTable()}</OrderTbody>
              </OrderTableContainer>
            </OrderTableDiv>
          </OrderSection>
        </OrderStyledContent>
      </OrderContainer>
    </>
  );
};

OrderTable.propTypes = {
  email: PropTypes.string.isRequired,
};

export default OrderTable;
