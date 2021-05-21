import React from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import YourNewsCard from "./YourNewsCard";

const YourNewsCardContainer = styled.div`
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 4px;
  ${color}
  ${space}
`;
const YourNewsTitle = styled.div`
  ${typography}
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const YourNews = () => (
  <YourNewsCardContainer bg="white" py={2} px={3} mb={4}>
    <YourNewsTitle
      fontFamily="Roboto"
      fontWeight="bold"
      fontSize={28}
      lineHeight="36px"
    >
      Your News
    </YourNewsTitle>
    <FlexBox>
      <YourNewsCard />
      <YourNewsCard />
      <YourNewsCard />
      <YourNewsCard />
    </FlexBox>
  </YourNewsCardContainer>
);

export default YourNews;
