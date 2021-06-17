import { useState } from "react";
import validators from "../Utils/validators";

const useUpdateValidators = () => {
  const [validColor, setValidColor] = useState({
    email: "#f1f3f5",
    password: "#f1f3f5",
  });

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

  return { validColor, updateValidators };
};

export default useUpdateValidators;
