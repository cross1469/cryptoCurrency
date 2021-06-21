import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ShowToastContext, EmailContext } from "../../../context/Context";
import firebaseAddOrder, {
  firebaseWriteCoinAsset,
  firebaseReadCoinAsset,
} from "../../../Utils/firebase";
import {
  updateUsdtPrice,
  updateCoinPrice,
} from "../../../Redux/Actions/actionCreator";

const BuySellBodyButton = styled.button`
  position: relative;
  width: 100%;
  margin: 0px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 80ms ease-in-out 0s;
  padding: 24px;
  font-size: 16px;
  background-color: #f0b90b;
  :hover {
    background-color: #ffe251;
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

const TradeButton = (props) => {
  const email = useContext(EmailContext);
  const dispatch = useDispatch();
  const showToast = useContext(ShowToastContext);
  const marketPrice = useSelector(
    (state) => state.coinDetailReducer.marketPrice
  );
  const coinsQty = useSelector((state) => state.coinDetailReducer.coinQty);
  const usdtQty = useSelector((state) => state.coinDetailReducer.usdtQty);
  const {
    buyOrSell,
    qty,
    total,
    setInputValue,
    setInputTopContent,
    setInputBottomContent,
    coin,
    inputValue,
    setTotal,
  } = props;

  const calcAssetForUploadOrder = async (
    userEmail,
    coinType,
    coinPriceForUSDT,
    coinQty
  ) => {
    const coinAsset = await firebaseReadCoinAsset(userEmail, coinType);
    const usdtAsset = await firebaseReadCoinAsset(userEmail, "USDT");

    if (buyOrSell === "buy") {
      const allcoinQty = Number(coinAsset.qty) + Number(coinQty);
      const allUsdtQty =
        Number(usdtAsset.qty) - Number(inputValue.replace(/,/g, ""));
      const averageCoinPrice =
        (Number(coinAsset.averagePrice) * Number(coinAsset.qty) +
          Number(coinPriceForUSDT) * Number(coinQty)) /
        allcoinQty;
      firebaseWriteCoinAsset(
        email,
        coin,
        allcoinQty,
        averageCoinPrice,
        coinAsset.profitLoss
      );
      firebaseWriteCoinAsset(email, "USDT", allUsdtQty, 0, 0);
      dispatch(updateUsdtPrice(allUsdtQty));
      dispatch(updateCoinPrice(allcoinQty));
    } else if (buyOrSell === "sell") {
      const allcoinQty =
        Number(coinAsset.qty) - Number(inputValue.replace(/,/g, ""));
      const allUsdtQty =
        Number(usdtAsset.qty) + Number(coinPriceForUSDT * coinQty);
      const averageCoinPrice =
        (Number(coinAsset.averagePrice) * Number(coinAsset.qty) -
          Number(coinPriceForUSDT) * Number(coinQty)) /
        allcoinQty;
      firebaseWriteCoinAsset(
        email,
        coin,
        allcoinQty,
        averageCoinPrice,
        coinAsset.profitLoss
      );
      firebaseWriteCoinAsset(email, "USDT", allUsdtQty, 0, 0);
      dispatch(updateUsdtPrice(allUsdtQty));
      dispatch(updateCoinPrice(allcoinQty));
    }
  };

  const handleClickUploadOrder = () => {
    if (buyOrSell === "buy") {
      if (email && total > 0 && usdtQty >= Number(total)) {
        const orderData = {
          coinPrice: marketPrice,
          coinType: coin,
          qty,
          tradingType: "market",
          type: buyOrSell,
        };
        firebaseAddOrder(orderData, email);
        calcAssetForUploadOrder(email, coin, marketPrice, qty);
        setInputTopContent("USDT");
        setInputBottomContent(coin);
        setInputValue("");
        setTotal(0);
        showToast("successBuyCoin");
      } else if (!email) {
        showToast("dangerPlaceOrderSignin");
      } else if (!total) {
        showToast("dangerTotal");
      } else if (usdtQty < total) {
        showToast("dangerUsdt");
      }
    } else if (buyOrSell === "sell") {
      if (email && total > 0 && coinsQty >= Number(total)) {
        const orderData = {
          coinPrice: marketPrice,
          coinType: coin,
          qty,
          tradingType: "market",
          type: buyOrSell,
        };
        firebaseAddOrder(orderData, email);
        calcAssetForUploadOrder(email, coin, marketPrice, qty);
        setInputTopContent(coin);
        setInputBottomContent("USDT");
        setInputValue("");
        setTotal(0);
        showToast("successBuyCoin");
      } else if (!email) {
        showToast("dangerPlaceOrderSignin");
      } else if (!total) {
        showToast("dangerTotal");
      } else if (coinsQty < total) {
        showToast("dangerCoin", coin);
      }
    }
  };

  return (
    <BuySellBodyButton onClick={handleClickUploadOrder}>
      <span>Trade</span>
    </BuySellBodyButton>
  );
};

TradeButton.propTypes = {
  buyOrSell: PropTypes.string,
  qty: PropTypes.string,
  total: PropTypes.string,
  setInputValue: PropTypes.func.isRequired,
  setInputTopContent: PropTypes.func.isRequired,
  setInputBottomContent: PropTypes.func.isRequired,
  coin: PropTypes.string.isRequired,
  inputValue: PropTypes.string,
  setTotal: PropTypes.func.isRequired,
};

TradeButton.defaultProps = {
  buyOrSell: "",
  qty: "",
  total: "",
  inputValue: "",
};

export default TradeButton;
