import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import OrderTable from "./OrderTable";
import UserPNL from "./UserPNL";
import UserAsset from "./UserAsset";
import WishList from "./WishList";
import YourNews from "./YourNews";
import { subscribeUserData } from "../../Utils/firebase";
import { updatePageName } from "../../Redux/Actions/actionCreator";

const PortfolioContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  flex-direction: column;
  padding: 0px 24px;
  background: #14151a;
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
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = subscribeUserData((userEmail, uid) => {
      dispatch(updatePageName("portfolio"));
      setEmail(userEmail);
      setUserId(uid);
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <PortfolioContainer>
      <PortfolioContent>
        <PortfolioStyleFlex>
          <PortfolioPanel>
            <PortfolioStyleFlex>
              <UserPNL email={email} userId={userId} />
              <UserAsset email={email} userId={userId} />
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
