import React, { useState } from "react";
import PropTypes from "prop-types";
import checkIcon from "../images/check.svg";
import errorIcon from "../images/error.svg";
import warningIcon from "../images/warning.svg";
import { ShowToastContext } from "../context/Context";
import Toast from "./Toast";

const ShowToast = (props) => {
  const [list, setList] = useState([]);
  let toastProperties = null;
  const { children } = props;

  const showToast = (type, coin) => {
    const id = Math.floor(Math.random() * 101 + 1);
    switch (type) {
      case "successAddValue":
        toastProperties = {
          id,
          title: "SuccessAddValue",
          description: "Successful add value",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "dangerAddValueLogin":
        toastProperties = {
          id,
          title: "Please login",
          description: "Before adding value, please login",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "dangerAddValueTotal":
        toastProperties = {
          id,
          title: "Danger",
          description: "The value added cannot be 0",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "dangerChat":
        toastProperties = {
          id,
          title: "Please signin",
          description: "Before sending a message, please signin",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "successAddWishList":
        toastProperties = {
          id,
          title: "Add to wish list",
          description: "Successfully add to wish list",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "successRemoveWishList":
        toastProperties = {
          id,
          title: "Remove the wish list",
          description: "Successfully remove the wish list",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "dangerWishList":
        toastProperties = {
          id,
          title: "Please signin",
          description: "Before add your wishlist, please signin",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "successBuyCoin":
        toastProperties = {
          id,
          title: "Success",
          description: "Order successful",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "dangerPlaceOrderSignin":
        toastProperties = {
          id,
          title: "Please signin",
          description: "Before placing your order, please signin",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "dangerTotal":
        toastProperties = {
          id,
          title: "Danger",
          description: "The amount cannot be 0",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "dangerUsdt":
        toastProperties = {
          id,
          title: "Ｐlease deposit",
          description:
            "USDT available amount is not enough, please deposit first",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "dangerCoin":
        toastProperties = {
          id,
          title: "Please reduce the sell quantity",
          description: `The ${coin} quantity is not enough, please reduce the sell quantity`,
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "sentResetPassword":
        toastProperties = {
          id,
          title: "Sent the reset password",
          description: "Please check the mail to receive it.",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "emailError":
        toastProperties = {
          id,
          title: "Email error",
          description: "Email error, please retype",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "successSignOut":
        toastProperties = {
          id,
          title: "Success signout",
          description: "Successful signout",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "dangerPortfolio":
        toastProperties = {
          id,
          title: "Please signin",
          description: "Before accessing the portfolio page, please signin",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "successSignIn":
        toastProperties = {
          id,
          title: "Success signin",
          description: "Successful signin",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "successSignUp":
        toastProperties = {
          id,
          title: "Success signup",
          description: "Successful signup",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "passwordError":
        toastProperties = {
          id,
          title: "Password error",
          description: "Password error, please retype",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "signed":
        toastProperties = {
          id,
          title: "Signed in",
          description: "Signed in",
          backgroundColor: "#f0ad4e",
          icon: warningIcon,
        };
        break;

      case "existed":
        toastProperties = {
          id,
          title: "Already have this user",
          description: "This user already exists",
          backgroundColor: "#f0ad4e",
          icon: warningIcon,
        };
        break;
      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  };

  return (
    <ShowToastContext.Provider value={showToast}>
      {children}
      <Toast toastList={list} autoDelete dismissTime={3000} />
    </ShowToastContext.Provider>
  );
};

ShowToast.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ShowToast;
