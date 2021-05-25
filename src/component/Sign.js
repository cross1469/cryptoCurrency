import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import {
  firebaseAuthSignIn,
  firebaseAuthSignUp,
  subscribeUserData,
} from "../Utils/firebase";
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
    border: 1px solid #00a7e5;
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

const Sign = () => {
  const [inputType, setInputType] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInactive, setSignInActive] = useState("active");
  const [signUpactive, setSignUpActive] = useState(null);
  const [emailInfo, setEmailInfo] = useState("");

  const [list, setList] = useState([]);
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

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
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

  useEffect(() => {
    subscribeUserData((userEmail) => setEmailInfo(userEmail));
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
        showToast("successSignUp");
      }
    }
  };

  return (
    <>
      <input id="type" type="hidden" value="signin" />
      <Container>
        <section className="user-null none">
          <FormCard>
            <TabTitle>
              <a
                className={signInactive}
                href
                data-value="signin"
                onClick={handleSwitchTab}
              >
                登入
              </a>
              <a
                className={signUpactive}
                href
                data-value="create"
                onClick={handleSwitchTab}
              >
                註冊
              </a>
            </TabTitle>
            <InputGroup color="#000" fontFamily="Roboto" mb={1} pr={2}>
              <span>帳號：</span>
              <Input
                className="u-full-width"
                id="email"
                type="email"
                placeholder="輸入帳號"
                onChange={handleChangeEmail}
                mb={2}
              />
            </InputGroup>
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
            <ForgetPasswordText mb={2}>忘記密碼？</ForgetPasswordText>
            <InputGroup>
              <Button id="sign-up" type="button" onClick={checkType}>
                登入
              </Button>
            </InputGroup>
          </FormCard>
        </section>
        <Toast toastList={list} autoDelete dismissTime={5000} />
      </Container>
    </>
  );
};

export default Sign;
