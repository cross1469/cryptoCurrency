import {
  MARKET_PRICE_VALUE_HANDLE,
  USDT_PRICE_VALUE_HANDLE,
  COIN_PRICE_VALUE_HANDLE,
  PAGE_NAME,
} from "./actionType";

const getMarketPrice = (value) => ({
  type: MARKET_PRICE_VALUE_HANDLE,
  value,
});

const updateUsdtPrice = (value) => ({
  type: USDT_PRICE_VALUE_HANDLE,
  value,
});

const updateCoinPrice = (value) => ({
  type: COIN_PRICE_VALUE_HANDLE,
  value,
});

const updatePageName = (name) => ({
  type: PAGE_NAME,
  name,
});

export { getMarketPrice, updateUsdtPrice, updateCoinPrice, updatePageName };
