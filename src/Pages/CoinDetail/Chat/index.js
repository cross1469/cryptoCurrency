import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { layout } from "styled-system";
import { ReactComponent as ChatIcon } from "../../../images/speechBubble.svg";
import { ReactComponent as ChatClose } from "../../../images/cancel.svg";
import { ReactComponent as ChatRoom } from "../../../images/chatRoom.svg";
import ChatMainContent from "./ChatMainContent";
import ChatFooter from "./ChatFooter";

const OpenChat = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 52px;
  height: 52px;
  color: #d9d9d9;
  background-color: #f0b90b;
  background-position: center center;
  background-repeat: no-repeat;
  box-shadow: 12px 15px 20px 0 rgb(46 61 73 / 15%);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  margin: 16px;
  z-index: 1;
  ${layout}
  svg {
    width: 30px;
    height: 30px;
  }
`;

const ChatForm = styled.section`
  display: flex;
  position: fixed;
  box-shadow: 5px 5px 25px 0 rgb(46 61 73 / 20%);
  flex-direction: column;
  right: 20px;
  bottom: 20px;
  z-index: 1;
  width: 350px;
  max-width: 85vw;
  max-height: 75vh;
  background-color: #14151a;
  border-radius: 8px;
  color: #d9d9d9;
  border: 1px solid #2f3336;
  border-top: 1px solid #f0b90b;
  overflow: hidden;
  ${layout}
  @media only screen and (max-width: 768px) {
    width: 50%;
  }

  @media only screen and (max-width: 576px) {
    width: 70%;
  }
`;

const ChatHeader = styled.header`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 12px 16px;
  color: #d9d9d9;
  background-color: #14151a;
  align-items: center;
  justify-content: space-around;
  flex: 0 0 auto;
  border-bottom: 1px solid #2f3336;
`;

const ChatRoomIconContainer = styled.div`
  flex: 2;
  svg {
    width: 36px;
    height: 36px;
    fill: #d9d9d9;
  }
`;

const ChatTitleContainer = styled.div`
  flex: 6;
  h1 {
    margin: 0;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: #f0b90b;
  }
`;

const ChatCloseContainer = styled.div`
  flex: 2;
  text-align: right;
  button {
    background-color: transparent;
    border: 0;
    outline: none;
    cursor: pointer;
    svg {
      width: 16px;
      height: 16px;
      fill: #d9d9d9;
    }
  }
`;

const Chat = (props) => {
  const { coinUsdtSymbol } = props;

  const [toggleChat, setToggleChat] = useState(false);

  const handleOpenChat = (e) => {
    e.preventDefault();
    setToggleChat(!toggleChat);
  };

  return (
    <>
      <ChatForm display={toggleChat === false ? "none" : "block"}>
        <ChatHeader>
          <ChatRoomIconContainer>
            <ChatRoom />
          </ChatRoomIconContainer>
          <ChatTitleContainer>
            <h1>
              Crypto <br />
              Chat Room
            </h1>
          </ChatTitleContainer>
          <ChatCloseContainer>
            <button type="button" onClick={handleOpenChat}>
              <ChatClose />
            </button>
          </ChatCloseContainer>
        </ChatHeader>
        <ChatMainContent toggleChat={toggleChat} />
        <ChatFooter coinUsdtSymbol={coinUsdtSymbol} />
      </ChatForm>
      <OpenChat
        onClick={handleOpenChat}
        display={toggleChat === false ? "block" : "none"}
      >
        <ChatIcon />
      </OpenChat>
    </>
  );
};

Chat.propTypes = {
  coinUsdtSymbol: PropTypes.arrayOf(PropTypes.string),
};

Chat.defaultProps = {
  coinUsdtSymbol: [],
};

export default Chat;
