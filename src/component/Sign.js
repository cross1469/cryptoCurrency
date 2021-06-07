import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { color, flexbox, space, typography, border } from "styled-system";
import PropTypes from "prop-types";
import {
  firebaseAuthSignIn,
  firebaseAuthSignUp,
  subscribeUserData,
  firebaseAuthGoogleSignIn,
} from "../Utils/firebase";
import validators from "../Utils/validators";
import Toast from "./Toast";
import errorIcon from "../images/error.svg";
import warningIcon from "../images/warning.svg";
import googleIcon from "../images/google.svg";

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
  ${flexbox}
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
  input[type="email"],
  input[type="password"] {
    appearance: none;
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
    color: #fff;
  }
`;

const Input = styled.input`
  outline: none;
  border: 1px solid;
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 1px 0 0 rgb(0 0 0 / 2%) inset;
  padding: 20px;
  font-size: 14px;
  background-color: #14151a;
  color: #fff;
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

const Errors = styled.div`
  text-align: left;
  ${space}
  .error {
    font-size: 12px;
    color: red;
  }
`;

const Sign = (props) => {
  const { setIsOpen, forgetModal, signType, getSignInfo } = props;
  const [inputType, setInputType] = useState(signType);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInactive, setSignInActive] = useState("active");
  const [signUpactive, setSignUpActive] = useState(null);
  const [emailInfo, setEmailInfo] = useState("");
  const [validColor, setValidColor] = useState({
    email: "#f1f3f5",
    password: "#f1f3f5",
  });

  const [list, setList] = useState([]);
  const signModal = useRef(null);
  let toastProperties = null;

  const handleSwitchTab = (e) => {
    e.preventDefault();
    setInputType(e.target.dataset.value);
    if (e.target.dataset.value === "signin") {
      setSignInActive("active");
      setSignUpActive(null);
    } else if (e.target.dataset.value === "create") {
      setSignInActive(null);
      setSignUpActive("active");
    }
  };

  const updateValidators = (fieldName, value) => {
    validators[fieldName].errors = [];
    validators[fieldName].state = value;
    validators[fieldName].valid = true;
    validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          validators[fieldName].errors.push(rule.message);
          validators[fieldName].valid = false;
          setValidColor({ ...validColor, email: "#f84960" });
        } else {
          setValidColor({ ...validColor, email: "#f1f3f5" });
        }
      } else if (typeof rule.test === "function") {
        if (!rule.test(value)) {
          validators[fieldName].errors.push(rule.message);
          validators[fieldName].valid = false;
          setValidColor({ ...validColor, password: "#f84960" });
        } else {
          setValidColor({ ...validColor, password: "#f1f3f5" });
        }
      }
    });
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    updateValidators("email", e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    updateValidators("password", e.target.value);
  };

  const showToast = (type) => {
    const id = Math.floor(Math.random() * 101 + 1);
    switch (type) {
      case "passwordError":
        toastProperties = {
          id,
          title: "Password error",
          description: "Password error, please retype",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "emailError":
        toastProperties = {
          id,
          title: "Email error",
          description: "Email error, please retype",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;

      case "signed":
        toastProperties = {
          id,
          title: "Signed in",
          description: "Signed in",
          backgroundColor: "#f0ad4e",
          icon: warningIcon,
        };
        break;

      case "existed":
        toastProperties = {
          id,
          title: "Already have this user",
          description: "This user already exists",
          backgroundColor: "#f0ad4e",
          icon: warningIcon,
        };
        break;
      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  };

  const displayValidationErrors = (fieldName) => {
    const validator = validators[fieldName];
    const result = "";
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info) => (
        <span className="error" key={info}>
          * {info}
        </span>
      ));

      return <Errors mb={2}>{errors}</Errors>;
    }
    return result;
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

  useEffect(
    () => subscribeUserData((userEmail) => setEmailInfo(userEmail)),
    []
  );

  useEffect(() => {
    if (signType === "create") {
      setSignInActive(null);
      setSignUpActive("active");
    }
  }, []);

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
      } else if (emailInfo) {
        showToast("signed");
      } else {
        setIsOpen(false);
        getSignInfo("successSignIn");
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
        getSignInfo("successSignUp");
      }
    }
  };

  const googleSignIn = async () => {
    firebaseAuthGoogleSignIn();
    const googleEmail = await firebaseAuthGoogleSignIn.email;
    setIsOpen(false);
    setEmail(googleEmail);
    getSignInfo("successSignIn");
  };

  return (
    <>
      <Container ref={signModal}>
        <section className="user-null none">
          <FormCard>
            <TabTitle>
              <a
                className={signInactive}
                href="true"
                data-value="signin"
                onClick={handleSwitchTab}
              >
                Sign In
              </a>
              <a
                className={signUpactive}
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
                onChange={handleChangeEmail}
                borderColor={validColor.email}
                required
              />
              <span className="floating-label">Email</span>
            </InputGroup>
            {displayValidationErrors("email")}
            <InputGroup>
              <Input
                className="u-full-width"
                id="password"
                type="password"
                onChange={handleChangePassword}
                borderColor={validColor.password}
                required
              />
              <span className="floating-label">Password</span>
            </InputGroup>

            {displayValidationErrors("password")}

            {signInactive === "active" ? (
              <ForgetPasswordText
                onClick={() => {
                  setIsOpen(false);
                  forgetModal.current.open();
                }}
              >
                Forget password？
              </ForgetPasswordText>
            ) : null}

            {signInactive === "active" ? (
              <InputGroup flexDirection="column">
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
      <Toast toastList={list} autoDelete dismissTime={5000} />
    </>
  );
};

Sign.propTypes = {
  setIsOpen: PropTypes.func,
  forgetModal: PropTypes.objectOf(PropTypes.objectOf(PropTypes.func)),
  signType: PropTypes.string,
  getSignInfo: PropTypes.func,
};

Sign.defaultProps = {
  setIsOpen: undefined,
  signType: "signin",
  forgetModal: undefined,
  getSignInfo: undefined,
};

export default Sign;
