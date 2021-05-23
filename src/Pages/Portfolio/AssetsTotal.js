import React from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";

const AssetsContainer = styled.div`
  display: flex;
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 4px;
  ${space}
  ${color}
`;

const Account = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 1 1 0%;
  ${typography}
`;
const AccountTitle = styled.div`
  ${space}
  ${typography}
`;
const AccountBalance = styled.div``;

const Coin = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 1 1 0%;
  ${typography}
`;
const CoinTitle = styled.div`
  ${space}
  ${typography}
`;
const CoinProfitLoss = styled.div``;

const AssetsTotal = () => (
  <AssetsContainer bg="white" mb={4} py={2} px={3}>
    <Account fontFamily="Roboto" fontSize={16}>
      <AccountTitle fontWeight="bold" mb={3}>
        帳戶餘額
      </AccountTitle>
      <AccountBalance>123 USDT</AccountBalance>
    </Account>
    <Coin fontFamily="Roboto" fontSize={16}>
      <CoinTitle fontWeight="bold" mb={3}>
        貨幣盈餘
      </CoinTitle>
      <CoinProfitLoss>123 USDT</CoinProfitLoss>
    </Coin>
  </AssetsContainer>
);

export default AssetsTotal;
