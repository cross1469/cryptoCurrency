import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  color,
  space,
  typography,
  flexbox,
  position,
  border,
  layout,
} from "styled-system";
import { addChatData, readChatData } from "../../Utils/firebase";
import Toast from "../../Component/Toast";
import errorIcon from "../../images/error.svg";

const OpenChat = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  ${color}
  ${space} 
  ${typography} 
  ${flexbox}
  ${position}
  ${layout}
`;

const MessageInput = styled.input`
  width: 100%;
  ${color}
  ${space}
  ${flexbox}
  ${typography}
`;

const SendMessage = styled.button`
  outline: none;
  border: none;
  ${color}
  ${space}
  ${flexbox}
  ${typography}
`;

const ChatForm = styled.div`
  height: calc(100vh - 88px);
  width: 30%;
  ${position}
  ${color}
  ${border}
  ${layout}
  @media only screen and (max-width: 768px) {
    width: 50%;
  }

  @media only screen and (max-width: 576px) {
    width: 70%;
  }
`;

const SubmitChat = styled.form`
  display: flex;
  width: 100%;
  ${flexbox}
  ${position}
`;

const ChatDataItem = styled.li`
  ${color}
  ${space}
  ${typography}
`;

const ChatData = styled.ul`
  ${position}
`;

const ChatTitle = styled.div`
  display: flex;
  ${color}
  ${space}
  ${typography}
  ${flexbox}
`;

const Close = styled.div`
  cursor: pointer;
  ${color}
  ${space}
  ${typography}
`;

const Chat = (props) => {
  const { email } = props;
  const [chatDatas, setChatDatas] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [toggleChat, setToggleChat] = useState("none");
  const [toggleChatBtn, setToggleChatBtn] = useState("block");
  const [list, setList] = useState([]);
  let toastProperties = null;

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const showToast = (type) => {
    const id = Math.floor(Math.random() * 101 + 1);
    switch (type) {
      case "dangerChat":
        toastProperties = {
          id,
          title: "Danger",
          description: "送出前，請先登入",
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
          account: email,
          messages: trimmedMessage,
        });
      }
      setNewMessage("");
    } else {
      showToast("dangerChat");
    }
  };

  const HandleOpenChat = (e) => {
    e.preventDefault();
    setToggleChat("block");
    setToggleChatBtn("none");
  };

  const handleCloseChat = (e) => {
    e.preventDefault();
    setToggleChat("none");
    setToggleChatBtn("block");
  };

  useEffect(() => readChatData(setChatDatas), [email]);

  const renderChatData = () =>
    chatDatas.map((chatData) => {
      const { timestamp } = chatData;
      const time = new Date(timestamp).toLocaleTimeString();
      return (
        <ChatDataItem
          key={chatData.id}
          color="black"
          fontFamily="Roboto"
          fontSize={16}
          mb={3}
          ml={2}
        >
          <div>{chatData.account}</div>
          <div>{chatData.messages}</div>
          <div>{time}</div>
        </ChatDataItem>
      );
    });

  return (
    <>
      <ChatForm
        position="fixed"
        bottom="0"
        right="0"
        border="1px solid"
        bg="white"
        display={toggleChat}
      >
        <ChatTitle
          fontFamily="Roboto"
          fontSize={32}
          fontWeight="bold"
          mt={3}
          ml={2}
          justifyContent="space-between"
        >
          Chat Room
          <Close mr={3} onClick={handleCloseChat}>
            X
          </Close>
        </ChatTitle>
        <ChatData position="absolute" bottom={32}>
          {renderChatData()}
        </ChatData>
        <SubmitChat
          onSubmit={handleOnSubmit}
          position="absolute"
          bottom="0"
          right="0"
        >
          <MessageInput
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
            px={2}
            py={2}
            fontFamily="Roboto"
            fontSize={16}
            flexGrow={3}
            ml={2}
          />
          <SendMessage
            type="submit"
            disabled={!newMessage}
            ml={2}
            px={3}
            py={2}
            color="white"
            bg="#02c077"
            fontFamily="Roboto"
            fontSize={16}
            flexGrow={1}
          >
            Send
          </SendMessage>
        </SubmitChat>
      </ChatForm>
      <OpenChat
        color="white"
        bg="#02c077"
        px={{ md: 3, lg: 4 }}
        py={{ md: 3, lg: 3 }}
        fontFamily="Roboto"
        fontSize={{ md: 12, lg: 16 }}
        position="fixed"
        bottom="0"
        right="0"
        onClick={HandleOpenChat}
        display={toggleChatBtn}
      >
        Open Chat
      </OpenChat>
      <Toast toastList={list} autoDelete dismissTime={5000} />
    </>
  );
};

Chat.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Chat;
