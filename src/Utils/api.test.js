import axios from "axios";
import { getUsdtCoinData, getCoinSortTrade } from "./api";

jest.mock("axios");

describe("getUsdtCoinData", () => {
  it("fetches successfully data from an API", async () => {
    const data = {
      data: [
        {
          symbol: "BTCUSDT",
        },
        {
          symbol: "ETHUSDT",
        },
      ],
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getUsdtCoinData()).resolves.toEqual({
      usdtLastPrice: [{ symbol: "BTCUSDT" }, { symbol: "ETHUSDT" }],
      usdtSymbol: ["BTCUSDT", "ETHUSDT"],
    });
  });

  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    await expect(getUsdtCoinData()).rejects.toThrow(errorMessage);
  });
});

describe("getCoinSortTrade", () => {
  it("fetches successfully data from an API", async () => {
    const data = {
      data: [
        {
          symbol: "BTCUSDT",
          count: 5,
        },
        {
          symbol: "ETHUSDT",
          count: 2,
        },
        {
          symbol: "FTTUSDT",
          count: 3,
        },
      ],
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getCoinSortTrade()).resolves.toEqual([
      { count: 5, symbol: "BTCUSDT" },
      { count: 3, symbol: "FTTUSDT" },
      { count: 2, symbol: "ETHUSDT" },
    ]);
  });

  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    await expect(getCoinSortTrade()).rejects.toThrow(errorMessage);
  });
});
