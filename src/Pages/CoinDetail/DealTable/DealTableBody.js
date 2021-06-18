import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { Scrollbars } from "react-custom-scrollbars-2";

const DealTableBodyContainer = styled.div`
  width: 100%;
`;

const TransionerContainer = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: none 0s ease 0s;
`;

const ModuleFade = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 1;
`;

const ModulSlide = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  transition: transform 350ms ease 0s;
  transform: translateX(0px);
`;

const DealTableToContainer = styled.div`
  width: 100%;
  border-right: 0px;
  border-left: 0px;
  margin-top: -1px;
  border-radius: 0px;
  height: 500px;
`;

const DealTabletoTable = styled.table`
  width: 100%;
  padding: 0px;
  border-spacing: 0px;
  border-collapse: separate;
  caption-side: top;
`;

const DealTableTbody = styled.tbody`
  padding: 0px;
  border: none;
  transition: opacity 300ms ease 0s;
  tr {
    user-select: none;
  }
`;

const DealTableTd = styled.td`
  border-top: 1px solid #2f3336;
  min-width: 140px;
  padding: 14px 24px 14px 0px;
  :first-child {
    padding-left: 24px;
  }
  :last-child {
    width: 250px;
    padding-right: 24px;
  }
`;

const DealTableTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h4 {
    line-height: 23px;
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    padding-left: 16px;
    span {
      color: #95a1bb;
    }
  }
`;

const DealTablePrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  h4 {
    line-height: 23px;
    font-size: 18px;
    font-weight: 400;
    :last-child {
      width: 100%;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    span {
      color: #95a1bb;
    }
  }
`;

const DealTableBody = () => {
  const [dealDatas, setDealDatas] = useState([]);
  const { symbol } = useParams();

  useEffect(() => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@aggTrade`
    );
    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setDealDatas((prev) => [eventData, ...prev.slice(0, 15)]);
    };

    return () => socket.close();
  }, [symbol]);

  const renderThumb = ({ style }) => {
    const thumbStyle = {
      backgroundColor: "#2f3336",
      width: "3px",
      borderRadius: "3px",
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  };

  const renderDealTable = () =>
    dealDatas.map((data) => {
      const date = new Date(data.E);
      const hours = date.getHours();
      const minutes = `0${date.getMinutes()}`;
      const seconds = `0${date.getSeconds()}`;
      return (
        <tr key={data.a}>
          <DealTableTd>
            <DealTableTime>
              <h4>{`${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`}</h4>
            </DealTableTime>
          </DealTableTd>
          <DealTableTd>
            <DealTablePrice>
              <h4>
                {Number(data.p).toLocaleString()} <span>USDT</span>
              </h4>
              <h4>
                {Number(data.q).toLocaleString()} <span>Qty</span>
              </h4>
            </DealTablePrice>
          </DealTableTd>
        </tr>
      );
    });

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      renderThumbVertical={renderThumb}
      autoHeight
      autoHeightMin={500}
    >
      <DealTableBodyContainer>
        <TransionerContainer>
          <ModuleFade>
            <ModulSlide>
              <DealTableToContainer>
                <DealTabletoTable>
                  <DealTableTbody>{renderDealTable()}</DealTableTbody>
                </DealTabletoTable>
              </DealTableToContainer>
            </ModulSlide>
          </ModuleFade>
        </TransionerContainer>
      </DealTableBodyContainer>
    </Scrollbars>
  );
};

export default DealTableBody;
