import React from "react";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import NotFound from "./404";

const renderWithRouter = (component) => (
  {
    ...render(
      <MemoryRouter initialEntries={["/404"]}>
        <Switch>
          <Route exact path="/">
            <h1>Cryptocurrency Exchange</h1>
          </Route>
          <Route exact path="/404">
          {component}
          </Route>
        </Switch>
      </MemoryRouter>
    ),
  });

it("should render the home page", () => {
  const { container, getByTestId } = renderWithRouter(<NotFound />);
  expect(container.innerHTML).toMatch("Back to CryptoCurrency");
  fireEvent.click(getByTestId("home-link"));
  expect(container.innerHTML).not.toMatch("Back to CryptoCurrency");
});

it("clicking filter links updates product query params", () => {
  let testHistory, testLocation;
  const { getByTestId } = render(
    <MemoryRouter initialEntries={["/404"]}>
      <NotFound />
      <Route
        path="*"
        render={({ history, location }) => {
          testHistory = history;
          testLocation = location;
          return null;
        }}
      />
    </MemoryRouter>
  );
  expect(testLocation.pathname).toBe("/404");
  fireEvent.click(getByTestId("home-link"));
  expect(testLocation.pathname).toBe("/");
});
