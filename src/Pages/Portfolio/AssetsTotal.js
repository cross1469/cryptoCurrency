import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as Info } from "../../images/information.svg";
import { firebaseReadCoinAsset, firebaseReadAsset } from "../../Utils/firebase";

const AssetsContainer = styled.div`
  margin-top: 32px;
  color: #fff;
  margin-bottom: 32px;
  border-bottom: 1px solid #fff;
`;

const AssetTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const AssetTitle = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  border-bottom: 1px solid #fff;
  span {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    margin: 0;
    text-transform: uppercase;
  }
`;

const AssetTableContainer = styled.div`
  margin: 0px;
  min-width: 0px;
  display: flex;
  border-radius: 0px;
  padding: 8px 16px;
`;

const AssetTableContent = styled.div`
  justify-content: space-around;
  margin: 0px;
  min-width: 0px;
  display: flex;
  flex-flow: column wrap;
  flex: 1 1 0%;
  flex-direction: row;
  @media only screen and (max-width: 576px) {
    flex-direction: column;
  }
`;

const AccountBalanceContainer = styled.div`
  margin: 16px 32px 16px 0px;
  min-width: 0px;
  @media only screen and (max-width: 768px) {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

const AccountBalanceTitle = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  align-items: center;
  span {
    margin: 0px;
    min-width: 0px;
    font-size: 14px;
    line-height: 18px;
  }
`;

const AccountBalanceQty = styled.div`
  margin: 0px;
  min-width: 0px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  span {
    font-size: 32px;
    line-height: 42px;
    :last-child {
      font-size: 14px;
      line-height: 28px;
    }
  }
`;

const AccountPNLContainer = styled.div`
  margin: 16px 49px 16px 0px;
  min-width: 0px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

const AccountPNLTitle = styled.div`
  margin: 0px;
  min-width: 0px;
  font-size: 14px;
  line-height: 18px;
`;

const AccountPNLInfo = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: inline-block;
  position: relative;
  svg {
    margin: 0px 0px 0px 5px;
    position: relative;
    top: 3px;
    width: 16px;
    height: 16px;
    fill: #fff;
  }
`;

const AccountPNLPrice = styled.div`
  margin: 0px;
  min-width: 0px;
  display: flex;
  align-items: flex-end;
  span {
    font-size: 32px;
    line-height: 42px;
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
  @media only screen and (max-width: 768px) {
    align-items: flex-start;
  }
`;

const AssetsTotal = (props) => {
  const [usdt, setUsdt] = useState({ profitLoss: null, qty: null });
  const [profitLoss, setProfitLoss] = useState(0);
  const { email } = props;

  const getAssetData = async () => {
    if (email) {
      const usdtData = await firebaseReadCoinAsset(email, "USDT");
      const coinProfitLoss = await firebaseReadAsset(email);
      let coinAllprofitLoss = 0;
      coinProfitLoss.forEach((coin) => {
        if (coin.coinType !== "USDT") {
          coinAllprofitLoss += coin.profitLoss;
        }
      });
      setProfitLoss(coinAllprofitLoss);
      setUsdt(usdtData);
    }
  };

  useEffect(() => {
    getAssetData();
  }, [email]);

  return (
    <AssetsContainer>
      <AssetTitleContainer>
        <AssetTitle>
          <span>Portfolio Balance</span>
        </AssetTitle>
      </AssetTitleContainer>
      <AssetTableContainer>
        <AssetTableContent>
          <AccountBalanceContainer>
            <AccountBalanceTitle>
              <span>Account balance</span>
            </AccountBalanceTitle>
            <AccountBalanceQty>
              <span>{Number(usdt.qty).toLocaleString()}</span>
              <span>USDT</span>
            </AccountBalanceQty>
          </AccountBalanceContainer>
          <AccountPNLContainer>
            <AccountPNLTitle>
              Yesterday&apos;s PNL
              <AccountPNLInfo>
                <Info />
              </AccountPNLInfo>
            </AccountPNLTitle>
            <AccountPNLPrice>
              <span>{Number(profitLoss).toLocaleString()} %</span>
            </AccountPNLPrice>
          </AccountPNLContainer>
        </AssetTableContent>
      </AssetTableContainer>
    </AssetsContainer>
  );
};

AssetsTotal.propTypes = {
  email: PropTypes.string.isRequired,
};

export default AssetsTotal;
