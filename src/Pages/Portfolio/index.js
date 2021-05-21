import React from "react";
import styled from "styled-components";
import { color, space } from "styled-system";
import OrderTable from "./OrderTable";
import AssetsTotal from "./AssetsTotal";
import WishList from "./WishList";

const PortfolioContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PortfolioBg = styled.div`
  ${color}
  ${space}
`;

const Portfolio = () => (
  <PortfolioBg pt={4} bg="#fafafa">
    <PortfolioContainer>
      <AssetsTotal />
      <OrderTable />
      <WishList />
    </PortfolioContainer>
  </PortfolioBg>
);

export default Portfolio;
