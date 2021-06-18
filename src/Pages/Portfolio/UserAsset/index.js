import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { firebaseReadAsset } from "../../../Utils/firebase";
import DashboardLoader from "../../../component/loader/DashboardLoader";
import { EmailContext } from "../../../context/Context";
import { getUsdtCoinData } from "../../../Utils/api";
import UserAssetCard from "./UserAssetCard";

const UserAssetContainer = styled.div`
  background-color: #14151a;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  flex-direction: column;
  padding: 48px 0;
  @media only screen and (max-width: 768px) {
    padding: 32px 0;
  }
`;

const UserAssetWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
`;

const UserAssetTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: #d9d9d9;
  min-height: 28px;
  width: 100%;
  margin-bottom: 24px;
  span {
    white-space: nowrap;
    font-size: 24px;
  }
`;

const NoDataBtn = styled.button`
  padding: 16px 24px;
  font-size: 16px;
  cursor: pointer;
  width: 180px;
  border-radius: 4px;
  font-family: "Exo 2", sans-serif;
  background-color: #f0b90b;
  :hover {
    background-color: #ffe251;
  }
`;

const NoDataContainer = styled.div`
  margin: 85px 0px;
`;

const UserAsset = () => {
  const [coinLastPrice, setCoinLastPrice] = useState([]);
  const [userAsset, setUserAsset] = useState([]);
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
    const getCoinPrice = async () => {
      const coinPrice = await getUsdtCoinData();
      setCoinLastPrice(coinPrice.usdtLastPrice);
      setIsLoading(false);
    };
    getCoinPrice();
  }, []);

  useEffect(() => {
    const getUserAsset = async () => {
      if (email) {
        const asset = await firebaseReadAsset(email);
        setUserAsset(asset);
      }
    };
    getUserAsset();
  }, [email]);

  const renderLoadingAndAsset = () => {
    if (isLoading) {
      return <DashboardLoader />;
    }
    if (userAsset.length > 0) {
      return (
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          renderThumbHorizontal={renderThumb}
          style={{ width: "100%", height: "220px" }}
        >
          <UserAssetCard userAsset={userAsset} coinLastPrice={coinLastPrice} />
        </Scrollbars>
      );
    }
    return (
      <NoDataContainer>
        <Link to="/explore">
          <NoDataBtn>See all assets</NoDataBtn>
        </Link>
      </NoDataContainer>
    );
  };

  return (
    <UserAssetContainer>
      <UserAssetWrapper>
        <UserAssetTitleContainer>
          <span>My cryptocurrencies</span>
        </UserAssetTitleContainer>
        {renderLoadingAndAsset()}
      </UserAssetWrapper>
    </UserAssetContainer>
  );
};

export default UserAsset;
