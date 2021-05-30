import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, space, typography, flexbox, layout } from "styled-system";
import NewsCard from "./NewsCard";

const NewsBg = styled.div`
  ${color}
  ${space}
`;
const NewsCotainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const NewsTitle = styled.div`
  ${color}
  ${space}
  ${typography}
`;
const NewsSubtitle = styled.div`
  ${color}
  ${space}
  ${typography}
`;

const NewsCardsContainer = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  ${space}
`;

const NewsCardsSection = styled.div`
  box-sizing: border-box;
`;

const FlexBox = styled.div`
  box-sizing: border-box;
  margin: 0;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  font-size: 12px;
  flex-wrap: wrap;
  flex-direction: row;
  ${space}
`;

const NewsCardItem = styled.div`
  box-sizing: border-box;
  ${space}
  ${flexbox}
  ${layout}
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
        `https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&language=en&apiKey=${process.env.REACT_APP_NEWS_APIKEY}`
      )
      .then((res) => {
        const newsFourHeadline = res.data.articles.slice(0, 4);
        setNewsHeadlines(newsFourHeadline);
      });
  };

  const renderNewsHeadline = () =>
    newsHeadlines.map((news) => (
      <NewsCardItem
        px={{ sm: 0, md: "12px", lg: "8px" }}
        pb={{ sm: "16px", md: "24px", lg: 0 }}
        width={{ sm: "100%", md: "50%", lg: "auto" }}
        flex={{ sm: "none", md: "none", lg: 1 }}
        key={news.publishedAt}
      >
        <NewsCardLink href={news.url}>
          <NewsCard
            newsTitle={news.title}
            newsDescription={news.description}
            newsUrlToImage={news.urlToImage}
          />
        </NewsCardLink>
      </NewsCardItem>
    ));

  useEffect(() => {
    coinTopHeadline();
  }, []);

  return (
    <>
      <NewsBg
        bg="black"
        px={{ _: "12px", sm: "24px", md: "36px" }}
        py={{ _: "70px", lg: "100px" }}
      >
        <NewsCotainer>
          <NewsTitle
            color="white"
            fontFamily="Roboto"
            fontSize={36}
            lineHeight="48px"
            mb={3}
            fontWeight="bold"
            letterSpacing={1}
          >
            News
          </NewsTitle>
          <NewsSubtitle
            color="white"
            fontFamily="Roboto"
            fontSize={28}
            lineHeight="36px"
            mb={3}
            letterSpacing={1}
          >
            熱門新聞快訊
          </NewsSubtitle>
        </NewsCotainer>
        <NewsCardsContainer>
          <NewsCardsSection
            px={{ sm: "16px", md: "4px", lg: "24px" }}
            py="24px"
          >
            <FlexBox mb={{ sm: "-16px", md: "-24px", lg: 0 }}>
              {renderNewsHeadline()}
            </FlexBox>
          </NewsCardsSection>
        </NewsCardsContainer>
      </NewsBg>
    </>
  );
};

export default News;
