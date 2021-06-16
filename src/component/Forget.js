import React, { useState, useContext } from "react";
import styled from "styled-components";
import { color, space, typography } from "styled-system";
import { firebaseAuthForget } from "../Utils/firebase";
import { ShowToastContext } from "../context/Context";

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.5rem 2rem;
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
  input[type="email"] {
    appearance: none;
  }
  input[type="email"]:focus {
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

const Forget = () => {
  const [email, setEmail] = useState("");
  const showToast = useContext(ShowToastContext);

  const checkType = async () => {
    const forgetMessage = await firebaseAuthForget(email);
    if (
      forgetMessage === "auth/invalid-email" ||
      forgetMessage === "auth/user-not-found"
    ) {
      showToast("emailError");
    } else {
      showToast("sentResetPassword");
      window.location.reload();
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <InputGroup color="#000" fontFamily="Roboto" mb={1} pr={2}>
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
      <BtnContainer>
        <Button id="forget-password" type="button" onClick={checkType}>
          重設密碼
        </Button>
      </BtnContainer>
    </>
  );
};

export default Forget;
