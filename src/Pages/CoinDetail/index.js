import React from "react";
import styled from "styled-components";
import { space, flexbox } from "styled-system";
import KLine from "./KLine";
import PlaceOrder from "./PlaceOrder";
import Chat from "./Chat";
import AddValue from "./AddValue";
import AssetTable from "./AssetTable";

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
      <div>
        <KLine />
        <AssetTable />
      </div>
      <div>
        <PlaceOrder />
        <AddValue />
      </div>
    </FlexBox>
    <Chat />
  </Container>
);

export default CoinDetail;
