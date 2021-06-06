import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Redirect, Route } from "react-router-dom";
import { GlobalStyle, ResetStyle } from "./Component/globalStyle";
import CoinDetail from "./Pages/CoinDetail";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Landing from "./Pages/Landing";
import Explore from "./Pages/Explore";
import Portfolio from "./Pages/Portfolio";
import { subscribeUserData } from "./Utils/firebase";
import theme from "./Utils/theme";

function App() {
  const [email, setEmail] = useState();

  useEffect(
    () =>
      subscribeUserData((userEmail) => {
        setEmail(userEmail);
      }),
    [email]
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ResetStyle />
        <GlobalStyle />
        <Header />
        <div className="content-container">
          <Route exact path="/coindetail/:symbol" component={CoinDetail} />
          <Route exact path="/explore" component={Explore} />
          <Route path="/portfolio">
            {email !== null ? <Portfolio /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/" component={Landing} />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
