import React from "react";
import { Reset } from "styled-reset";
import { ThemeProvider } from "styled-components";
import CoinDetail from "./Pages/CoinDetail";

import "./Utils/firebase";
import theme from "./Utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Reset />
        <CoinDetail />
      </div>
    </ThemeProvider>
  );
}

export default App;
