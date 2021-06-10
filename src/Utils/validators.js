const validator = {
  email: {
    rules: [
      {
        test: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "E-mail must be a valid email",
      },
    ],
    errors: [],
    valid: false,
    state: "",
  },
  password: {
    rules: [
      {
        test: (value) => value.length >= 6,
        message: "Password must not be shorter than 6 characters",
      },
    ],
    errors: [],
    valid: false,
    state: "",
  },
};

export default validator;
