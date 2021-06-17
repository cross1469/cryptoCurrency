import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import validators from "../Utils/validators";

const Errors = styled.div`
  text-align: left;
  ${space}
  .error {
    font-size: 12px;
    color: red;
  }
`;

const DisplayValidation = (props) => {
  const { field } = props;

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

  return displayValidationErrors(field);
};

export default DisplayValidation;
