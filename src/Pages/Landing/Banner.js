import React from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";

const BannerBg = styled.div`
  height: 200px;
  ${color}
  ${space}
`;
const BannerCotainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const BannerTitle = styled.div`
  ${color}
  ${space}
  ${typography}
`;
const BannerSubtitle = styled.div`
  ${color}
  ${space}
  ${typography}
`;
const BannerToExploreBtn = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  width: 120px;
  border-radius: 4px;
  background-image: linear-gradient(
    rgb(248, 209, 47) 0%,
    rgb(240, 185, 11) 100%
  );
  ${color}
  ${space}
  ${typography}
  :hover {
    background-image: linear-gradient(
      rgb(255, 226, 81) 0%,
      rgb(237, 196, 35) 100%
    );
  }
`;

const Banner = () => (
  <BannerBg bg="black" pt={100} pb={100}>
    <BannerCotainer>
      <BannerTitle
        color="white"
        fontFamily="Roboto"
        fontSize={36}
        lineHeight="48px"
        mb={3}
        fontWeight="bold"
        letterSpacing={1}
      >
        加密貨幣交易所 <br /> Cryptocurrency Exchange
      </BannerTitle>
      <BannerSubtitle
        color="white"
        fontFamily="Roboto"
        fontSize={28}
        lineHeight="36px"
        mb={3}
        letterSpacing={1}
      >
        買賣加密貨幣聯通全世界
      </BannerSubtitle>
      <BannerToExploreBtn
        color="#212833"
        py={2}
        fontFamily="Roboto"
        fontWeight="bold"
        fontSize={16}
        letterSpacing={1}
      >
        Explore
      </BannerToExploreBtn>
    </BannerCotainer>
  </BannerBg>
);

export default Banner;
