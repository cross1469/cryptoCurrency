import React from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
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
  margin: 0 auto;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const News = () => (
  <>
    <NewsBg bg="black" pt={100} pb={100}>
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
        <FlexBox>
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </FlexBox>
      </NewsCardsContainer>
    </NewsBg>
  </>
);

export default News;
