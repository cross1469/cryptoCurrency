import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, space } from "styled-system";
import OrderTable from "./OrderTable";
import AssetsTotal from "./AssetsTotal";
import WishList from "./WishList";
import YourNews from "./YourNews";
import { subscribeUserData } from "../../Utils/firebase";

const PortfolioContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PortfolioBg = styled.div`
  ${color}
  ${space}
`;

const Portfolio = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(
    () =>
      subscribeUserData((userEmail, uid) => {
        setEmail(userEmail);
        setUserId(uid);
      }),
    []
  );

  return (
    <PortfolioBg pt={4} bg="#fafafa" pb={4}>
      <PortfolioContainer>
        <AssetsTotal email={email} userId={userId} />
        <OrderTable email={email} userId={userId} />
        <WishList email={email} userId={userId} />
        <YourNews email={email} userId={userId} />
      </PortfolioContainer>
    </PortfolioBg>
  );
};

export default Portfolio;
