import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { readWishList } from "../../Utils/firebase";
import defaultNewsImg from "../../images/defaultNews.jpg";
import { EmailContext } from "../../context/Context";

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

const YourNewsContentTop = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 56px 44px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const YourNewsContentTopLink = styled.a`
  height: 100%;
  min-width: 0px;
  grid-column-end: span 1;
  grid-row-end: span 1;
  cursor: pointer;
  color: inherit;
  font-size: inherit;
  transition: color 0.25s ease 0s;
  :hover {
    color: #f0b90b;
  }
`;

const YourNewsTopContent = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  gap: 16px 44px;
`;

const YourNewsTopImageContainer = styled.div`
  height: 100%;
  min-width: 0px;
  grid-column-end: span 1;
  grid-row-end: span 1;
`;

const YourNewsTopImage = styled.div`
  position: relative;
  width: 100%;
  height: 0px;
  padding-top: calc(57.1429%);
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    object-fit: cover;
    border-style: none;
  }
`;

const YourNewsTopBottomContent = styled.div`
  height: 100%;
  min-width: 0px;
  grid-column-end: span 1;
  grid-row-end: span 1;
`;

const YourNewsTopBottomContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  gap: 8px 44px;
  h2 {
    margin: 0px;
    font-size: 28px;
    line-height: 36px;
    font-weight: 500;
  }
  p {
    margin: 0px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: #95a1bb;
  }
`;

const YourNewsContentBottom = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 56px 44px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const YourNewsContentBottomLink = styled.a`
  height: 100%;
  min-width: 0px;
  grid-column-end: span 1;
  grid-row-end: span 1;
  cursor: pointer;
  color: inherit;
  font-size: inherit;
  text-decoration: none;
  transition: color 0.25s ease 0s;
  :hover {
    color: #f0b90b;
  }
`;

const YourNewsBottomContent = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  gap: 16px 44px;
`;

const YourNewsBottomTopImg = styled.div`
  height: 100%;
  min-width: 0px;
  grid-column-end: span 1;
  grid-row-end: span 1;
`;

const YourNewsBottomTopImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0px;
  padding-top: calc(133.333%);
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    object-fit: cover;
  }
`;

const YourNewsBottomBottomTitle = styled.div`
  height: 100%;
  min-width: 0px;
  grid-column-end: span 1;
  grid-row-end: span 1;
`;

const YourNewsBottomBottomContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  gap: 8px 44px;
  h3 {
    margin: 0px;
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
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
    const options = {
      method: "GET",
      url: "https://free-news.p.rapidapi.com/v1/search",
      params: { q: wishStr, lang: "en" },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_NEWS_APIKEY,
        "x-rapidapi-host": "free-news.p.rapidapi.com",
      },
    };

    if (wishStr) {
      axios.request(options).then((res) => {
        const newsFourHeadline = res.data.articles.slice(0, 6);
        setNewsHeadlines(newsFourHeadline);
      });
    }
  }, [wishStr]);

  const renderYourNewsTop = () =>
    newsHeadlines.slice(0, 2).map((news) => (
      <YourNewsContentTopLink key={news.summary} href={news.link}>
        <YourNewsTopContent>
          <YourNewsTopImageContainer>
            <YourNewsTopImage>
              <picture>
                <source media="(max-width: 560px)" />
                <img
                  src={
                    news.media === "" || news.media === null
                      ? defaultNewsImg
                      : news.media
                  }
                  alt={news.title}
                  loading="lazy"
                />
              </picture>
            </YourNewsTopImage>
          </YourNewsTopImageContainer>
          <YourNewsTopBottomContent>
            <YourNewsTopBottomContainer>
              <h2>{news.title}</h2>
              <p>{news.summary}</p>
            </YourNewsTopBottomContainer>
          </YourNewsTopBottomContent>
        </YourNewsTopContent>
      </YourNewsContentTopLink>
    ));

  const renderYourNewsButtom = () =>
    newsHeadlines.slice(2, 6).map((news) => (
      <YourNewsContentBottomLink key={news.summary} href={news.link}>
        <YourNewsBottomContent>
          <YourNewsBottomTopImg>
            <YourNewsBottomTopImgContainer>
              <picture>
                <source media="(max-width: 560px)" />
                <img
                  src={
                    news.media === "" || news.media === null
                      ? defaultNewsImg
                      : news.media
                  }
                  alt={news.title}
                  loading="lazy"
                />
              </picture>
            </YourNewsBottomTopImgContainer>
          </YourNewsBottomTopImg>
          <YourNewsBottomBottomTitle>
            <YourNewsBottomBottomContainer>
              <h4>{news.title}</h4>
            </YourNewsBottomBottomContainer>
          </YourNewsBottomBottomTitle>
        </YourNewsBottomContent>
      </YourNewsContentBottomLink>
    ));

  return (
    <YourNewsSection>
      <YourNewsCardsContainer>
        <YourNewsGrid>
          <YourNewsTitleContainer>
            <h2>Your News</h2>
            <p>Welcome to check out the news dedicated to you!</p>
          </YourNewsTitleContainer>

          <YourNewsContentContainer>
            {JSON.stringify(newsHeadlines) === "[]" ? (
              <Link to="/explore">
                <NoNewsBtn>Add to wishLsist</NoNewsBtn>
              </Link>
            ) : (
              <>
                <YourNewsContentTop>{renderYourNewsTop()}</YourNewsContentTop>
                <YourNewsContentBottom>
                  {renderYourNewsButtom()}
                </YourNewsContentBottom>
              </>
            )}
          </YourNewsContentContainer>
        </YourNewsGrid>
      </YourNewsCardsContainer>
    </YourNewsSection>
  );
};

export default YourNews;
