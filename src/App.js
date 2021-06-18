import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Redirect, Route, Switch } from "react-router-dom";
import { GlobalStyle, ResetStyle } from "./component/globalStyle";
import CoinDetail from "./Pages/CoinDetail";
import Header from "./component/Header";
import Footer from "./component/Footer";
import ShowToast from "./component/ShowToast";
import Landing from "./Pages/Landing";
import Explore from "./Pages/Explore";
import Portfolio from "./Pages/Portfolio";
import ScrollToTop from "./Hooks/ScrollToTop";
import { subscribeUserData } from "./Utils/firebase";
import theme from "./Utils/theme";
import { EmailContext } from "./context/Context";

function App() {
  const [email, setEmail] = useState();

  useEffect(() => {
    const unsubscribe = subscribeUserData((userEmail) => {
      setEmail(userEmail);
    });
    return unsubscribe;
  }, [email]);

  return (
    <EmailContext.Provider value={email}>
      <ThemeProvider theme={theme}>
        <ScrollToTop />
        <ShowToast>
          <div className="App">
            <ResetStyle />
            <GlobalStyle />
            <Header />
            <div className="content-container">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route
                  exact
                  path="/coindetail/:symbol"
                  component={CoinDetail}
                />
                <Route exact path="/explore" component={Explore} />
                <Route exact path="/portfolio">
                  {email !== null ? <Portfolio /> : <Redirect to="/" />}
                </Route>
                <Redirect to="/404" />
              </Switch>
            </div>
            <Footer />
          </div>
        </ShowToast>
      </ThemeProvider>
    </EmailContext.Provider>
  );
}

export default App;
