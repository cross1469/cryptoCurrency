import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import KLine from "./KLine";
import PlaceOrder from "./PlaceOrder";
import Chat from "./Chat";
import AddValue from "./AddValue";
import AssetTable from "./AssetTable";
import DealTable from "./DealTable";
import MobileButton from "./MobileButton";
import { subscribeUserData } from "../../Utils/firebase";

const LayoutWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  padding: 0px;
  background: #121212;
  color: #fff;
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  width: 100%;
  max-width: 1280px;
`;

const TransitionerContainer = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: none 0s ease 0s;
`;

const ModuleFade = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 1;
`;

const OuterHeader = styled.div`
  width: 100%;
  margin: 40px 0px;
  border-bottom: 1px solid rgb(236, 239, 241);
  padding: 0px 24px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 1280px;
  margin: 0px auto;
`;

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  min-height: 63px;
`;

const CoinImgContainer = styled.div`
  height: 46px;
  img {
    width: 46px;
    height: 46px;
    border-radius: 100%;
  }
`;

const CoinTitleContainer = styled.div`
  flex-direction: column;
  margin-right: auto;
  margin-left: 24px;
`;

const CoinTitleInner = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  h1 {
    line-height: 42px;
    font-size: 32px;
    font-weight: 500;
  }
`;

const WishListBtn = styled.button`
  position: relative;
  width: auto;
  margin: 0px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 80ms ease-in-out 0s;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid rgb(236, 239, 241);
  background-color: rgb(255, 255, 255);
  color: rgb(5, 15, 25);
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    pointer-events: none;
    flex-wrap: nowrap;
    white-space: nowrap;
    font-weight: 500;
    svg {
      stroke-width: 1px;
      cursor: pointer;
    }
    span {
      margin-left: 10px;
      white-space: nowrap;
      font-size: 16px;
    }
  }
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1 1 auto;
  padding: 0px 24px;
`;

const FlexBox = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

const FlexBoxContainer = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 32px;
  flex-direction: row;
`;

const ChartColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ChartContainer = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  border: 1px solid rgb(236, 239, 241);
  border-radius: 6px;
  box-shadow: rgb(17 51 83 / 2%) 0px 4px 12px 0px;
  margin-bottom: 24px;
  min-height: 310px;
  overflow: visible;
`;

const TradeColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 370px;
  margin-left: 24px;
`;

const Mobile = styled(MobileButton)`
  display: none;
  width: 100%;
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
  const { symbol } = useParams();
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
    <LayoutWrapper>
      <LayoutContainer>
        <TransitionerContainer>
          <ModuleFade>
            <OuterHeader>
              <TransitionerContainer>
                <ModuleFade>
                  <InnerContainer>
                    <HeaderStyled>
                      <CoinImgContainer />
                      <CoinTitleContainer>
                        <CoinTitleInner>
                          <h1>{symbol}</h1>
                        </CoinTitleInner>
                      </CoinTitleContainer>
                      <WishListBtn>
                        <span>
                          <span>WishList</span>
                        </span>
                      </WishListBtn>
                    </HeaderStyled>
                  </InnerContainer>
                </ModuleFade>
              </TransitionerContainer>
            </OuterHeader>

            <OuterContainer>
              <InnerContainer>
                <TransitionerContainer>
                  <ModuleFade>
                    <FlexBox>
                      <FlexBoxContainer>
                        <ChartColumn>
                          <ChartContainer>
                            <TransitionerContainer>
                              <ModuleFade>
                                <KLine />
                              </ModuleFade>
                            </TransitionerContainer>
                          </ChartContainer>
                          <TransitionerContainer>
                            <AssetTable email={email} userId={userId} />
                          </TransitionerContainer>
                          <TransitionerContainer>
                            <DealTable />
                          </TransitionerContainer>
                        </ChartColumn>
                        <TradeColumn>
                          <PlaceOrder email={email} userId={userId} />
                          <AddValue email={email} userId={userId} />
                        </TradeColumn>
                      </FlexBoxContainer>
                    </FlexBox>
                    <Mobile email={email} userId={userId} />
                    <Chat email={email} userId={userId} />
                  </ModuleFade>
                </TransitionerContainer>
              </InnerContainer>
            </OuterContainer>
          </ModuleFade>
        </TransitionerContainer>
      </LayoutContainer>
    </LayoutWrapper>
  );
};

export default CoinDetail;
