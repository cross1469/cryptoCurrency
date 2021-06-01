import React from "react";
import styled from "styled-components";
import { color } from "styled-system";

const FooterStyled = styled.footer`
  position: relative;
  bottom: 0;
  ${color}
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 24px 0px;
  }
  .disclaimer {
    display: flex;
    color: #fff;
    font-size: 14px;
    line-height: 16px;
    justify-content: center;
    letter-spacing: 1px;
  }
`;

const Footer = () => (
  <FooterStyled bg="black">
    <div className="container">
      <div className="footerContainer">
        <div className="disclaimer">&copy; 2021 Cryptocurrency</div>
      </div>
    </div>
  </FooterStyled>
);

export default Footer;
