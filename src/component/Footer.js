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
      color: #f0b90b;
    }
  }
  @media only screen and (max-width: 576px) {
    font-size: 12px;
    line-height: 16px;
  }
`;

const Footer = () => (
  <FooterStyled bg="black" py={28}>
    <Logo
      color="white"
      ml={4}
      fontFamily="Roboto"
      fontSize={36}
      letterSpacing="1rem"
    >
      <Link to="/">LOGO</Link>
    </Logo>
    <Nav>
      <NavItem mr={4}>
        <NavItemLink color="white" letterSpacing="0.2rem" fontFamily="Roboto">
          <Link to="/explore" fontFamily="Roboto">
            EXPLORE
          </Link>
        </NavItemLink>
      </NavItem>
      <NavItem mr={4}>
        <NavItemLink color="white" letterSpacing="0.2rem" fontFamily="Roboto">
          <Link to="/portfolio" fontFamily="Roboto">
            PORTFOLIO
          </Link>
        </NavItemLink>
      </NavItem>
    </Nav>
  </FooterStyled>
);

export default Footer;
