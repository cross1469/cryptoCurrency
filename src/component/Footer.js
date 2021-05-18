import React from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";

const FooterStyled = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  width: 100%;
  ${color}
  ${space}
`;

const Logo = styled.a`
  text-decoration: none;
  cursor: pointer;
  ${color}
  ${space}
  ${typography}
`;

const Nav = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  ${space}
`;

const NavItemLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  ${color}
  ${space}
  ${typography}
  :hover {
    border-bottom: 2px solid orange;
  }
`;

const Footer = () => (
  <FooterStyled bg="black" pb={2}>
    <Logo
      href="/"
      py={3}
      color="white"
      ml={4}
      fontSize={32}
      letterSpacing="1rem"
    >
      Logo
    </Logo>
    <Nav>
      <NavItem mr={4}>
        <NavItemLink
          href="/explore"
          py={3}
          color="white"
          letterSpacing="0.5rem"
        >
          EXPLORE
        </NavItemLink>
      </NavItem>
      <NavItem mr={4}>
        <NavItemLink
          href="/portfolio"
          py={3}
          color="white"
          letterSpacing="0.5rem"
        >
          PORTFOLIO
        </NavItemLink>
      </NavItem>
      <NavItem mr={4}>
        <NavItemLink href="/terms" py={3} color="white" letterSpacing="0.1rem">
          TERMS & CONDITIONS
        </NavItemLink>
      </NavItem>
    </Nav>
  </FooterStyled>
);

export default Footer;
