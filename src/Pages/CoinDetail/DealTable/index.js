import React from "react";
import styled from "styled-components";
import DealTableBody from "./DealTableBody";

const DealTableContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  flex-direction: column;
`;

const DealTableContenContainer = styled.div`
  width: 100%;
`;

const DealTableHeaderContainer = styled.div`
  position: relative;
  padding: 0px 24px;
  margin-top: 32px;
  z-index: 1;
  margin-bottom: -1px;
  transition: border-bottom-color 300ms ease 0s;
  border-bottom: 1px solid #2f3336;
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

const DealTableTitleContainer = styled.div`
  display: flex;
  padding-bottom: 36px;
  margin-top: 16px;
`;

const DealTableTitle = styled.div`
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  h1 {
    font-size: 24px;
    font-weight: 500;
    margin: 8px 0px 0px;
  }
`;

const DealTable = () => (
  <DealTableContainer>
    <DealTableContenContainer>
      <DealTableHeaderContainer>
        <TransionerContainer>
          <ModuleFade>
            <DealTableTitleContainer>
              <DealTableTitle>
                <h1>Trades</h1>
              </DealTableTitle>
            </DealTableTitleContainer>
          </ModuleFade>
        </TransionerContainer>
      </DealTableHeaderContainer>
      <DealTableBody />
    </DealTableContenContainer>
  </DealTableContainer>
);

export default DealTable;
