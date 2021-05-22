import React, { useRef, useState } from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SignModal from "./Modal";
import Sign from "./Sign";

const Navigation = styled.header`
  font-size: 36px;
  line-height: 48px;
  letter-spacing: 1rem;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 140px;
  ${color}
  ${typography}
  .logo a {
    padding-left: 36px;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    ${color}
    ${space}
  }
  a {
    transition: all 0.6s;
    color: #222;
    font-size: 1em;
    ${color}
  }
  a:hover {
    color: #f0b90b;
  }
  .fa-bars {
    display: none;
    ${color}
    font-size: 2rem;
  }
  nav {
    ul {
      display: flex;
      justify-content: space-between;
    }
    li {
      justify-content: space-between;
      font-size: 24px;
      letter-spacing: 0.2rem;
      line-height: 36px;
    }
    a {
      padding-right: 24px;
      font-size: 1em;
      text-decoration: none;
      .active {
        color: #f0b90b;
      }
    }
    a.active {
      color: #f0b90b;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 0px;
    .logo a {
      font-size: 28px;
      padding-left: 24px;
    }

    nav {
      li {
        font-size: 16px;
      }
    }
  }
  @media only screen and (max-width: 576px) {
    height: auto;
    min-height: 50px;
    display: block;
    position: relative;
    .logo {
      width: 100%;
      display: block;
      margin: 0px;
      a {
        padding-top: 12px;
        padding-left: 12px;
      }
    }
    .fa-bars {
      display: inline-block;
      position: absolute;
      top: 12px;
      right: 12px;
      cursor: pointer;
    }
    ul.collapsed {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: hidden;
      max-height: 0;
      transition-duration: 0.4s;
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

      &.is-expanded {
        overflow: hidden;
        max-height: 300px;
        transition-duration: 0.4s;
        transition-timing-function: ease-in;
      }
      li {
        width: 100%;
        font-size: 16px;
        line-height: 24px;
        padding: 16px 12px;
      }
    }
  }
`;

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const modal = useRef(null);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Navigation bg="black" color="white" fontFamily="Roboto">
        <div className="logo">
          <Link to="/">LOGO</Link>
        </div>
        <nav className="nav">
          <FontAwesomeIcon icon={faBars} onClick={(e) => handleToggle(e)} />
          <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}>
            <Link activeClassName="active" to="/explore">
              <li>EXPLORE</li>
            </Link>
            <Link activeClassName="active" to="/portfolio">
              <li>PORTFOLIO</li>
            </Link>
            <Link
              activeClassName="active"
              to
              onClick={() => modal.current.open()}
            >
              <li>LOGIN</li>
            </Link>
          </ul>
        </nav>
      </Navigation>
      <SignModal ref={modal}>
        <Sign />
      </SignModal>
    </>
  );
};

export default Header;
