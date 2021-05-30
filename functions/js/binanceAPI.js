const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors({ origin: true }));

app.get("/:symbol/:interval", (req, res) => {
  const symbol = req.params.symbol;
  const interval = req.params.interval;
  axios
    .get(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=1000`
    )
    .then((response) => {
      res.status(200).json(response.data);
    });
});

app.get("/explore/", (req, res) => {
  axios.get("https://api.binance.com/api/v3/ticker/24hr").then((response) => {
    res.status(200).json(response.data);
  });
});

app.get("/portfolio/", (req, res) => {
  axios.get("https://api.binance.com/api/v3/ticker/price").then((response) => {
    res.status(200).json(response.data);
  });
});

exports.binanceAPI = functions.https.onRequest(app);
