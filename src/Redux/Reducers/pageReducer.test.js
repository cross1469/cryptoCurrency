import reducer from "./pageReducer";
import * as types from "../Actions/actionType";

describe("page reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      name: "landing",
    });
  });

  it("should handle PAGE_NAME", () => {
    expect(
      reducer([], {
        type: types.PAGE_NAME,
        name: "explore",
      })
    ).toEqual({
      name: "explore",
    });
  });
});
