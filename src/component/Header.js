import React from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  width: 100%;
  ${color}
  ${space}
  box-sizing: border-box;
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

const Header = () => (
  <HeaderStyled bg="black" pb={2}>
    <Logo
      href="/"
      color="white"
      ml={4}
      py={3}
      fontSize={32}
      letterSpacing="1rem"
    >
      Logo
    </Logo>
    <Nav>
      <NavItem mr={4}>
        <NavItemLink
          href="/explore"
          color="white"
          py={3}
          letterSpacing="0.5rem"
        >
          EXPLORE
        </NavItemLink>
      </NavItem>
      <NavItem mr={4}>
        <NavItemLink
          href="/portfolio"
          color="white"
          py={3}
          letterSpacing="0.5rem"
        >
          PORTFOLIO
        </NavItemLink>
      </NavItem>
      <NavItem mr={4}>
        <NavItemLink href="/login" color="white" py={3} letterSpacing="0.5rem">
          LOGIN
        </NavItemLink>
      </NavItem>
    </Nav>
  </HeaderStyled>
);

export default Header;
