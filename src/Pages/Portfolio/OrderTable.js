import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars-2";
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
      background-color: #2b2f36;
    }
  }
`;

const OrderTbodyItem = styled.td`
  padding: 14px 48px 14px 0px;
  border-top: 1px solid #2f3336;
  cursor: default;
  text-align: center;
  position: relative;
  width: 85px;
  :first-child {
    padding-left: 32px;
  }
  :nth-child(4),
  :nth-child(5) {
    min-width: 135px;
  }
  :nth-child(4),
  :nth-child(5),
  :nth-child(6),
  :nth-child(7) {
    text-align: right;
  }
  :last-child {
    padding-right: 32px;
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
`;

const OrderTbodySellItem = styled.td`
  padding: 14px 48px 14px 0px;
  border-top: 1px solid #2f3336;
  cursor: default;
  position: relative;
  text-align: center;
  width: 85px;
  :first-child {
    padding-left: 32px;
  }
  :nth-child(4) {
    min-width: 135px;
  }
  :last-child {
    padding-right: 32px;
  }
  :nth-child(4),
  :nth-child(5),
  :nth-child(6) {
    text-align: right;
  }
`;

const OrderTable = (props) => {
  const [buyDatas, setBuyDatas] = useState([]);
  const [sellDatas, setSellDatas] = useState([]);
  const [coinLastPrice, setCoinLastPrice] = useState([]);
  const { email } = props;

  const renderThumb = ({ style }) => {
    const thumbStyle = {
      backgroundColor: "#2f3336",
      width: "3px",
      borderRadius: "3px",
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  };

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
                {new Date(buyData.timestamp).toLocaleDateString("zh-TW", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </OrderTbodyItem>
              <OrderTbodyItem>{buyData.coinType}</OrderTbodyItem>
              <OrderTbodyItem>
                $ {Number(buyData.coinPrice).toLocaleString()}
              </OrderTbodyItem>
              <OrderTbodyItem>
                $ {Number(coinPrice.price).toLocaleString()}
              </OrderTbodyItem>
              <OrderTbodyItem>
                {Number(buyData.qty).toLocaleString()}
              </OrderTbodyItem>
              <OrderTbodyItem>
                {(
                  (Number(coinPrice.price - buyData.coinPrice) /
                    Number(coinPrice.price)) *
                  100
                ).toFixed(2)}
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
        <OrderTbodySellItem>{index + 1}</OrderTbodySellItem>
        <OrderTbodySellItem>
          {new Date(sellData.timestamp).toLocaleDateString("zh-TW", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })}
        </OrderTbodySellItem>
        <OrderTbodySellItem>{sellData.coinType}</OrderTbodySellItem>
        <OrderTbodySellItem>
          $ {Number(sellData.coinPrice).toLocaleString()}
        </OrderTbodySellItem>
        <OrderTbodySellItem>
          {Number(sellData.qty).toLocaleString()}
        </OrderTbodySellItem>
        <OrderTbodySellItem>
          {Number(sellData.coinPrice * sellData.qty).toLocaleString()}
        </OrderTbodySellItem>
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
                  <OrderTbody>{renderBuyTable()}</OrderTbody>
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
                style={{ width: "100%", height: "138px" }}
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
                  <OrderTbody>{renderSellTable()}</OrderTbody>
                </OrderTableContainer>
              </Scrollbars>
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
