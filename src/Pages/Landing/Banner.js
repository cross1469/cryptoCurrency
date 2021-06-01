import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { color } from "styled-system";
import { ReactComponent as BannerSvg } from "../../images/banner.svg";

const BannerBg = styled.section`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  margin: 0px auto;
  padding-top: 24px;
  padding-bottom: 24px;
  overflow: hidden;
  padding-left: 56px;
  padding-right: 56px;
  ${color}
`;
const BannerCotainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  .leftSection {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-top: 100px;
    padding-bottom: 111px;
    flex: 1 1 0%;
  }
  .rightSection {
    display: flex;
    padding-top: 40px;
    padding-left: 24px;
    justify-content: flex-end;
    flex: 2 1 0%;
    svg {
      height: 608px;
      width: auto;
    }
  }
`;
const BannerTitle = styled.h1`
  max-width: 425px;
  font-size: 62px;
  font-weight: 600;
  line-height: 1.15;
  margin-top: 8px;
  margin-bottom: 16px;
  color: #fff;
`;
const BannerSubtitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 32px;
  color: #fff;
`;
const BannerToExploreBtn = styled.button`
  position: relative;
  width: 100%;
  padding: 24px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  outline: none;
  width: 120px;
  border-radius: 4px;
  background-image: linear-gradient(
    rgb(248, 209, 47) 0%,
    rgb(240, 185, 11) 100%
  );
  :hover {
    background-image: linear-gradient(
      rgb(255, 226, 81) 0%,
      rgb(237, 196, 35) 100%
    );
  }
  a {
    text-decoration: none;
  }
`;

const Banner = () => (
  <BannerBg bg="#0b0e11">
    <BannerCotainer>
      <div className="leftSection">
        <BannerTitle>
          <span>Cryptocurrency Exchange</span>
        </BannerTitle>
        <BannerSubtitle>
          <span>Buy and sell cryptocurrency to connect to the world</span>
        </BannerSubtitle>
        <Link to="/explore">
          <BannerToExploreBtn>Explore</BannerToExploreBtn>
        </Link>
      </div>
      <div className="rightSection">
        <BannerSvg />
      </div>
    </BannerCotainer>
  </BannerBg>
);

export default Banner;
