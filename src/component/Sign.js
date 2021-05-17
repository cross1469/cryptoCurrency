import React, { useState } from "react";
import styled from "styled-components";
import { firebaseAuthSignIn, firebaseAuthSignUp } from "../Utils/firebase";
import catInput from "../images/cat_input.svg";
import catBtn from "../images/cat_btn.svg";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100vh;
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
  a {
    display: block;
    width: 100%;
    line-height: 2;
    border-bottom: 1px solid rgba(#00a7e5, 0.7);
    text-decoration: none;
    color: rgba(#00a7e5, 0.5);
  }

  &.active {
    background: rgba(#00a7e5, 0.7);
    color: #fff;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  label {
    flex: 0 0 auto;
    margin-bottom: 0;
    padding-right: 0.5rem;
  }
  input[type="email"],
  input[type="password"] {
    appearance: none;
  }
  input[type="email"]:focus,
  input[type="password"]:focus {
    border: 1px solid #00a7e5;
    outline: 0;
  }
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

  const handleSwitchTab = (e) => {
    e.preventDefault();
    setInputType(e.target.dataset.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const checkType = () => {
    if (inputType === "signin") {
      console.log(1);
      firebaseAuthSignIn(email, password);
    } else if (inputType === "create") {
      console.log(2);
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
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="active"
                href="#"
                data-value="signin"
                onClick={handleSwitchTab}
              >
                登入
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" data-value="create" onClick={handleSwitchTab}>
                註冊
              </a>
            </TabTitle>
            <InputGroup>
              <input
                className="u-full-width"
                id="email"
                type="email"
                placeholder="輸入帳號"
                onChange={handleChangeEmail}
              />
            </InputGroup>
            <InputGroup>
              <input
                className="u-full-width"
                id="password"
                type="password"
                placeholder="輸入密碼"
                onChange={handleChangePassword}
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
