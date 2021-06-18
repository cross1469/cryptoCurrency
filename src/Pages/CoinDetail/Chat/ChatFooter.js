import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars-2";
import { addChatData } from "../../../Utils/firebase";
import { ReactComponent as Send } from "../../../images/send.svg";
import { ShowToastContext, EmailContext } from "../../../context/Context";

const ChatFooterContainer = styled.footer`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 16px;
  border-top: 1px solid #2f3336;
  align-items: center;
  justify-content: space-around;
  flex: 0 0 auto;
  background-color: #14151a;
`;

const ChatInputContainer = styled.div`
  flex: 10;
  position: relative;
  overflow-y: visible;
  display: inline-block;
  .inputValueContainer {
    position: relative;
    font-size: 14px;
    font-weight: normal;
  }
  .inputValue {
    display: inline-block;
    color: transparent;
    width: 100%;
    border: none;
    padding: 1px;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    text-align: start;
    white-space: pre;
    color: #d9d9d9;
    span {
      visibility: hidden;
    }
    strong {
      color: #f0b90b;
      z-index: 1;
      position: relative;
    }
  }
`;

const ChatInput = styled.input`
  top: -2px;
  left: 0px;
  width: 100%;
  border: none;
  outline: none;
  margin: 0px;
  display: block;
  padding: 1px;
  position: absolute;
  font-size: inherit;
  box-sizing: border-box;
  font-family: inherit;
  letter-spacing: inherit;
  background-color: transparent;
  color: #d9d9d9;
`;

const ChatSendBtnContainer = styled.div`
  flex: 1;
  text-align: center;
  cursor: pointer;
  svg {
    width: 18px;
    height: 18px;
    fill: #f0b90b;
  }
`;

const SuggestionUl = styled.ul`
  position: absolute;
  bottom: 38px;
  width: 100%;
  margin: 0 auto;
  max-height: 250px;
  overflow-y: auto;
  background-color: #2b2f36;
  border-radius: 4px;
`;

const SuggestionLi = styled.li`
  height: 30px;
  line-height: 18px;
  cursor: pointer;
  padding: 16px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  :hover {
    background-color: #14151a;
  }
`;

const ChatFooter = (props) => {
  const { coinUsdtSymbol } = props;
  const [isTypingName, setIsTypingName] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [coinName, setCoinName] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const showToast = useContext(ShowToastContext);
  const email = useContext(EmailContext);

  const handleOnChange = (e) => {
    const lastChar = e.target.value.split("")[e.target.value.length - 1];
    if (lastChar === " " || e.target.value === "") {
      setSuggestions([]);
      setIsTypingName(false);
    }
    if (lastChar === "@") {
      setIsTypingName(true);
    }

    if (isTypingName) {
      const words = e.target.value.split(" ");
      const v = words[words.length - 1].substring(1);
      setCoinName(v);
    }
    setNewMessage(e.target.value);
  };

  const selectedText = (value) => {
    setSuggestions([]);
    setNewMessage(
      newMessage.substr(0, newMessage.length - coinName.length) + value
    );
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const trimmedMessage = newMessage.trim();
      if (trimmedMessage) {
        addChatData({
          account: email.substring(0, email.lastIndexOf("@")),
          messages: trimmedMessage,
        });
      }
      setNewMessage("");
    } else {
      showToast("dangerChat");
    }
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (email) {
        const trimmedMessage = newMessage.trim();
        if (trimmedMessage) {
          addChatData({
            account: email.substring(0, email.lastIndexOf("@")),
            messages: trimmedMessage,
          });
        }
        setNewMessage("");
      } else {
        showToast("dangerChat");
      }
    }
  };

  const renderThumbForSuggest = ({ style }) => {
    const thumbStyle = {
      backgroundColor: "#14151a",
      width: "3px",
      borderRadius: "3px",
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  };

  useEffect(() => {
    const showSuggestions = () => {
      let suggestion = [];
      if (coinName.length > 0) {
        const regex = new RegExp(`^${coinName}`, "i");
        suggestion = coinUsdtSymbol.sort().filter((v) => regex.test(v));
        setSuggestions(suggestion);
      } else {
        setSuggestions([]);
      }
    };
    showSuggestions();
  }, [coinName, coinUsdtSymbol]);

  const renderSuggestions = () => (
    <SuggestionUl>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        renderThumbVertical={renderThumbForSuggest}
        autoHeight
      >
        {suggestions.map((item) => (
          <SuggestionLi key={item} onClick={() => selectedText(item)}>
            {item}
          </SuggestionLi>
        ))}
      </Scrollbars>
    </SuggestionUl>
  );

  const renderInputValue = () => {
    const pattern = /\B@[a-z0-9]+/gi;
    const atSymbol = newMessage.match(pattern);
    const modMessages = newMessage.replace(atSymbol, `,${atSymbol},`);
    if (atSymbol) {
      const symbol = atSymbol[0].replace("@", "");
      const inputValue = modMessages.split(",").map((item) =>
        item.match(atSymbol) ? (
          <strong key={symbol} to={`/coinDetail/${symbol}`}>
            {atSymbol}
          </strong>
        ) : (
          <span key={item}>{item}</span>
        )
      );
      return inputValue;
    }
    return <span>{newMessage}</span>;
  };

  return (
    <ChatFooterContainer>
      <ChatInputContainer>
        <div className="inputValueContainer">
          {renderSuggestions()}
          <div className="inputValue">{renderInputValue()}</div>
          <ChatInput
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            placeholder="Type your message here..."
          />
        </div>
      </ChatInputContainer>
      <ChatSendBtnContainer>
        <Send onClick={handleOnSubmit} disabled={!newMessage} />
      </ChatSendBtnContainer>
    </ChatFooterContainer>
  );
};

ChatFooter.propTypes = {
  coinUsdtSymbol: PropTypes.arrayOf(PropTypes.string),
};

ChatFooter.defaultProps = {
  coinUsdtSymbol: [],
};

export default ChatFooter;
