import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Error404Icon } from "../images/error404.svg";

const Content = styled.div`
  height: 100vh;
  z-index: 99999;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background-color: #14151a;
  @media only screen and (max-width: 768px) {
    left: 0;
    padding: 24px 0;
  }
  svg {
    fill: #d9d9d9;
    width: 240px;
    height: 240px;
    margin-bottom: 56px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    color: #d9d9d9;
  }
  .subtext {
    padding: 8px 0 32px;
    text-align: center;
    max-width: 240px;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    word-break: break-word;
    color: #95a1bb;
    @media only screen and (max-width: 768px) {
      padding-bottom: 16px;
      display: inline;
    }
  }
  a {
    display: inline-block;
    color: #d9d9d9;
    padding: 16px 40px;
    font-weight: 500;
    border: 1px solid #2f3336;
    border-radius: 4px;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    :hover {
      color: #f0b90b;
      border-color: #f0b90b;
    }
  }
`;

const ErrorPadge = () => (
  <Content>
    <Error404Icon />
    <Container>
      <h2>Page not found</h2>
      <div className="subtext">
        Sorry we couldn&apos;t find what you were looking for.
      </div>
      <Link to="/">Back to CryptoCurrency</Link>
    </Container>
  </Content>
);

export default ErrorPadge;
