import React, { useState, useContext } from "react";
import styled from "styled-components";
import { firebaseAuthForget } from "../Utils/firebase";
import { ShowToastContext } from "../context/Context";
import validators from "../Utils/validators";

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  h3 {
    color: #f0b90b;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
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
  margin-top: 24px;
  &:hover {
    background-color: #ffe251;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  span {
    flex: 0 0 auto;
  }
  input[type="text"] {
    appearance: none;
    :focus {
      border: 1px solid #f0b90b;
      outline: none;
    }
  }
  .floating-label {
    position: absolute;
    pointer-events: none;
    top: 20px;
    left: 9px;
    transition: 0.2s ease all;
    color: #c3c0c0;
  }
  input:focus ~ .floating-label,
  input:not(:focus):valid ~ .floating-label {
    top: -20px;
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
  :hover {
    border-color: #f0b90b;
  }
`;

const Errors = styled.div`
  text-align: left;
  .error {
    font-size: 12px;
    color: red;
  }
`;

const Forget = () => {
  const [email, setEmail] = useState("");
  const showToast = useContext(ShowToastContext);
  const [validColor, setValidColor] = useState("#f1f3f5");

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
      }
    });
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

      return <Errors>{errors}</Errors>;
    }
    return result;
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    updateValidators("email", e.target.value);
  };

  return (
    <>
      <TitleContainer>
        <h3>Forget password</h3>
      </TitleContainer>
      <InputGroup>
        <Input
          className="u-full-width"
          id="email"
          type="text"
          onChange={handleChangeEmail}
          borderColor={validColor}
          required
        />
        <span className="floating-label">Email</span>
      </InputGroup>
      {displayValidationErrors("email")}
      <BtnContainer>
        <Button id="forget-password" type="button" onClick={checkType}>
          Reset
        </Button>
      </BtnContainer>
    </>
  );
};

export default Forget;
