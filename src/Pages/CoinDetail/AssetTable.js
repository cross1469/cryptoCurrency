import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import styled from "styled-components";
import { firebaseReadCoinAsset } from "../../Utils/firebase";

const AssetContainer = styled.section`
  width: 100%;
  padding-bottom: 24px;
  padding-top: 24px;
`;

const AssetInnerCard = styled.div`
  display: flex;
  flex: 1 1 auto;
  position: relative;
  flex-direction: column;
  border: 1px solid rgb(236, 239, 241);
  border-radius: 4px;
  box-shadow: rgb(17 51 83 / 2%) 0px 4px 12px 0px;
  overflow: hidden;
`;

const AssetTableTile = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  position: relative;
  padding: 16px 24px;
  border-bottom: 1px solid rgb(236, 239, 241);
  border-top: none;
  flex-shrink: 0;
  h3 {
    display: block;
    margin: 0px;
    font-size: 24px;
    font-weight: 500;
    font-variant: tabular-nums;
  }
`;

const AssetTrnsitioner = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: none 0s ease 0s;
`;

const AssetModuleFade = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 1;
`;

const AssetTableWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const AssetTableColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: initial;
  overflow: hidden;
  width: unset;
  flex-shrink: 1;
  @media only screen and (max-width: 768px) {
    width: 45%;
  }
`;

const AssetTableContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 0px 16px;
  height: 75px;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  @media only screen and (max-width: 768px) {
    padding: 0px 24px;
  }
  h4 {
    line-height: 23px;
    font-size: 18px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AssetTable = (props) => {
  const { symbol } = useParams();
  const coin = symbol.replace(/USDT/, "");
  const { email } = props;
  const [coinData, setCoinData] = useState({ profitLoss: "", qty: "" });

  const getUserCoinAsset = async () => {
    if (email) {
      const coinAsset = await firebaseReadCoinAsset(email, coin);
      setCoinData(coinAsset);
    }
  };

  useEffect(() => {
    getUserCoinAsset();
  }, [email]);

  return (
    <AssetContainer>
      <AssetInnerCard>
        <AssetTableTile>
          <h3>Coin asset</h3>
        </AssetTableTile>
        <AssetTrnsitioner>
          <AssetModuleFade>
            <AssetTableWrapper>
              <AssetTableColumn>
                <AssetTableContainer>
                  <h4>{coin}</h4>
                </AssetTableContainer>
              </AssetTableColumn>
              <AssetTableColumn>
                <AssetTableContainer>
                  <h4>
                    {coinData ? Number(coinData.qty).toFixed(2) : 0} {coin}
                  </h4>
                </AssetTableContainer>
              </AssetTableColumn>
            </AssetTableWrapper>
          </AssetModuleFade>
        </AssetTrnsitioner>
      </AssetInnerCard>
    </AssetContainer>
  );
};

AssetTable.propTypes = {
  email: PropTypes.string.isRequired,
};

export default AssetTable;
