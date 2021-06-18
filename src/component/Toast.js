import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { color } from "styled-system";
import PropTypes from "prop-types";

const ToastContainer = styled.div`
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;
  z-index: 999999;
  top: 56px;
  right: 14px;
  transition: transform 0.6s ease-in-out;
  animation: toast-in-right 0.7s;

  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const Notification = styled.div`
  background: #fff;
  transition: 0.3s ease;
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  margin: 0 0 6px;
  padding: 30px;
  margin-bottom: 15px;
  width: 300px;
  max-height: 100px;
  border-radius: 3px 3px 3px 3px;
  box-shadow: 0 0 10px #999;
  color: #000;
  opacity: 0.9;
  background-position: 15px;
  background-repeat: no-repeat;
  width: 365px;
  color: #fff;
  padding: 20px 15px 10px 10px;
  top: 12px;
  right: 12px;
  transition: transform 0.6s ease-in-out;
  animation: toast-in-right 0.7s;
  ${color}
`;

const NotificationTitle = styled.p`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 6px;
  width: 300px;
  height: 18px;
`;

const NotificationMessage = styled.p`
  margin: 0;
  text-align: left;
  height: 18px;
  margin-left: -1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CloseButton = styled.button`
  position: relative;
  right: -0.3em;
  top: -0.3em;
  float: right;
  font-weight: 700;
  color: #fff;
  outline: none;
  border: none;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.8;
  line-height: 1;
  font-size: 16px;
  padding: 0;
  cursor: pointer;
  background: 0 0;
  border: 0;
`;

const NotificationImage = styled.div`
  float: left;
  margin-right: 15px;
  img {
    width: 30px;
    height: 30px;
  }
`;

const Toast = (props) => {
  const { toastList, autoDelete, dismissTime } = props;
  const [list, setList] = useState(toastList);

  const deleteToast = useCallback(
    (id) => {
      const listItemIndex = list.findIndex((e) => e.id === id);
      const toastListItem = toastList.findIndex((e) => e.id === id);
      list.splice(listItemIndex, 1);
      toastList.splice(toastListItem, 1);
      setList([...list]);
    },
    [list, toastList]
  );

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, dismissTime);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, dismissTime, list, deleteToast]);

  return (
    <>
      <ToastContainer>
        {list.map((toast) => (
          <Notification key={toast.id} bg={toast.backgroundColor}>
            <CloseButton onClick={() => deleteToast(toast.id)}>X</CloseButton>
            <NotificationImage>
              <img src={toast.icon} alt="" />
            </NotificationImage>
            <div>
              <NotificationTitle>{toast.title}</NotificationTitle>
              <NotificationMessage>{toast.description}</NotificationMessage>
            </div>
          </Notification>
        ))}
      </ToastContainer>
    </>
  );
};

Toast.propTypes = {
  toastList: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  autoDelete: PropTypes.bool.isRequired,
  dismissTime: PropTypes.number.isRequired,
};

export default Toast;
