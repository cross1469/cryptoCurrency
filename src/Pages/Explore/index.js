import React from "react";
import styled from "styled-components";
import { space, flexbox } from "styled-system";
import AreaSpline from "./AreaSpline";
import CoinData from "./CoinData";

const ExploreContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  ${space}
`;

const FlexBox = styled.div`
  display: flex;
  ${flexbox}
`;

const Explore = () => (
  <ExploreContainer mt={3}>
    <FlexBox justifyContent="space-between">
      <AreaSpline />
      <AreaSpline />
      <AreaSpline />
      <AreaSpline />
    </FlexBox>
    <CoinData />
  </ExploreContainer>
);

export default Explore;
