import { renderHook, cleanup } from "@testing-library/react-hooks";
import useCallBinanceAPI from "./useCallBinanceAPI";
import { callBinanceAPI } from "../Utils/api";

jest.mock("../Utils/api");

describe("analytics helper", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("initial data state is loading and data empty", async () => {
    const { result } = renderHook(() =>
      useCallBinanceAPI("ETHUSDT", [], "type")
    );
    expect(result.current[0]).toStrictEqual([]);
  });

  it("data is fetched", async () => {
    const fakeSWData = { coinType: "ETH" };
    callBinanceAPI.mockResolvedValue(fakeSWData);
    const { result, waitForNextUpdate } = renderHook(() =>
      useCallBinanceAPI("ETHUSDT", [], "type")
    );
    expect(result.current[0]).toStrictEqual([]);
    await waitForNextUpdate();
    expect(callBinanceAPI).toHaveBeenCalledTimes(1);
    expect(callBinanceAPI).toBeCalledWith("ETHUSDT", "1h");
    expect(result.current[0]).toStrictEqual({
      series: [{ data: { coinType: "ETH" }, name: "ETHUSDT", type: "type" }],
    });
    expect(typeof result.current[1]).toBe("function");
  });
});
