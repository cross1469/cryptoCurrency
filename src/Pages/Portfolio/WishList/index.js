import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { readWishList } from "../../../Utils/firebase";
import { ReactComponent as Right } from "../../../images/next.svg";
import MobileWishList from "./MobileWishList";
import { EmailContext } from "../../../context/Context";
import { getUsdtCoinData } from "../../../Utils/api";
import WishListItems from "./WishListItems";

const override = css`
  display: flex;
  justify-content: center;
`;

const LoadingContainer = styled.div`
  padding: 122px;
  margin: 0 auto;
`;

const WishListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #14151a;
  margin-bottom: 22px;
  border-radius: 4px;
  border: 1px solid #2f3336;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const WishHeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 32px;
`;

const WishHeaderContent = styled.div`
  flex: 1 1 0%;
`;

const WishHeaderContentContainer = styled.div`
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
      color: #d9d9d9;
    }
  }
`;

const WishListBody = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const WishListBodyContainer = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: none 0s ease 0s;
`;

const WishListBodyModule = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 1;
`;

const WishListChartLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-style: solid;
  border-width: 0;
`;

const WishListBottom = styled.div`
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
    cursor: pointer;
  }
`;

const WishListBottomContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  height: 54px;
  border-top: 1px solid #2f3336;
  font-weight: 500;
  transition: all 0.25s ease 0s;
  cursor: pointer;
  color: #d9d9d9;
  fill: #d9d9d9;
  svg {
    width: 10px;
    height: 10px;
    margin-top: 2px;
    margin-left: 6px;
  }
  :hover {
    fill: #f0b90b;
    color: #f0b90b;
    transition: all 0.25s ease 0s;
  }
`;

const DisplayMobileWishList = styled(MobileWishList)`
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const [coinLastPrice, setCoinLastPrice] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = useContext(EmailContext);

  useEffect(() => {
    const getWishListData = async () => {
      if (email) {
        const wishListData = await readWishList(email);
        setWishList(wishListData);
      }
    };
    getWishListData();
  }, [email]);

  useEffect(() => {
    const getLastPrice = async () => {
      const coinPrice = await getUsdtCoinData();
      setCoinLastPrice(coinPrice.usdtLastPrice);
      setLoading(false);
    };
    getLastPrice();
  }, []);

  return (
    <section>
      <WishHeaderContainer>
        <WishHeaderContent>
          <WishHeaderContentContainer>
            <h1>
              <span>WishList</span>
            </h1>
          </WishHeaderContentContainer>
        </WishHeaderContent>
      </WishHeaderContainer>

      <WishListContainer>
        <WishListBody>
          <WishListBodyContainer>
            <WishListBodyModule>
              <WishListChartLayout>
                {coinLastPrice.length > 0 ? (
                  <WishListItems
                    wishList={wishList}
                    coinLastPrice={coinLastPrice}
                  />
                ) : (
                  <LoadingContainer>
                    <ClipLoader
                      color="#f0b90b"
                      loading={loading}
                      css={override}
                      size={40}
                    />
                  </LoadingContainer>
                )}
              </WishListChartLayout>
            </WishListBodyModule>
          </WishListBodyContainer>
        </WishListBody>
        <WishListBottom>
          <Link to="/explore">
            <WishListBottomContent>
              Discover more assets
              <Right />
            </WishListBottomContent>
          </Link>
        </WishListBottom>
      </WishListContainer>
      <DisplayMobileWishList
        wishList={wishList}
        coinLastPrice={coinLastPrice}
        loading={loading}
      />
    </section>
  );
};

export default WishList;
