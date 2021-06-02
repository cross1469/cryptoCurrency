import React, { useEffect, useState } from "react";
import styled from "styled-components";
import OrderTable from "./OrderTable";
import AssetsTotal from "./AssetsTotal";
import WishList from "./WishList";
import YourNews from "./YourNews";
import { subscribeUserData } from "../../Utils/firebase";

const PortfolioContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  flex-direction: column;
  padding: 0px 24px;
  background: #181a20;
`;

const PortfolioContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  height: 100%;
  max-height: 100%;
  margin: 0px;
  padding: 0px;
  width: 100%;
  max-width: 1280px;
`;

const PortfolioStyleFlex = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 1px;
`;

const PortfolioPanel = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 24px 0px 0px;
`;

const Portfolio = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    subscribeUserData((userEmail, uid) => {
      setEmail(userEmail);
      setUserId(uid);
    });
    return () => {
      subscribeUserData((userEmail, uid) => {
        setEmail(userEmail);
        setUserId(uid);
      });
    };
  }, []);

  return (
    <PortfolioContainer>
      <PortfolioContent>
        <PortfolioStyleFlex>
          <PortfolioPanel>
            <PortfolioStyleFlex>
              <AssetsTotal email={email} userId={userId} />
              <OrderTable email={email} userId={userId} />
              <WishList email={email} userId={userId} />
              <YourNews email={email} userId={userId} />
            </PortfolioStyleFlex>
          </PortfolioPanel>
        </PortfolioStyleFlex>
      </PortfolioContent>
    </PortfolioContainer>
  );
};

export default Portfolio;
