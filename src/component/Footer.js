import React from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import { Link } from "react-router-dom";

const FooterStyled = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  width: 100%;
  ${color}
  ${space}
`;

const Logo = styled.div`
  a {
    text-decoration: none;
    cursor: pointer;
    ${color}
    ${space}
    ${typography}
  }
`;

const Nav = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  ${space}
`;

const NavItemLink = styled.div`
  a {
    text-decoration: none;
    cursor: pointer;
    ${color}
    ${space}
    ${typography}
    :hover {
      border-bottom: 2px solid orange;
    }
  }
`;

const Footer = () => (
  <FooterStyled bg="black" pb={2}>
    <Logo py={3} color="white" ml={4} fontSize={32} letterSpacing="1rem">
      <Link to="/">Logo</Link>
    </Logo>
    <Nav>
      <NavItem mr={4}>
        <NavItemLink py={3} color="white" letterSpacing="0.5rem">
          <Link to="/explore">EXPLORE</Link>
        </NavItemLink>
      </NavItem>
      <NavItem mr={4}>
        <NavItemLink py={3} color="white" letterSpacing="0.5rem">
          <Link to="/portfolio">PORTFOLIO</Link>
        </NavItemLink>
      </NavItem>
      <NavItem mr={4}>
        <NavItemLink py={3} color="white" letterSpacing="0.1rem">
          <Link to="/terms">TERMS & CONDITIONS</Link>
        </NavItemLink>
      </NavItem>
    </Nav>
  </FooterStyled>
);

export default Footer;
