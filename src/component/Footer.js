import React from "react";
import styled from "styled-components";

const FooterStyled = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  width: 100%;
  background: #000;
  padding-bottom: 8px;
`;

const Logo = styled.a`
  text-decoration: none;
  margin-left: 24px;
  cursor: pointer;
  color: #fff;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const Nav = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  margin-right: 16px;
`;

const NavItemLink = styled.a`
  padding-top: 16px;
  padding-bottom: 16px;
  text-decoration: none;
  cursor: pointer;
  color: #fff;
  :hover {
    border-bottom: 2px solid orange;
  }
`;

const Footer = () => (
  <FooterStyled>
    <Logo href="/">Logo</Logo>
    <Nav>
      <NavItem>
        <NavItemLink href="/explore">EXPLORE</NavItemLink>
      </NavItem>
      <NavItem>
        <NavItemLink href="/portfolio">PORTFOLIO</NavItemLink>
      </NavItem>
      <NavItem>
        <NavItemLink href="/terms">TERMS & CONDITIONS</NavItemLink>
      </NavItem>
    </Nav>
  </FooterStyled>
);

export default Footer;
