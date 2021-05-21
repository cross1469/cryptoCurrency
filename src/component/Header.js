import React, { useRef } from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import { Link } from "react-router-dom";
import SignModal from "./Modal";

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

const Header = () => {
  const modal = useRef(null);
  return (
    <>
      <HeaderStyled bg="black" py={28}>
        <Logo color="white" ml={4} fontSize={32} letterSpacing="1rem">
          <Link to="/">Logo</Link>
        </Logo>
        <Nav>
          <NavItem mr={4}>
            <NavItemLink
              color="white"
              py={3}
              letterSpacing="0.3rem"
              fontFamily="Roboto"
            >
              <Link to="/explore">EXPLORE</Link>
            </NavItemLink>
          </NavItem>
          <NavItem mr={4}>
            <NavItemLink
              color="white"
              py={3}
              letterSpacing="0.3rem"
              fontFamily="Roboto"
            >
              <Link to="/portfolio">PORTFOLIO</Link>
            </NavItemLink>
          </NavItem>
          <NavItem mr={4}>
            <NavItemLink
              color="white"
              pb={3}
              letterSpacing="0.3rem"
              fontFamily="Roboto"
              onClick={() => modal.current.open()}
            >
              <a href>LOGIN</a>
            </NavItemLink>
          </NavItem>
        </Nav>
      </HeaderStyled>
      <SignModal ref={modal}>Hello World</SignModal>
    </>
  );
};

export default Header;
