import React, { useEffect, useState } from "react";
import styled from "styled-components";
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

const Chat = () => {
  const [chatDatas, setChatDatas] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [toggleChat, setToggleChat] = useState("none");
  const [toggleChatBtn, setToggleChatBtn] = useState("block");

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      addChatData({
        account: "Max",
        messages: trimmedMessage,
      });
    }
    setNewMessage("");
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

  useEffect(() => {
    readChatData(setChatDatas);
    return readChatData(setChatDatas);
  }, []);

  const renderChatData = () =>
    chatDatas.map((chatData) => (
      <ChatDataItem
        key={chatData.id}
        color="black"
        fontFamily="Roboto"
        fontSize={16}
        mb={3}
        ml={2}
      >
        {chatData.messages}
      </ChatDataItem>
    ));

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
        px={4}
        py={3}
        fontFamily="Roboto"
        fontSize={16}
        position="fixed"
        bottom="0"
        right="0"
        onClick={HandleOpenChat}
        display={toggleChatBtn}
      >
        Open Chat
      </OpenChat>
    </>
  );
};

export default Chat;
