import axios from "axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space, typography, flexbox, layout } from "styled-system";
import YourNewsCard from "./YourNewsCard";
import { readWishList } from "../../Utils/firebase";

const YourNewsTitle = styled.div`
  ${space}
  ${typography}
`;

const YourNewsCardsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  ${space}
`;

const YourNewsCardsSection = styled.div`
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

const YourNewsCardItem = styled.div`
  box-sizing: border-box;
  ${space}
  ${flexbox}
  ${layout}
`;

const YourNewsCardLink = styled.a`
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

const YourNews = (props) => {
  const [wishStr, setWishStr] = useState("");
  const [newsHeadlines, setNewsHeadlines] = useState([]);
  const { email } = props;

  const coinTopHeadline = () => {
    if (wishStr) {
      axios
        .get(
          `https://newsapi.org/v2/everything?q=${wishStr}&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWS_APIKEY}`
        )
        .then((res) => {
          const newsFourHeadline = res.data.articles.slice(0, 4);
          setNewsHeadlines(newsFourHeadline);
        });
    }
  };

  const getWishListData = async () => {
    if (email) {
      const wishListData = await readWishList(email);
      const wishString = wishListData
        .toString()
        .replace(/USDT/g, "")
        .replace(/,/g, " OR ");
      setWishStr(wishString);
    }
  };

  const renderNewsHeadline = () =>
    newsHeadlines.map((news) => (
      <YourNewsCardItem
        px={{ sm: 0, md: "12px", lg: "8px" }}
        pb={{ sm: "16px", md: "24px", lg: 0 }}
        width={{ sm: "100%", md: "50%", lg: "auto" }}
        flex={{ sm: "none", md: "none", lg: 1 }}
      >
        <YourNewsCardLink href={news.url}>
          <YourNewsCard
            newsTitle={news.title}
            newsDescription={news.description}
            newsUrlToImage={news.urlToImage}
          />
        </YourNewsCardLink>
      </YourNewsCardItem>
    ));

  useEffect(() => {
    getWishListData();
    coinTopHeadline();
  }, [email, wishStr]);

  return (
    <YourNewsCardsContainer>
      <YourNewsTitle
        fontFamily="Roboto"
        fontWeight="bold"
        fontSize={28}
        lineHeight="36px"
        pl={3}
      >
        Your News
      </YourNewsTitle>
      <YourNewsCardsSection
        px={{ sm: "16px", md: "4px", lg: "24px" }}
        py="24px"
      >
        <FlexBox mb={{ sm: "-16px", md: "-24px", lg: 0 }}>
          {renderNewsHeadline()}
        </FlexBox>
      </YourNewsCardsSection>
    </YourNewsCardsContainer>
  );
};

YourNews.propTypes = {
  email: PropTypes.string.isRequired,
};

export default YourNews;
