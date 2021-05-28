import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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
  ${space}
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

const YourNewsCard = (props) => {
  const { newsTitle, newsDescription, newsUrlToImage } = props;
  return (
    <Card>
      <CardImg src={newsUrlToImage} />
      <CardContainer mt={3}>
        <CardTitle
          fontFamily="Roboto"
          fontSize={20}
          lineHeight="28px"
          fontWeight="bold"
          mb={3}
        >
          {newsTitle}
        </CardTitle>
        <CardSubContent fontFamily="Roboto" fontSize={12} lineHeight="16px">
          {newsDescription}
        </CardSubContent>
      </CardContainer>
    </Card>
  );
};

YourNewsCard.propTypes = {
  newsTitle: PropTypes.string.isRequired,
  newsDescription: PropTypes.string.isRequired,
  newsUrlToImage: PropTypes.string.isRequired,
};

export default YourNewsCard;
