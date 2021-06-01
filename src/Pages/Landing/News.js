import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewsCard from "./NewsCard";

const NewsBg = styled.section`
  padding: 80px 0;
  text-align: center;
  background-color: #181a20;
  color: #fff;
`;
const NewsCotainer = styled.div`
  max-width: 1200px;
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
  display: flex;
  padding: 0 65px;
  justify-content: space-between;
`;

const NewsCardsContainer = styled.div`
  width: calc(33.33% - 50px);
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
  const coinTopHeadline = () => {
    axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?facet=true&facet_fields=day_of_week&fq=coin&q=crypto&sort=newest&api-key=${process.env.REACT_APP_NEWS_APIKEY}`
      )
      .then((res) => {
        const newsFourHeadline = res.data.response.docs.slice(0, 3);
        setNewsHeadlines(newsFourHeadline);
      });
  };

  const renderNewsHeadline = () =>
    newsHeadlines.map((news) => (
      <NewsCardsContainer key={news.pub_date}>
        <NewsCardLink href={news.web_url}>
          <NewsCard
            newsTitle={news.headline.main}
            newsDescription={news.abstract}
            newsUrlToImage={`https://www.nytimes.com/${news.multimedia[0].url}`}
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
