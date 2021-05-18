import React from "react";
// import GridLayout from "react-grid-layout";
import { Reset } from "styled-reset";
import Header from "./Component/Header";
import Footer from "./Component/Footer";

// import KLine from "./Component/KLine";
// import AreaSpline from "./Component/AreaSpline";
// import PlaceOrder from "./Component/PlaceOrder";
// import AssetsForm from "./Component/AssetsForm";
// import Chat from "./Component/Chat";
// import WishList from "./Component/WishList";
// import CoinData from "./Component/CoinData";
import Sign from "./Component/Sign";

import "./Utils/firebase";

function App() {
  // const layout = [
  //   { i: "a", x: 0, y: 0, w: 12, h: 3, static: true },
  //   { i: "b", x: 5, y: 0, w: 12, h: 2.5, minW: 2, maxW: 12 },
  //   { i: "c", x: 10, y: 0, w: 12, h: 1 },
  // ];
  return (
    <div className="App">
      <Reset />
      <Header />
      <Sign />
      <Footer />
      {/* <GridLayout className="layout" layout={layout} cols={12} width={1200}>
        <div key="a">
          <KLine />
        </div>
        <div key="b">
          <AreaSpline />
        </div>
        <div key="c">
          <PlaceOrder />
        </div>
      </GridLayout>
      <AssetsForm />
      <Chat />
      <WishList />
      <Sign />
      <CoinData /> */}
    </div>
  );
}

export default App;
