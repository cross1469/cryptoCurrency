import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./Redux/Reducers";
import ErrorPage from "./component/404";
import { GlobalStyle, ResetStyle } from "./component/globalStyle";
import App from "./App";

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ResetStyle />
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/404" exact component={ErrorPage} />
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
