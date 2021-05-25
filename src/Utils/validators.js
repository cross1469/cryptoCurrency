const validator = {
  email: {
    rules: [
      {
        // eslint-disable-next-line no-useless-escape
        test: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
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
