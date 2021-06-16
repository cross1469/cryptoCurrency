import React, {
  createRef,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import CustomModal from "./Modal";
import Sign from "./Sign";
import Forget from "./Forget";
import { firebaseAuthSignOut } from "../Utils/firebase";
import { updatePageName } from "../Redux/Actions/actionCreator";
import logo from "../images/cryptoLogo.svg";
import { ShowToastContext, EmailContext } from "../context/Context";

const Navigation = styled.header`
  width: 100%;
  z-index: 1;
  position: relative;
  border-bottom: 1px solid #d9d9d9;
  ${color}
  ${typography}
  .container {
    height: 67px;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    box-sizing: content-box;
  }
  .logo a {
    display: flex;
    text-decoration: none;
    ${color}
    ${space}
  }
  a {
    height: 67px;
    width: 100px;
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
    color: #d9d9d9;
    font-size: 2rem;
  }
  nav {
    ul {
      display: flex;
      justify-content: space-between;
    }
    li {
      justify-content: space-between;
      font-size: 14px;
      line-height: 16px;
    }
    a {
      font-size: 1em;
      text-decoration: none;
      letter-spacing: 1px;
      font-weight: 500;
      .active {
        color: #f0b90b;
      }
    }
    a.active {
      color: #f0b90b;
    }
    button {
      font-size: 14px;
      margin: 0px 18px;
      line-height: 16px;
      text-decoration: none;
      border: none;
      outline: none;
      color: #d9d9d9;
      cursor: pointer;
      letter-spacing: 1px;
      font-weight: 500;
      padding: 24px 0px;
      ${color}
      :hover {
        color: #f0b90b;
      }
    }
    button.active {
      color: #f0b90b;
    }
  }

  @media only screen and (max-width: 768px) {
    nav {
      li {
        font-size: 16px;
      }
    }
  }
  @media only screen and (max-width: 576px) {
    .container {
      display: block;
      padding: 0;
      position: relative;
    }
    .logo {
      display: flex;
      padding-left: 20px;
    }
    .fa-bars {
      display: inline-block;
      position: absolute;
      top: 17px;
      right: 20px;
      cursor: pointer;
    }
    ul.collapsed {
      width: 100%;
      display: block;
      overflow: hidden;
      background-color: #12161c;
      max-height: 0;
      transition-duration: 0.4s;
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

      &.is-expanded {
        width: 100%;
        overflow: hidden;
        max-height: 300px;
        transition-duration: 0.4s;
        transition-timing-function: ease-in;
      }
      li {
        width: 100%;
        font-size: 16px;
      }

      li button {
        display: block;
        padding: 20px 24px;
        width: 100%;
        margin: 0px;
        text-align: left;
      }
    }
  }
`;

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [signType, setSignType] = useState("signin");
  const history = useHistory();
  const page = useSelector((state) => state.pageReducer.name);
  const signModal = useRef(null);
  const forgetModal = createRef();
  const dispatch = useDispatch();
  const email = useContext(EmailContext);
  const showToast = useContext(ShowToastContext);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleClickSignOut = () => {
    firebaseAuthSignOut();
    showToast("successSignOut");
    setLoginStatus(false);
  };

  const handleClickCheckMember = (e) => {
    e.preventDefault();
    if (email) {
      history.push("/portfolio");
      dispatch(updatePageName("portfolio"));
    } else {
      showToast("dangerPortfolio");
    }
  };

  const handleClickModal = (e) => {
    if (e.target.innerHTML === "Sign In") {
      setSignType("signin");
      signModal.current.open();
    } else {
      setSignType("create");
      signModal.current.open();
    }
  };

  useEffect(() => {
    if (email) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [email]);

  return (
    <>
      <Navigation bg="black">
        <div className="container">
          <div className="logo">
            <Link to="/" onClick={() => dispatch(updatePageName("landing"))}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <nav className="nav">
            <FontAwesomeIcon icon={faBars} onClick={(e) => handleToggle(e)} />
            <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}>
              <li>
                <NavLink
                  onClick={() => dispatch(updatePageName("explore"))}
                  activeClassName="active"
                  to="/explore"
                >
                  <button
                    className={page === "explore" ? "active" : null}
                    type="button"
                  >
                    Explore
                  </button>
                </NavLink>
              </li>
              <li>
                <button
                  className={page === "portfolio" ? "active" : null}
                  type="button"
                  onClick={handleClickCheckMember}
                >
                  Portfolio
                </button>
              </li>
              {email ? (
                <li>
                  <button bg="black" type="button" onClick={handleClickSignOut}>
                    {loginStatus && "Sign Out"}
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button bg="black" type="button" onClick={handleClickModal}>
                      {loginStatus || "Sign In"}
                    </button>
                  </li>
                  <li>
                    <button bg="black" type="button" onClick={handleClickModal}>
                      Sign Up
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </Navigation>

      <CustomModal ref={forgetModal}>
        <Forget />
      </CustomModal>
      <CustomModal ref={signModal}>
        <Sign forgetModal={forgetModal} signType={signType} />
      </CustomModal>
    </>
  );
};

export default Header;
