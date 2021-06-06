import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { color } from "styled-system";
import Modal from "../../Component/Modal";
import Sign from "../../Component/Sign";
import { ReactComponent as BannerSvg } from "../../images/banner.svg";
import { subscribeUserData } from "../../Utils/firebase";

const BannerBg = styled.section`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  margin: 0px auto;
  padding-top: 40px;
  padding-bottom: 40px;
  overflow: hidden;
  padding-left: 56px;
  padding-right: 56px;
  ${color}
`;
const BannerCotainer = styled.div`
  max-width: 1280px;
  display: flex;
  align-items: center;
  flex-direction: row;
  .leftSection {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-top: 100px;
    padding-bottom: 111px;
    flex: 1 1 0%;
  }
  .rightSection {
    display: flex;
    padding-top: 40px;
    padding-left: 24px;
    justify-content: flex-end;
    flex: 2 1 0%;
    svg {
      height: 608px;
    }
  }
  @media only screen and (max-width: 996px) {
    flex-wrap: wrap;
    .leftSection {
      align-items: center;
    }
  }
  @media only screen and (max-width: 768px) {
    .leftSection {
      align-items: flex-start;
    }
    .rightSection {
      display: none;
    }
  }
`;
const BannerTitle = styled.h1`
  max-width: 425px;
  font-size: 62px;
  font-weight: 600;
  line-height: 1.15;
  margin-top: 8px;
  margin-bottom: 16px;
  color: #fff;
  @media only screen and (max-width: 576px) {
    font-size: 34px;
    line-height: 40px;
  }
`;
const BannerSubtitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 32px;
  color: #95a1bb;
  @media only screen and (max-width: 576px) {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }
`;
const BannerToSignUpBtn = styled.button`
  position: relative;
  width: 100%;
  padding: 24px;
  font-size: 16px;
  cursor: pointer;
  width: 120px;
  border-radius: 4px;
  font-family: "Exo 2", sans-serif;
  background-color: #f0b90b;
  :hover {
    background-color: #ffe251;
  }
`;

const Banner = () => {
  const [email, setEmail] = useState("");

  useEffect(
    () =>
      subscribeUserData((userEmail) => {
        if (userEmail) {
          setEmail(userEmail);
        } else {
          setEmail("");
        }
      }),
    [email]
  );
  const signModal = useRef(null);
  return (
    <BannerBg bg="#14151a">
      <BannerCotainer>
        <div className="leftSection">
          <BannerTitle>
            <span>Cryptocurrency Exchange</span>
          </BannerTitle>
          <BannerSubtitle>
            <span>Buy and sell cryptocurrency to connect to the world</span>
          </BannerSubtitle>
          {email ? (
            <Link to="/explore">
              <BannerToSignUpBtn>Explore</BannerToSignUpBtn>
            </Link>
          ) : (
            <BannerToSignUpBtn onClick={() => signModal.current.open()}>
              Sign Up
            </BannerToSignUpBtn>
          )}
        </div>
        <div className="rightSection">
          <BannerSvg />
        </div>
      </BannerCotainer>
      <Modal ref={signModal}>
        <Sign signType="create" />
      </Modal>
    </BannerBg>
  );
};

export default Banner;
