import React from "react";
import KLine from "./Component/KLine";
import AreaSpline from "./Component/AreaSpline";
import "./Utils/firebase";

function App() {
  return (
    <div className="App">
      <KLine />
      <AreaSpline />
    </div>
  );
}

export default App;
