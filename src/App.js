import React from "react";
import KLine from "./Component/KLine";
import AreaSpline from "./Component/AreaSpline";
import PlaceOrder from "./Component/PlaceOrder";
import AssetsForm from "./Component/AssetsForm";
import "./Utils/firebase";

function App() {
  return (
    <div className="App">
      <KLine />
      <AreaSpline />
      <PlaceOrder />
      <AssetsForm />
    </div>
  );
}

export default App;
