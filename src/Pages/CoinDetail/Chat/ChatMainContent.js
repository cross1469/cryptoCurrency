import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars-2";
import { readChatData } from "../../../Utils/firebase";
import { EmailContext } from "../../../context/Context";

const ChatMain = styled.main`
  box-sizing: border-box;
  width: 100%;
  padding: 24px 16px 8px;
  line-height: 24px;
  color: #d9d9d9;
  flex: 1 1 auto;
  height: 55vh;
  background-color: #14151a;
`;

const ChatData = styled.article`
  position: relative;
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
  padding: 0;
  display: flex;
  flex-direction: column;
  :last-child {
    margin-bottom: 0px;
  }
`;

const ChatDataContainer = styled.div`
  clear: both;
`;

const ChatDataItem = styled.div`
  position: relative;
  background: #2b2f36;
  text-align: left;
  width: 70%;
  padding: 10px 15px;
  border-radius: 6px;
  border: 1px solid #2b2f36;
  float: left;
  left: 20px;
  margin-bottom: 20px;
  .account {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 8px;
  }
  .message {
    font-size: 16px;
    line-height: 18px;
    margin-bottom: 8px;
    a {
      color: #f0b90b;
      font-size: 16px;
      line-height: 18px;
      cursor: pointer;
    }
  }
  .time {
    font-size: 12px;
    line-height: 12px;
  }
  ::before {
    content: "";
    position: absolute;
    visibility: visible;
    top: -1px;
    left: -10px;
    border: 10px solid transparent;
    border-top: 10px solid #2b2f36;
  }
  ::after {
    content: "";
    position: absolute;
    visibility: visible;
    top: 0px;
    left: -8px;
    border: 10px solid transparent;
    border-top: 10px solid #2b2f36;
    clear: both;
  }
`;

const UserChatDataItem = styled.div`
  position: relative;
  background: #2b2f36;
  text-align: right;
  width: 70%;
  padding: 10px 15px;
  border-radius: 6px;
  border: 1px solid #2b2f36;
  float: right;
  right: 20px;
  margin-bottom: 20px;
  .account {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 8px;
  }
  .message {
    font-size: 16px;
    line-height: 18px;
    margin-bottom: 8px;
    a {
      color: #f0b90b;
      font-size: 16px;
      line-height: 18px;
      cursor: pointer;
    }
  }
  .time {
    font-size: 12px;
    line-height: 12px;
  }
  ::before {
    content: "";
    position: absolute;
    visibility: visible;
    top: -1px;
    right: -10px;
    border: 10px solid transparent;
    border-top: 10px solid #2b2f36;
  }
  ::after {
    content: "";
    position: absolute;
    visibility: visible;
    top: 0px;
    right: -8px;
    border: 10px solid transparent;
    border-top: 10px solid #2b2f36;
    clear: both;
  }
`;

const ChatMainContent = (props) => {
  const [chatDatas, setChatDatas] = useState([]);
  const ref = useRef();
  const email = useContext(EmailContext);
  const { toggleChat } = props;

  const renderThumb = ({ style }) => {
    const thumbStyle = {
      backgroundColor: "#2f3336",
      width: "3px",
      borderRadius: "3px",
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  };

  useEffect(() => readChatData(setChatDatas), []);

  useEffect(() => {
    ref.current.scrollToBottom();
  }, [chatDatas, toggleChat]);

  const renderChatData = () =>
    chatDatas.map((chatData) => {
      const { timestamp } = chatData;
      const time = new Date(timestamp).toLocaleTimeString();
      const pattern = /\B@[a-z0-9]+/gi;
      const atSymbol = chatData.messages.match(pattern);
      const modMessages = chatData.messages.replace(atSymbol, `,${atSymbol},`);
      let chatDataNewMessages;
      if (atSymbol) {
        const symbol = atSymbol[0].replace("@", "");
        chatDataNewMessages = modMessages.split(",").map((item) =>
          item.match(atSymbol) ? (
            <Link key={symbol} to={`/coinDetail/${symbol}`}>
              {atSymbol}
            </Link>
          ) : (
            item
          )
        );
      }

      if (email === null) {
        return (
          <ChatDataContainer key={chatData.id}>
            <ChatDataItem>
              <div className="account">{chatData.account}</div>
              <div className="message">
                {chatData.messages.match(pattern)
                  ? chatDataNewMessages
                  : chatData.messages}
              </div>
              <div className="time">{time}</div>
            </ChatDataItem>
          </ChatDataContainer>
        );
      }
      if (chatData.account === email.substring(0, email.lastIndexOf("@"))) {
        return (
          <ChatDataContainer key={chatData.id}>
            <UserChatDataItem>
              <div className="account">{chatData.account}</div>
              <div className="message">
                {chatData.messages.match(pattern)
                  ? chatDataNewMessages
                  : chatData.messages}
              </div>
              <div className="time">{time}</div>
            </UserChatDataItem>
          </ChatDataContainer>
        );
      }
      return (
        <ChatDataContainer key={chatData.id}>
          <ChatDataItem>
            <div className="account">{chatData.account}</div>
            <div className="message">
              {chatData.messages.match(pattern)
                ? chatDataNewMessages
                : chatData.messages}
            </div>
            <div className="time">{time}</div>
          </ChatDataItem>
        </ChatDataContainer>
      );
    });

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      renderThumbVertical={renderThumb}
      ref={(s) => {
        ref.current = s;
      }}
      autoHeight
      autoHeightMin={450}
    >
      <ChatMain>
        <ChatData>{renderChatData()}</ChatData>
      </ChatMain>
    </Scrollbars>
  );
};

ChatMainContent.propTypes = {
  toggleChat: PropTypes.bool.isRequired,
};

export default ChatMainContent;
