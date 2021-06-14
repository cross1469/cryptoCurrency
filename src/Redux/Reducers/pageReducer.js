import { PAGE_NAME } from "../Actions/actionType";

const initialState = {
  name: "landing",
};

export default function coinDetailReducer(state = initialState, action) {
  switch (action.type) {
    case PAGE_NAME:
      return {
        name: action.name,
      };

    default:
      return state;
  }
}
