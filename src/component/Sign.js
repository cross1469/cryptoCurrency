import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import { color, space, typography, border } from "styled-system";
import PropTypes from "prop-types";
import {
  firebaseAuthSignIn,
  firebaseAuthSignUp,
  firebaseAuthGoogleSignIn,
} from "../Utils/firebase";
import validators from "../Utils/validators";
import googleIcon from "../images/google.svg";
import { ShowToastContext } from "../context/Context";
import DisplayValidation from "./DisplayValidation";
import useUpdateValidators from "../Hooks/useUpdateValidators";

const Container = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: none 0s ease 0s;
`;

const FormCard = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 430px;
`;

const TabTitle = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 8px;
  text-align: center;
  a {
    cursor: pointer;
    display: block;
    width: 100%;
    line-height: 32px;
    border-bottom: 1px solid #f0b90b;
    text-decoration: none;
    color: #c3c0c0;
    font-weight: bold;
    border-radius: 4px;
  }

  a.active {
    background-color: #f0b90b;
    color: #1e2329;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  .divider {
    border-bottom: 1px solid #d9dadc;
    display: block;
    line-height: 1px;
    margin: 15px 0;
    position: relative;
    text-align: center;
    width: 100%;
    ::before {
      content: " ";
      display: table;
    }
    ::after {
      clear: both;
    }
  }
  span {
    flex: 0 0 auto;
    ${color}
    ${space}
    ${typography}
  }
  input[type="text"],
  input[type="password"] {
    appearance: none;
    :focus {
      border: 1px solid #f0b90b;
      outline: none;
    }
  }
  .floating-label {
    position: absolute;
    pointer-events: none;
    top: 40px;
    left: 9px;
    transition: 0.2s ease all;
    color: #c3c0c0;
  }
  input:focus ~ .floating-label,
  input:not(:focus):valid ~ .floating-label {
    top: 2px;
    left: 9px;
    font-size: 14px;
    opacity: 1;
    color: #d9d9d9;
  }
`;

const Input = styled.input`
  outline: none;
  border: 1px solid #d9d9d9;
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 1px 0 0 rgb(0 0 0 / 2%) inset;
  padding: 20px;
  font-size: 14px;
  background-color: #14151a;
  color: #d9d9d9;
  margin-top: 20px;
  ${space}
  ${border}
  :hover {
    border-color: #f0b90b;
  }
`;

const Button = styled.button`
  display: "inline-block";
  line-height: 16px;
  background-color: #f0b90b;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  border: none;
  color: #212833;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 24px;
  img {
    width: 46px;
    height: 46px;
    margin-right: 8px;
  }
  :first-child {
    margin-top: 16px;
  }
  :hover {
    box-shadow: none;
    background-color: #edc423;
  }
  :nth-child(3) {
    background-color: #4285f4;
    border: 1px solid transparent;
    color: #fff;
    padding: 0px 24px;
    :hover {
      box-shadow: 0 0 3px 3px rgb(66 133 244 / 30%);
    }
  }
`;

const ForgetPasswordText = styled.div`
  font-size: 12px;
  display: inline-block;
  cursor: pointer;
  color: #c3c0c0;
  margin-top: 16px;
  ${space}
  &:hover {
    color: #f0b90b;
  }
`;

const Sign = (props) => {
  const { setIsOpen, forgetModal, signType } = props;
  const [inputType, setInputType] = useState(signType);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("signin");
  const signModal = useRef(null);
  const showToast = useContext(ShowToastContext);
  const { validColor, updateValidators } = useUpdateValidators();

  const handleSwitchTab = (e) => {
    e.preventDefault();
    setInputType(e.target.dataset.value);
    if (e.target.dataset.value === "signin") {
      setActive("signin");
    } else if (e.target.dataset.value === "create") {
      setActive("create");
    }
  };

  const handleChangeInput = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
      updateValidators("email", e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
      updateValidators("password", e.target.value);
    }
  };

  const isFormValid = () => {
    let status = true;
    Object.keys(validators).forEach((field) => {
      if (!validators[field].valid) {
        status = false;
      }
    });
    return status;
  };

  useEffect(() => {
    if (signType === "create") {
      setActive("create");
    }
  }, [signType]);

  const checkType = async () => {
    if (inputType === "signin") {
      const loginMessage = await firebaseAuthSignIn(email, password);
      if (loginMessage === "auth/wrong-password") {
        showToast("passwordError");
      } else if (
        loginMessage === "auth/invalid-email" ||
        loginMessage === "auth/user-not-found"
      ) {
        showToast("emailError");
      } else {
        setIsOpen(false);
        showToast("successSignIn");
      }
    } else if (inputType === "create") {
      const signUpMessage = await firebaseAuthSignUp(email, password);
      if (signUpMessage === "auth/wrong-password") {
        showToast("passwordError");
      } else if (signUpMessage === "auth/invalid-email") {
        showToast("emailError");
      } else if (signUpMessage === "auth/email-already-in-use") {
        showToast("existed");
      } else {
        setIsOpen(false);
        showToast("successSignUp");
      }
    }
  };

  const googleSignIn = async () => {
    await firebaseAuthGoogleSignIn();
    const googleEmail = await firebaseAuthGoogleSignIn.email;
    setIsOpen(false);
    setEmail(googleEmail);
    showToast("successSignIn");
  };

  return (
    <>
      <Container ref={signModal}>
        <section className="user-null none">
          <FormCard>
            <TabTitle>
              <a
                className={active === "signin" ? "active" : null}
                href="true"
                data-value="signin"
                onClick={handleSwitchTab}
              >
                Sign In
              </a>
              <a
                className={active === "create" ? "active" : null}
                href="true"
                data-value="create"
                onClick={handleSwitchTab}
              >
                Sign Up
              </a>
            </TabTitle>
            <InputGroup>
              <Input
                className="u-full-width"
                id="email"
                type="text"
                onChange={handleChangeInput}
                borderColor={validColor.email}
                required
              />
              <span className="floating-label">Email</span>
            </InputGroup>
            <DisplayValidation field="email" />
            <InputGroup>
              <Input
                className="u-full-width"
                id="password"
                type="password"
                onChange={handleChangeInput}
                borderColor={validColor.password}
                required
              />
              <span className="floating-label">Password</span>
            </InputGroup>
            <DisplayValidation field="password" />
            {active === "signin" && (
              <ForgetPasswordText
                onClick={() => {
                  setIsOpen(false);
                  forgetModal.current.open();
                }}
              >
                Forget password???
              </ForgetPasswordText>
            )}

            {active === "signin" ? (
              <InputGroup>
                <Button
                  id="sign-in"
                  type="button"
                  onClick={checkType}
                  disabled={!isFormValid}
                >
                  Sign in
                </Button>
                <div className="divider" />
                <Button
                  id="google-sign-in"
                  type="button"
                  onClick={googleSignIn}
                >
                  <img src={googleIcon} alt="Google Sign in" />
                  Sign in with Google
                </Button>
              </InputGroup>
            ) : (
              <InputGroup>
                <Button
                  id="sign-up"
                  type="button"
                  onClick={checkType}
                  disabled={!isFormValid}
                >
                  Sign up
                </Button>
              </InputGroup>
            )}
          </FormCard>
        </section>
      </Container>
    </>
  );
};

Sign.propTypes = {
  setIsOpen: PropTypes.func,
  forgetModal: PropTypes.objectOf(PropTypes.objectOf(PropTypes.func)),
  signType: PropTypes.string,
};

Sign.defaultProps = {
  setIsOpen: undefined,
  signType: "signin",
  forgetModal: undefined,
};

export default Sign;
