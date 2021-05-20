import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import Banner from "./Banner";
import AreaSpline from "./AreaSpline";
import News from "./News";

const ChartContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  ${space}
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Landing = () => (
  <>
    <Banner />
    <ChartContainer my={4}>
      <FlexBox>
        <AreaSpline />
        <AreaSpline />
        <AreaSpline />
        <AreaSpline />
      </FlexBox>
    </ChartContainer>
    <News />
  </>
);

export default Landing;
