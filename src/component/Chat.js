import React, { useEffect, useState } from "react";
import { addChatData, readChatData } from "../Utils/firebase";

const Chat = () => {
  const [chatDatas, setChatDatas] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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

  useEffect(() => {
    readChatData(setChatDatas);
    return readChatData(setChatDatas);
  }, []);

  const renderChatData = () =>
    chatDatas.map((chatData) => <li key={chatData.id}>{chatData.messages}</li>);

  return (
    <>
      <ul>{renderChatData()}</ul>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={handleOnChange}
          placeholder="Type your message here..."
        />
        <button type="submit" disabled={!newMessage}>
          Send
        </button>
      </form>
    </>
  );
};

export default Chat;
