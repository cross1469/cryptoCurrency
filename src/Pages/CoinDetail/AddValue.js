import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AutosizeInput from "react-input-autosize";
import { useDispatch, useSelector } from "react-redux";
import { updateUsdtPrice } from "../../Redux/Actions/actionCreator";
import { firebaseWriteCoinAsset } from "../../Utils/firebase";
import Toast from "../../Component/Toast";
import checkIcon from "../../images/check.svg";
import errorIcon from "../../images/error.svg";

const BuySellStyle = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  border-width: 2px 1px 1px;
  border-style: solid;
  border-color: #f0b90b rgb(236, 239, 241) rgb(236, 239, 241);
  border-image: initial;
  border-radius: 4px;
  box-shadow: rgb(17 51 83 / 2%) 0px 4px 12px 0px;
  padding-top: 0px;
`;

const BuySellContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 1 0%;
  min-width: 0px;
`;

const CryptoContainer = styled.div`
  display: flex;
  flex: 1 1 0%;
  z-index: 0;
  transition: z-index 0ms ease-out 1000ms;
`;

const TrasitionerContainer = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: none 0s ease 0s;
`;

const ModuleFade = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  user-select: none;
  align-self: stretch;
  flex-direction: column;
  flex: 1 1 0%;
  justify-content: space-between;
  width: 100%;
  border-radius: 4px;
  max-width: 100%;
`;

const BuySellHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  min-height: 64px;
  padding-top: 2px;
  border-bottom: none;
  span {
    text-align: center;
    pointer-events: none;
    width: 100%;
    padding: 0px 24px;
    font-weight: 500;
    line-height: 1.5;
    font-size: 18px;
    display: inline-block;
    word-break: break-word;
  }
`;

const BuySellBody = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  flex: 1 0 0%;
  padding-top: 32px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 0px;
  @media only screen and (max-width: 768px) {
    padding-top: 0px;
  }
`;

const BuySellBodyItem = styled.div`
  display: flex;
  flex-direction: column;
  span {
    flex-grow: 0;
    flex-shrink: 0;
    height: 16px;
  }
`;

const BuySellBodyInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 60px;
  flex-direction: row;
  overflow: hidden;
  height: 60px;
`;

const BuySellBodyInputContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  transform: scale(1);
  flex: 1 1 0%;
  max-width: 250px;
`;

const BuySellInputText = styled.div`
  display: flex;
  align-items: baseline;
  text-align: left;
  color: #f0b90b;
  font-weight: 400;
  animation: 0.5s ease 0s 1 normal none running hBgzBc;
  span {
    font-weight: 500;
    color: rgba(#f0b90b, 0.3);
    font-size: 31px;
    line-height: 1.5;
    align-self: flex-start;
    margin-top: 8px;
  }
  input {
    font-size: 62px;
    text-align: left;
    color: #f0b90b;
    font-weight: 400;
    background-color: #121212;
    width: 40px;
    padding: 0px;
    margin: 0px;
    box-shadow: none;
    border: none;
    overflow: hidden;
    outline: none;
  }
`;

const BuySellBodyButton = styled.button`
  position: relative;
  width: 100%;
  margin: 0px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 80ms ease-in-out 0s;
  padding: 24px;
  font-size: 16px;
  border: 1px solid #f0b90b;
  color: #fff;
  :hover {
    background-image: linear-gradient(
      rgb(255, 226, 81) 0%,
      rgb(237, 196, 35) 100%
    );
    color: #000;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    pointer-events: none;
    flex-wrap: nowrap;
    white-space: nowrap;
    font-weight: 500;
  }
`;

const BuySellFooter = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  min-height: 56px;
  padding-right: 24px;
  padding-left: 24px;
  justify-content: space-between;
  span {
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    transition: color 0.15s ease-out, opacity 0.15s ease-out;
    margin: 0;
    color: #95a1bb;
    :last-child {
      color: #fff;
    }
  }
`;

const AddValue = (props) => {
  const dispatch = useDispatch();
  const usdtQty = useSelector((state) => state.coinDetailReducer.usdtQty);

  const [addValue, setAddValue] = useState("");

  const { email } = props;

  const [list, setList] = useState([]);
  let toastProperties = null;

  const handlAddValueInput = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setAddValue(e.target.value);
    }
  };

  const showToast = (type) => {
    const id = Math.floor(Math.random() * 101 + 1);
    switch (type) {
      case "success":
        toastProperties = {
          id,
          title: "Success",
          description: "加值成功",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        };
        break;
      case "danger":
        toastProperties = {
          id,
          title: "Danger",
          description: "加值前，請先登入",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      case "dangerTotal":
        toastProperties = {
          id,
          title: "Danger",
          description: "金額不得為 0",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        break;
      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  };

  const handleClickAddValue = () => {
    const total = Number(usdtQty) + Number(addValue);
    if (email && addValue > 0) {
      firebaseWriteCoinAsset(email, "USDT", total);
      dispatch(updateUsdtPrice(total));
      setAddValue("");
      showToast("success");
    } else if (!addValue) {
      showToast("dangerTotal");
    } else {
      showToast("danger");
    }
  };

  return (
    <>
      <BuySellStyle>
        <BuySellContainer>
          <CryptoContainer>
            <TrasitionerContainer>
              <ModuleFade>
                <ContentContainer>
                  <BuySellHeader>
                    <span>Deposit</span>
                  </BuySellHeader>
                  <BuySellBody>
                    <BuySellBodyItem>
                      <BuySellBodyInput>
                        <BuySellBodyInputContainer>
                          <BuySellInputText>
                            <span>USDT$</span>
                            <AutosizeInput
                              inputMode="decimal"
                              inputStyle={{
                                fontSize: 54,
                              }}
                              adjustsFontSizeToFit
                              placeholder="0"
                              value={addValue}
                              onChange={handlAddValueInput}
                            />
                          </BuySellInputText>
                        </BuySellBodyInputContainer>
                      </BuySellBodyInput>
                    </BuySellBodyItem>
                    <BuySellBodyItem>
                      <span />
                      <BuySellBodyButton onClick={handleClickAddValue}>
                        <span>Deposit</span>
                      </BuySellBodyButton>
                    </BuySellBodyItem>
                  </BuySellBody>
                  <BuySellFooter>
                    <span>USDT</span>
                    <span>{Number(usdtQty).toFixed(2)}</span>
                  </BuySellFooter>
                </ContentContainer>
              </ModuleFade>
            </TrasitionerContainer>
          </CryptoContainer>
        </BuySellContainer>
      </BuySellStyle>
      <Toast toastList={list} autoDelete dismissTime={5000} />
    </>
  );
};

AddValue.propTypes = {
  email: PropTypes.string.isRequired,
};

export default AddValue;
