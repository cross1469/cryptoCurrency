import React from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import star from "../../images/active_star.png";

const CardContainer = styled.div`
  width: 250px;
  cursor: pointer;
  ${space}
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

const YourNewsCard = () => (
  <>
    <CardContainer mt={3}>
      <CardImg src={star} />
      <CardTitle
        fontFamily="Roboto"
        fontSize={28}
        lineHeight="36px"
        fontWeight="bold"
        mb={3}
      >
        ETH
      </CardTitle>
      <CardSubContent fontFamily="Roboto" fontSize={20} lineHeight="24px">
        123
      </CardSubContent>
    </CardContainer>
  </>
);

export default YourNewsCard;
