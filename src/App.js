import React from "react";
import GridLayout from "react-grid-layout";
import KLine from "./Component/KLine";
import AreaSpline from "./Component/AreaSpline";
import PlaceOrder from "./Component/PlaceOrder";
import AssetsForm from "./Component/AssetsForm";

import "./Utils/firebase";

function App() {
  const layout = [
    { i: "a", x: 0, y: 0, w: 12, h: 3, static: true },
    { i: "b", x: 5, y: 0, w: 12, h: 2.5, minW: 2, maxW: 12 },
    { i: "c", x: 10, y: 0, w: 12, h: 1 },
    { i: "d", x: 15, y: 7, w: 12, h: 1, static: true },
  ];
  return (
    <div className="App">
      <GridLayout className="layout" layout={layout} cols={12} width={1200}>
        <div key="a">
          <KLine key="a" />
        </div>
        <div key="b">
          <AreaSpline key="b" />
        </div>
        <div key="c">
          <PlaceOrder key="c" />
        </div>
        <div key="d">
          <AssetsForm key="d" />
        </div>
      </GridLayout>
    </div>
  );
}

export default App;
