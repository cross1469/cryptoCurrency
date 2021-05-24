import React from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import star from "../../images/active_star.png";

const Card = styled.div`
  background-color: transparent;
  width: 250px;
  height: 200px;
  perspective: 1000px;
  cursor: pointer;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  :hover {
    transform: rotateY(180deg);
  }
  ${space}
  .face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    padding-top: 16px;
  }
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      rgb(255, 226, 81) 0%,
      rgb(237, 196, 35) 100%
    );
    transform: rotateY(180deg);
    backface-visibility: hidden;
  }
`;
const CardImg = styled.img``;
const CardTitle = styled.div`
  ${color}
  ${space}
  ${typography}
`;
const CardSubContent = styled.div`
  ${color}
  ${typography}
`;

const BackCardContent = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 20px;
  font-weight: 500;
  border: 1px solid white;
  margin-top: 73px;
  background-color: white;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const NewsCard = () => (
  <Card>
    <CardContainer>
      <div className="face">
        <CardImg src={star} />
        <CardTitle
          color="white"
          fontFamily="Roboto"
          fontSize={28}
          lineHeight="36px"
          fontWeight="bold"
          mb={3}
        >
          ETH
        </CardTitle>
        <CardSubContent
          color="white"
          fontFamily="Roboto"
          fontSize={20}
          lineHeight="24px"
        >
          123
        </CardSubContent>
      </div>
      <div className="back">
        <BackCardContent>Read More</BackCardContent>
      </div>
    </CardContainer>
  </Card>
);

export default NewsCard;
