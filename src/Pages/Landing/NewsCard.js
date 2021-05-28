import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { color, space, typography } from "styled-system";

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const CardContainer = styled.div`
  padding: 2px 16px;
`;
const CardImg = styled.img`
  width: 100%;
  border-radius: 5px 5px 0 0;
`;
const CardTitle = styled.div`
  ${color}
  ${space}
  ${typography}
`;
const CardSubContent = styled.div`
  ${color}
  ${typography}
`;

const NewsCard = (props) => {
  const { newsTitle, newsDescription, newsUrlToImage } = props;
  return (
    <Card>
      <CardImg src={newsUrlToImage} />
      <CardContainer>
        <CardTitle
          color="white"
          fontFamily="Roboto"
          fontSize={20}
          lineHeight="36px"
          fontWeight="bold"
          mb={3}
        >
          {newsTitle}
        </CardTitle>
        <CardSubContent
          color="white"
          fontFamily="Roboto"
          fontSize={12}
          lineHeight="24px"
        >
          {newsDescription}
        </CardSubContent>
      </CardContainer>
    </Card>
  );
};

NewsCard.propTypes = {
  newsTitle: PropTypes.string.isRequired,
  newsDescription: PropTypes.string.isRequired,
  newsUrlToImage: PropTypes.string.isRequired,
};

export default NewsCard;
