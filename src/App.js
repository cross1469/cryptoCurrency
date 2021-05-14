import React from "react";
import KLine from "./Component/KLine";
import AreaSpline from "./Component/AreaSpline";
import BtnPlaceOrder from "./Component/BtnPlaceOrder";
import InputPlaceOrder from "./Component/InputPlaceOrder";
import "./Utils/firebase";

function App() {
  return (
    <div className="App">
      <KLine />
      <AreaSpline />
      <BtnPlaceOrder />
      <InputPlaceOrder />
    </div>
  );
}

export default App;
