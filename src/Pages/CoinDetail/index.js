import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { space, flexbox } from "styled-system";
import KLine from "./KLine";
import PlaceOrder from "./PlaceOrder";
import Chat from "./Chat";
import AddValue from "./AddValue";
import AssetTable from "./AssetTable";
import DealTable from "./DealTable";
import MobileButton from "./MobileButton";

import { subscribeUserData } from "../../Utils/firebase";

const Container = styled.div`
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  ${space}
  .rightSide {
    max-width: 35%;
  }
  .leftSide {
    max-width: 60%;
  }
`;

const FlexBox = styled.div`
  display: flex;
  ${flexbox}

  @media only screen and (max-width: 768px) {
    display: block;
    margin-left: 48px;
    margin-right: 48px;
    .rightSide {
      display: none;
    }
    .leftSide {
      max-width: 100%;
    }
  }
  @media only screen and (max-width: 578px) {
    margin-left: 16px;
    margin-right: 16px;
  }
`;

const Mobile = styled.div`
  width: 100%;
  display: none;
  position: fixed;
  bottom: 0;
  height: 92px;
  overflow-y: initial;
  overflow-x: visible;
  background-color: #1e2026;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const CoinDetail = () => {
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
    <Container mt={3} mb={4}>
      <FlexBox justifyContent="center">
        <div className="leftSide">
          <KLine />
          <AssetTable email={email} userId={userId} />
          <DealTable />
        </div>
        <div className="rightSide">
          <PlaceOrder email={email} userId={userId} />
          <AddValue email={email} userId={userId} />
        </div>
      </FlexBox>
      <Mobile>
        <MobileButton email={email} userId={userId} />
      </Mobile>
      <Chat email={email} userId={userId} />
    </Container>
  );
};

export default CoinDetail;
