import React from "react";
import styled from "styled-components";
import KLine from "./KLine";
import PlaceOrder from "./PlaceOrder";

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const CoinDetail = () => (
  <Container>
    <KLine />
    <PlaceOrder />
  </Container>
);

export default CoinDetail;
