import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { color, space, typography } from "styled-system";

import { firebaseReadCoinAsset, readCoinAsset } from "../../Utils/firebase";

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

const AssetsTotal = (props) => {
  const [usdt, setUsdt] = useState({ profitLoss: null, qty: null });
  const { email } = props;

  const getUSDTAssetData = async () => {
    if (email) {
      const usdtData = await firebaseReadCoinAsset(email, "USDT");
      setUsdt(usdtData);
    }
  };

  const read = async () => {
    const data = await readCoinAsset();
    console.log(data);
  };

  useEffect(() => {
    getUSDTAssetData();
    read();
  }, [email]);

  return (
    <AssetsContainer bg="white" mb={4} py={2} px={3}>
      <Account fontFamily="Roboto" fontSize={16}>
        <AccountTitle fontWeight="bold" mb={3}>
          帳戶餘額
        </AccountTitle>
        <AccountBalance>{usdt.qty} USDT</AccountBalance>
      </Account>
      <Coin fontFamily="Roboto" fontSize={16}>
        <CoinTitle fontWeight="bold" mb={3}>
          貨幣盈餘
        </CoinTitle>
        <CoinProfitLoss>123 USDT</CoinProfitLoss>
      </Coin>
    </AssetsContainer>
  );
};

AssetsTotal.propTypes = {
  email: PropTypes.string.isRequired,
};

export default AssetsTotal;
