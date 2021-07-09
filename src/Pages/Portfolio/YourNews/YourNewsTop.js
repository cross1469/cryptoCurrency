import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import defaultNewsImg from "../../../images/defaultNews.jpg";

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

const YourNewsTop = (props) => {
  const { newsHeadlines } = props;

  const renderYourNewsTop = () =>
    newsHeadlines.slice(0, 2).map((news) => (
      <YourNewsContentTopLink key={news.summary} href={news.link} target="_blank">
        <YourNewsTopContent>
          <YourNewsTopImageContainer>
            <YourNewsTopImage>
              <picture>
                <source media="(max-width: 560px)" />
                <img
                  src={news.media ? news.media : defaultNewsImg}
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
  return <YourNewsContentTop>{renderYourNewsTop()}</YourNewsContentTop>;
};

YourNewsTop.propTypes = {
  newsHeadlines: PropTypes.arrayOf(PropTypes.objectOf),
};

YourNewsTop.defaultProps = {
  newsHeadlines: [],
};

export default YourNewsTop;
