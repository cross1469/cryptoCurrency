import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewsCard from "./NewsCard";

const NewsBg = styled.section`
  padding: 80px 0;
  text-align: center;
  background-color: #14151a;
  color: #d9d9d9;
`;
const NewsCotainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 60px;
  padding-right: 60px;
`;
const NewsTitle = styled.div`
  font-weight: 500;
  font-size: 36px;
  line-height: 1.2;
  margin-bottom: 30px;
`;
const NewsSubtitle = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  color: #95a1bb;
  margin-bottom: 60px;
`;

const NewsColumsContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  margin: 0 auto;
  padding: 0 65px;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsCardsContainer = styled.div`
  width: calc(33.33% - 50px);
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const NewsCardLink = styled.a`
  box-sizing: border-box;
  padding: 16px;
  display: block;
  color: #1e2329;
  position: relative;
  border-radius: 3px;
  box-shadow: rgb(0 0 0 / 4%) 0px 0px 20px 0px;
  text-decoration: none;
  cursor: pointer;
`;

const News = () => {
  const [newsHeadlines, setNewsHeadlines] = useState([]);

  const options = {
    method: "GET",
    url: "https://free-news.p.rapidapi.com/v1/search",
    params: { q: "Crypto", lang: "en" },
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_NEWS_APIKEY,
      "x-rapidapi-host": "free-news.p.rapidapi.com",
    },
  };

  const coinTopHeadline = () => {
    axios.request(options).then((res) => {
      const newsFourHeadline = res.data.articles.slice(0, 3);
      setNewsHeadlines(newsFourHeadline);
    });
  };

  const renderNewsHeadline = () =>
    newsHeadlines.map((news) => (
      <NewsCardsContainer key={news.title}>
        <NewsCardLink href={news.link}>
          <NewsCard
            newsTitle={news.title}
            newsDescription={news.summary}
            newsUrlToImage={news.media}
          />
        </NewsCardLink>
      </NewsCardsContainer>
    ));

  useEffect(() => {
    coinTopHeadline();
  }, []);

  return (
    <>
      <NewsBg>
        <NewsCotainer>
          <NewsTitle>
            <span>News</span>
          </NewsTitle>
          <NewsSubtitle>
            <span>You can get the latest cryptocurrency hot news here</span>
          </NewsSubtitle>
        </NewsCotainer>
        <NewsColumsContainer>{renderNewsHeadline()}</NewsColumsContainer>
      </NewsBg>
    </>
  );
};

export default News;
