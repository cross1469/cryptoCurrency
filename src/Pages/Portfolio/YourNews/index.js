import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { readWishList } from "../../../Utils/firebase";
import { EmailContext } from "../../../context/Context";
import { getCoinNews } from "../../../Utils/api";
import YourNewsTop from "./YourNewsTop";
import YourNewsBottom from "./YourNewsBottom";

const override = css`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const YourNewsSection = styled.section`
  border-top: 1px solid #2f3336;
  margin-top: 88px;
  color: #d9d9d9;
`;

const YourNewsCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0px auto;
  padding: 88px 16px;
  @media only screen and (max-width: 768px) {
    padding-top: 32px;
  }
`;

const YourNewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  gap: 88px 44px;
`;

const YourNewsTitleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  gap: 4px 44px;
  text-align: center;
  h2 {
    margin: 0px;
    font-size: 44px;
    line-height: 52px;
    font-weight: 700;
  }
  p {
    margin: 0px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: #95a1bb;
  }
`;

const YourNewsContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  gap: 56px 44px;
  a {
    display: flex;
    justify-content: center;
  }
`;

const NoNewsBtn = styled.button`
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

const YourNews = () => {
  const [wishStr, setWishStr] = useState("");
  const [newsHeadlines, setNewsHeadlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const email = useContext(EmailContext);

  useEffect(() => {
    const getWishListData = async () => {
      if (email) {
        const wishListData = await readWishList(email);
        const wishString = wishListData
          .toString()
          .replace(/USDT/g, "")
          .replace(/,/g, " || ");
        setWishStr(wishString);
      }
    };
    getWishListData();
  }, [email]);

  useEffect(() => {
    if (wishStr) {
      const getNews = async () => {
        const coinNews = await getCoinNews(wishStr);
        setNewsHeadlines(coinNews);
        setIsLoading(false);
      };
      getNews();
    }
  }, [wishStr]);

  const renderLoadingAndYourNews = () => {
    if (isLoading) {
      return (
        <ClipLoader
          color="#f0b90b"
          loading={isLoading}
          css={override}
          size={40}
        />
      );
    }
    if (newsHeadlines.length > 0) {
      return (
        <>
          <YourNewsTop newsHeadlines={newsHeadlines} />
          <YourNewsBottom newsHeadlines={newsHeadlines} />
        </>
      );
    }
    return (
      <Link to="/explore">
        <NoNewsBtn>Add to wishList</NoNewsBtn>
      </Link>
    );
  };

  return (
    <YourNewsSection>
      <YourNewsCardsContainer>
        <YourNewsGrid>
          <YourNewsTitleContainer>
            <h2>Your News</h2>
            <p>Welcome to check out the news dedicated to you!</p>
          </YourNewsTitleContainer>

          <YourNewsContentContainer>
            {renderLoadingAndYourNews()}
          </YourNewsContentContainer>
        </YourNewsGrid>
      </YourNewsCardsContainer>
    </YourNewsSection>
  );
};

export default YourNews;
