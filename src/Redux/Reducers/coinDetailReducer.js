import MARKET_PRICE_VALUE_HANDLE from "../Actions/actionType";

const initialState = {
  marketPrice: 0,
};

export default function coinDetailReducer(state = initialState, action) {
  switch (action.type) {
    case MARKET_PRICE_VALUE_HANDLE:
      return {
        marketPrice: action.value,
      };
    default:
      return state;
  }
}
