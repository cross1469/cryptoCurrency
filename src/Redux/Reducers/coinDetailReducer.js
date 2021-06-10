import {
  MARKET_PRICE_VALUE_HANDLE,
  USDT_PRICE_VALUE_HANDLE,
  COIN_PRICE_VALUE_HANDLE,
} from "../Actions/actionType";

const initialState = {
  marketPrice: 0,
  usdtQty: "",
  coinQty: "",
};

export default function coinDetailReducer(state = initialState, action) {
  switch (action.type) {
    case MARKET_PRICE_VALUE_HANDLE:
      return {
        ...state,
        marketPrice: action.value,
      };
    case USDT_PRICE_VALUE_HANDLE:
      return {
        ...state,
        usdtQty: action.value,
      };
    case COIN_PRICE_VALUE_HANDLE:
      return {
        ...state,
        coinQty: action.value,
      };
    default:
      return state;
  }
}
