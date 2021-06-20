import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import NotFound from "./404";

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        {component}
        <Switch>
          <Route exact path="/">
            <h1>Cryptocurrency Exchange</h1>
          </Route>
        </Switch>
      </Router>
    ),
  };
};

it("should render the home page", () => {
  const { container, getByTestId } = renderWithRouter(<NotFound />);
  fireEvent.click(getByTestId("home-link"));
  expect(container.innerHTML).toMatch("Cryptocurrency Exchange");
});
