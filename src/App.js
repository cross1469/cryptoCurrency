import React from "react";
import { Reset } from "styled-reset";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CoinDetail from "./Pages/CoinDetail";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Landing from "./Pages/Landing";
import Explore from "./Pages/Explore";
import Portfolio from "./Pages/Portfolio";
import Login from "./Pages/Login";

import "./Utils/firebase";
import theme from "./Utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Reset />
          <Header />
          <Route exact path="/coindetail/:id" component={CoinDetail} />
          <Route exact path="/explore" component={Explore} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Landing} />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
