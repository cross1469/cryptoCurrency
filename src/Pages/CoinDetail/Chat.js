import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { layout } from "styled-system";
import { Scrollbars } from "react-custom-scrollbars-2";
import { addChatData, readChatData } from "../../Utils/firebase";
import Toast from "../../component/Toast";
import errorIcon from "../../images/error.svg";
import { ReactComponent as ChatIcon } from "../../images/speechBubble.svg";
import { ReactComponent as ChatClose } from "../../images/cancel.svg";
import { ReactComponent as ChatRoom } from "../../images/chatRoom.svg";
import { ReactComponent as Send } from "../../images/send.svg";

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
  padding: 10px 10px 10px 10px;
  border-radius: 0 8px 8px 0;
  width: 70%;
  float: left;
  box-shadow: 0 0 2px rgb(0 0 0 / 12%), 0 2px 4px rgb(0 0 0 / 24%);
  background-color: #2b2f36;
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
  }
  .time {
    font-size: 12px;
    line-height: 12px;
  }
`;

const UserChatDataItem = styled.div`
  padding: 10px 10px 10px 10px;
  border-radius: 8px 0px 0px 8px;
  width: 70%;
  float: right;
  box-shadow: 0 0 2px rgb(0 0 0 / 12%), 0 2px 4px rgb(0 0 0 / 24%);
  background-color: #2b2f36;
  margin-bottom: 20px;
  text-align: right;
  .account {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 8px;
  }
  .message {
    font-size: 16px;
    line-height: 18px;
    margin-bottom: 8px;
  }
  .time {
    font-size: 12px;
    line-height: 12px;
  }
`;

const ChatFooter = styled.footer`
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
`;

const ChatInput = styled.input`
  width: 100%;
  margin: 0;
  height: 24px;
  padding: 0 8px;
  font-family: inherit;
  font-size: 16px;
  line-height: 24px;
  color: #d9d9d9;
  background-color: #14151a;
  border: 0;
  outline: none;
  resize: none;
  overflow: hidden;
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

const Chat = (props) => {
  const { email } = props;
  const [chatDatas, setChatDatas] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [toggleChat, setToggleChat] = useState("none");
  const [toggleChatBtn, setToggleChatBtn] = useState("block");
  const [list, setList] = useState([]);
  let toastProperties = null;
  const ref = useRef();

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const showToast = (type) => {
    const id = Math.floor(Math.random() * 101 + 1);
    switch (type) {
      case "dangerChat":
        toastProperties = {
          id,
          title: "Please signin",
          description: "Before sending a message, please signin",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      default:
        setList([]);
    }

    setList([...list, toastProperties]);
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

  const handleOpenChat = (e) => {
    e.preventDefault();
    setToggleChat("block");
    setToggleChatBtn("none");
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

  const handleCloseChat = (e) => {
    e.preventDefault();
    setToggleChat("none");
    setToggleChatBtn("block");
  };

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
      if (email === null) {
        return (
          <ChatDataContainer key={chatData.id}>
            <ChatDataItem>
              <div className="account">{chatData.account}</div>
              <div className="message">{chatData.messages}</div>
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
              <div className="message">{chatData.messages}</div>
              <div className="time">{time}</div>
            </UserChatDataItem>
          </ChatDataContainer>
        );
      }
      return (
        <ChatDataContainer key={chatData.id}>
          <ChatDataItem>
            <div className="account">{chatData.account}</div>
            <div className="message">{chatData.messages}</div>
            <div className="time">{time}</div>
          </ChatDataItem>
        </ChatDataContainer>
      );
    });

  return (
    <>
      <ChatForm display={toggleChat}>
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
            <button type="button" onClick={handleCloseChat}>
              <ChatClose />
            </button>
          </ChatCloseContainer>
        </ChatHeader>
        <ChatMain>
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            renderThumbVertical={renderThumb}
            ref={(s) => {
              ref.current = s;
            }}
          >
            <ChatData>{renderChatData()}</ChatData>
          </Scrollbars>
        </ChatMain>

        <ChatFooter>
          <ChatInputContainer>
            <ChatInput
              type="text"
              value={newMessage}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              placeholder="Type your message here..."
            />
          </ChatInputContainer>
          <ChatSendBtnContainer>
            <Send onClick={handleOnSubmit} disabled={!newMessage} />
          </ChatSendBtnContainer>
        </ChatFooter>
      </ChatForm>
      <OpenChat onClick={handleOpenChat} display={toggleChatBtn}>
        <ChatIcon />
      </OpenChat>
      <Toast toastList={list} autoDelete dismissTime={3000} />
    </>
  );
};

Chat.propTypes = {
  email: PropTypes.string,
};

Chat.defaultProps = {
  email: "",
};

export default Chat;
