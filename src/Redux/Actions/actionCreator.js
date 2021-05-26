import MARKET_PRICE_VALUE_HANDLE from "./actionType";

const getMarketPrice = (value) => ({
  type: MARKET_PRICE_VALUE_HANDLE,
  value,
});

export default getMarketPrice;
