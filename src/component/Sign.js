import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { color, flexbox, space, typography } from "styled-system";
import PropTypes from "prop-types";
import {
  firebaseAuthSignIn,
  firebaseAuthSignUp,
  subscribeUserData,
  firebaseAuthGoogleSignIn,
} from "../Utils/firebase";
import validators from "../Utils/validators";
import Toast from "./Toast";
import checkIcon from "../images/check.svg";
import errorIcon from "../images/error.svg";
import warningIcon from "../images/warning.svg";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const FormCard = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 430px;
  padding: 15px;
  text-align: center;
`;

const TabTitle = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 8px;
  a {
    cursor: pointer;
    display: block;
    width: 100%;
    line-height: 2;
    border-bottom: 1px solid #f0b90b;
    text-decoration: none;
    color: #707a8a;
    font-weight: bold;
    font-family: Roboto;
  }

  a.active {
    background-image: linear-gradient(
      rgb(248, 209, 47) 0%,
      rgb(240, 185, 11) 100%
    );
    color: #1e2329;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${flexbox}
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
  input[type="email"]:focus,
  input[type="password"]:focus {
    border: 1px solid #f0b90b;
    outline: none;
  }
`;

const Input = styled.input`
  outline: none;
  border: 1px solid black;
  padding: 4px 8px;
  ${space}
`;

const Button = styled.button`
  display: "inline-block";
  padding: 0.5rem 3rem;
  line-height: 1;
  background-image: linear-gradient(
    rgb(248, 209, 47) 0%,
    rgb(240, 185, 11) 100%
  );
  border-radius: 0.5rem;
  cursor: pointer;
  outline: none;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  border: none;
  color: #212833;
  font-weight: bold;
  margin-bottom: 8px;
  &:hover {
    box-shadow: none;
    background-image: linear-gradient(
      rgb(255, 226, 81) 0%,
      rgb(237, 196, 35) 100%
    );
  }
`;

const ForgetPasswordText = styled.div`
  font-size: 12px;
  text-align: right;
  cursor: pointer;
  font-family: Roboto;
  ${space}
  &:hover {
    color: #1e2329;
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
  const [inputType, setInputType] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInactive, setSignInActive] = useState("active");
  const [signUpactive, setSignUpActive] = useState(null);
  const [emailInfo, setEmailInfo] = useState("");

  const [list, setList] = useState([]);
  const signModal = useRef(null);
  let toastProperties = null;

  const { setIsOpen, forgetModal } = props;

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
        }
      } else if (typeof rule.test === "function") {
        if (!rule.test(value)) {
          validators[fieldName].errors.push(rule.message);
          validators[fieldName].valid = false;
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
      case "successSignIn":
        toastProperties = {
          id,
          title: "Success",
          description: "登入成功",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "successSignUp":
        toastProperties = {
          id,
          title: "Success",
          description: "註冊成功",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "passwordError":
        toastProperties = {
          id,
          title: "Danger",
          description: "密碼錯誤，請重新輸入",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "emailError":
        toastProperties = {
          id,
          title: "Danger",
          description: "Email 錯誤，請重新輸入",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;

      case "signed":
        toastProperties = {
          id,
          title: "Warning",
          description: "已登入",
          backgroundColor: "#f0ad4e",
          icon: warningIcon,
        };
        break;

      case "existed":
        toastProperties = {
          id,
          title: "Warning",
          description: "已有此使用者",
          backgroundColor: "#f0ad4e",
          icon: warningIcon,
        };
        break;
      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  };

  // const resetValidators = () => {
  //   Object.keys(validators).forEach((fieldName) => {
  //     validators[fieldName].errors = [];
  //     validators[fieldName].state = "";
  //     validators[fieldName].valid = false;
  //   });
  // };

  // resetValidators();

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
    firebaseAuthGoogleSignIn();
    const googleEmail = await firebaseAuthGoogleSignIn.email;
    setIsOpen(false);
    setEmail(googleEmail);
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
                登入
              </a>
              <a
                className={signUpactive}
                href="true"
                data-value="create"
                onClick={handleSwitchTab}
              >
                註冊
              </a>
            </TabTitle>
            <InputGroup color="#000" fontFamily="Roboto" mb={1} pr={1}>
              <span>Email：</span>
              <Input
                className="u-full-width"
                id="email"
                type="email"
                placeholder="輸入Email"
                onChange={handleChangeEmail}
                mb={2}
              />
            </InputGroup>
            {displayValidationErrors("email")}
            <InputGroup color="#000" fontFamily="Roboto" mb={1} pr={2}>
              <span>密碼：</span>
              <Input
                className="u-full-width"
                id="password"
                type="password"
                placeholder="輸入密碼"
                onChange={handleChangePassword}
                mb={2}
              />
            </InputGroup>
            {displayValidationErrors("password")}
            <ForgetPasswordText
              mb={2}
              onClick={() => {
                setIsOpen(false);
                forgetModal.current.open();
              }}
            >
              忘記密碼？
            </ForgetPasswordText>
            {signInactive === "active" ? (
              <InputGroup flexDirection="column">
                <Button
                  id="sign-in"
                  type="button"
                  onClick={checkType}
                  disabled={!isFormValid}
                  mb={2}
                >
                  登入
                </Button>
                <Button
                  id="google-sign-in"
                  type="button"
                  onClick={googleSignIn}
                >
                  Google 登入
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
                  註冊
                </Button>
              </InputGroup>
            )}
          </FormCard>
        </section>
        <Toast toastList={list} autoDelete dismissTime={5000} />
      </Container>
    </>
  );
};

Sign.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  forgetModal: PropTypes.objectOf(PropTypes.objectOf(PropTypes.func))
    .isRequired,
};

export default Sign;
