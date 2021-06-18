import React from "react";
import styled from "styled-components";
import { color } from "styled-system";

const StyledFooter = styled.footer`
  position: relative;
  border-top: 1px solid #d9d9d9;
  bottom: 0;
  ${color}
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 0px;
  }
  .disclaimer {
    display: flex;
    color: #d9d9d9;
    font-size: 14px;
    line-height: 16px;
    justify-content: center;
    letter-spacing: 1px;
  }
`;

const Footer = () => (
  <StyledFooter bg="black">
    <div className="container">
      <div className="footerContainer">
        <div className="disclaimer">&copy; 2021 Cryptocurrency</div>
      </div>
    </div>
  </StyledFooter>
);

export default Footer;
