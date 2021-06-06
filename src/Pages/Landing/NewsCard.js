import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CardImg = styled.div`
  min-height: 230px;
  margin: 0 auto 35px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
const CardTitle = styled.div`
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
  margin-bottom: 25px;
  text-align: left;
`;
const CardSubContent = styled.div`
  font-size: 18px;
  color: #95a1bb;
  line-height: 18px;
  text-align: left;
  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const NewsCard = (props) => {
  const { newsTitle, newsDescription, newsUrlToImage } = props;
  return (
    <>
      <CardImg
        style={{ backgroundImage: `url(${newsUrlToImage})` }}
        loading="lazy"
      />
      <div>
        <CardTitle>{newsTitle}</CardTitle>
        <CardSubContent>{newsDescription}</CardSubContent>
      </div>
    </>
  );
};

NewsCard.propTypes = {
  newsTitle: PropTypes.string.isRequired,
  newsDescription: PropTypes.string.isRequired,
  newsUrlToImage: PropTypes.string.isRequired,
};

export default NewsCard;
