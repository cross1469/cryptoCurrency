import React, { useState } from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import { firebaseAuthSignIn, firebaseAuthSignUp } from "../Utils/firebase";
import catInput from "../images/cat_input.svg";
import catBtn from "../images/cat_btn.svg";

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

const Cat = styled.div`
  position: relative;
  display: block;
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
    border-bottom: 1px solid rgba(0, 167, 229, 0.7);
    text-decoration: none;
    color: rgba(0, 167, 229, 0.5);
  }

  a.active {
    background: rgba(0, 167, 229, 0.7);
    color: #fff;
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
  padding: 0.25rem 3rem;
  line-height: 1;
  background: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
  outline: none;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  border: 2px solid #00a7e5;
  color: #00a7e5;
  svg {
    transition: transform 0.2s, fill 0.2s;
  }
  &:hover {
    background: #008bbf;
    border-color: #008bbf;
    color: #fff;
    svg {
      transform: rotateY(180deg);
    }
    path {
      fill: #fff;
    }
  }
`;

const Sign = () => {
  const [inputType, setInputType] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInactive, setSignInActive] = useState("active");
  const [signUpactive, setSignUpActive] = useState(null);

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

  const checkType = () => {
    if (inputType === "signin") {
      firebaseAuthSignIn(email, password);
    } else if (inputType === "create") {
      firebaseAuthSignUp(email, password);
    }
  };

  return (
    <>
      <input id="type" type="hidden" value="signin" />
      <Container>
        <section className="user-null none">
          <FormCard>
            <Cat>
              <img src={catInput} alt="input" />
            </Cat>
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
            <InputGroup>
              <Button id="sign-up" type="button" onClick={checkType}>
                <img src={catBtn} alt="btn" />
              </Button>
            </InputGroup>
          </FormCard>
        </section>
      </Container>
    </>
  );
};

export default Sign;
