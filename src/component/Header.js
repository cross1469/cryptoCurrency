import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useHistory } from "react-router-dom";
import CustomModal from "./Modal";
import Sign from "./Sign";
import Forget from "./Forget";
import { subscribeUserData, firebaseAuthSignOut } from "../Utils/firebase";
import Toast from "./Toast";
import checkIcon from "../images/check.svg";
import errorIcon from "../images/error.svg";

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
  const [email, setemail] = useState(null);
  const [list, setList] = useState([]);
  const [uid, setUid] = useState(null);
  const [loginStatus, setLoginStatus] = useState("LOGIN");
  let toastProperties = null;

  const history = useHistory();

  const signModal = useRef(null);
  const forgetModal = createRef();

  const handleToggle = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const showToast = (type) => {
    const id = Math.floor(Math.random() * 101 + 1);
    switch (type) {
      case "successSignOut":
        toastProperties = {
          id,
          title: "Success",
          description: "登出成功",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "dangerPortfolio":
        toastProperties = {
          id,
          title: "Danger",
          description: "進入 Portfolio 頁面前，請先登入",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  };

  const handleClickSignOut = () => {
    firebaseAuthSignOut();
    showToast("successSignOut");
    setLoginStatus("LOGIN");
    setUid(null);
  };

  const handleClickCheckMember = useCallback(() => {
    if (email) {
      history.push("/portfolio");
    } else {
      showToast("dangerPortfolio");
    }
  }, [history]);

  useEffect(
    () =>
      subscribeUserData((userEmail, userUid) => {
        if (userEmail) {
          setemail(userEmail);
          setUid(userUid);
          setLoginStatus("LOGOUT");
        } else {
          setemail(userEmail);
          setUid(userUid);
          setLoginStatus("LOGIN");
        }
      }),
    []
  );

  return (
    <>
      <Navigation bg="black" color="white" fontFamily="Roboto">
        <div className="logo">
          <Link to="/">LOGO</Link>
        </div>
        <nav className="nav">
          <FontAwesomeIcon icon={faBars} onClick={(e) => handleToggle(e)} />
          <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}>
            <NavLink activeClassName="active" to="/explore">
              <li>EXPLORE</li>
            </NavLink>
            <NavLink
              activeClassName="active"
              to
              onClick={handleClickCheckMember}
            >
              <li>PORTFOLIO</li>
            </NavLink>
            {email || uid ? (
              <NavLink activeClassName="active" to onClick={handleClickSignOut}>
                <li>{loginStatus}</li>
              </NavLink>
            ) : (
              <NavLink
                activeClassName="active"
                to
                onClick={() => signModal.current.open()}
              >
                <li>{loginStatus}</li>
              </NavLink>
            )}
          </ul>
        </nav>
      </Navigation>
      <CustomModal ref={forgetModal}>
        <Forget />
      </CustomModal>
      <CustomModal ref={signModal}>
        <Sign forgetModal={forgetModal} />
      </CustomModal>
      <Toast toastList={list} autoDelete dismissTime={5000} />
    </>
  );
};

export default Header;
