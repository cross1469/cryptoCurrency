import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import defaultNewsImg from "../../../images/defaultNews.jpg";

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

const YourNewsBottom = (props) => {
  const { newsHeadlines } = props;

  const renderYourNewsButtom = () =>
    newsHeadlines.slice(2, 6).map((news) => (
      <YourNewsContentBottomLink key={news.summary} href={news.link}>
        <YourNewsBottomContent>
          <YourNewsBottomTopImg>
            <YourNewsBottomTopImgContainer>
              <picture>
                <source media="(max-width: 560px)" />
                <img
                  src={news.media ? news.media : defaultNewsImg}
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
    <YourNewsContentBottom>{renderYourNewsButtom()}</YourNewsContentBottom>
  );
};

YourNewsBottom.propTypes = {
  newsHeadlines: PropTypes.arrayOf(PropTypes.objectOf),
};

YourNewsBottom.defaultProps = {
  newsHeadlines: [],
};

export default YourNewsBottom;
