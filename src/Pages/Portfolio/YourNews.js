import React from "react";
import styled from "styled-components";
import { space, typography, flexbox, layout } from "styled-system";
import YourNewsCard from "./YourNewsCard";

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

const YourNews = () => (
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
    <YourNewsCardsSection px={{ sm: "16px", md: "4px", lg: "24px" }} py="24px">
      <FlexBox mb={{ sm: "-16px", md: "-24px", lg: 0 }}>
        <YourNewsCardItem
          px={{ sm: 0, md: "12px", lg: "8px" }}
          pb={{ sm: "16px", md: "24px", lg: 0 }}
          width={{ sm: "100%", md: "50%", lg: "auto" }}
          flex={{ sm: "none", md: "none", lg: 1 }}
        >
          <YourNewsCardLink>
            <YourNewsCard />
          </YourNewsCardLink>
        </YourNewsCardItem>
        <YourNewsCardItem
          px={{ sm: 0, md: "16px", lg: "8px" }}
          pb={{ sm: "16px", md: "24px", lg: 0 }}
          width={{ sm: "100%", md: "50%", lg: "auto" }}
          flex={{ sm: "none", md: "none", lg: 1 }}
        >
          <YourNewsCardLink>
            <YourNewsCard />
          </YourNewsCardLink>
        </YourNewsCardItem>
        <YourNewsCardItem
          px={{ sm: 0, md: "12px", lg: "8px" }}
          pb={{ sm: "16px", md: "24px", lg: 0 }}
          width={{ sm: "100%", md: "50%", lg: "auto" }}
          flex={{ sm: "none", md: "none", lg: 1 }}
        >
          <YourNewsCardLink>
            <YourNewsCard />
          </YourNewsCardLink>
        </YourNewsCardItem>
        <YourNewsCardItem
          px={{ sm: 0, md: "12px", lg: "8px" }}
          pb={{ sm: "16px", md: "24px", lg: 0 }}
          width={{ sm: "100%", md: "50%", lg: "auto" }}
          flex={{ sm: "none", md: "none", lg: 1 }}
        >
          <YourNewsCardLink>
            <YourNewsCard />
          </YourNewsCardLink>
        </YourNewsCardItem>
      </FlexBox>
    </YourNewsCardsSection>
  </YourNewsCardsContainer>
);

export default YourNews;
