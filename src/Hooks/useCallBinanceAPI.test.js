import { renderHook, cleanup } from "@testing-library/react-hooks";
import useCallBinanceAPI from "./useCallBinanceAPI";
import { callBinanceAPI } from "../Utils/api";
import { act } from "react-dom/test-utils";

jest.mock("../Utils/api");

// it("should use useCallBinanceAPI", async () => {
//   const { result } = renderHook(() =>
//     useCallBinanceAPI("ETHUSDT", [], "chartType")
//   );
//   const promise = Promise.resolve({ data: { coinType: "ETH" } });
//   axios.get.mockResolvedValue(() => promise);
//   await act(() => promise);
//   expect(result.current[0]).toStrictEqual([]);
//   expect(typeof result.current[1]).toBe("function");
// });

describe("analytics helper", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should fire usePdpGtm Hook", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useCallBinanceAPI("ETHUSDT", [], "type")
    );
    await act(() => waitForNextUpdate());
    expect(callBinanceAPI).toHaveBeenCalledTimes(1);
    expect(result.current).toBeUndefined();
  });

  it("should fire usePdpGtm Hook without data", () => {
    const { result } = renderHook(() => useCallBinanceAPI(undefined));
    expect(callBinanceAPI).not.toBeCalled();
    expect(result.current).toBeUndefined();
  });
});
