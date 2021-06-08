import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  cloneElement,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const modalElement = document.getElementById("modal-root");

const Modal = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(17, 51, 83, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5em 1em;
  z-index: 999999;
  box-sizing: border-box;
  animation: ${(props) => (props.fade ? "fade-in 1s 1 linear" : null)};
  animation-fill-mode: ${(props) => (props.fade ? "forwards" : null)};
  opacity: ${(props) => (props.fade ? 0 : null)};
`;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ModalClose = styled.div`
  position: absolute;
  right: 15px;
  top: 10px;
  color: #5e5e5e;
  cursor: pointer;
  font-size: 1.25em;
  padding: 7px;
  background: #f6f9fc;
  border: 1px solid #c3c0c0;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  :hover {
    background: rgba(255, 255, 255, 0.989);
  }
`;

const ModalBody = styled.div`
  z-index: 2;
  position: relative;
  margin: 0 auto;
  background-color: #14151a;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 56px 24px 56px;
  width: 30%;
  @media only screen and (max-width: 996px) {
    width: 50%;
  }
  @media only screen and (max-width: 768px) {
    width: 65%;
  }
  @media only screen and (max-width: 576px) {
    width: 85%;
  }
`;

const CustomModal = ({ children, fade = false, defaultOpen = false }, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const close = useCallback(() => setIsOpen(false), []);
  const handleEscape = useCallback(
    (e) => {
      if (e.keyCode === 27) close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.addEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  return createPortal(
    isOpen ? (
      <Modal fade={fade}>
        <ModalOverlay onClick={close} />
        <ModalClose onClick={close}>x</ModalClose>
        <ModalBody>{cloneElement(children, { setIsOpen })}</ModalBody>
      </Modal>
    ) : null,
    modalElement
  );
};

export default forwardRef(CustomModal);
