import React from "react";
import styled from "styled-components";
import { space, flexbox } from "styled-system";
import KLine from "./KLine";
import PlaceOrder from "./PlaceOrder";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  ${space}
`;

const FlexBox = styled.div`
  display: flex;
  ${flexbox}
`;

const CoinDetail = () => (
  <Container mt={3}>
    <FlexBox justifyContent="center">
      <KLine />
      <PlaceOrder />
    </FlexBox>
  </Container>
);

export default CoinDetail;
