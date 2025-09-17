// src/App.tsx
import type { Component } from "solid-js";
import Toolbar from "./components/Toolbar";
import LeftNav from "./components/LeftNav";
import RightNav from "./components/RightNav";
import Footer from "./components/nav/Footer";
const App: Component = () => {
  return (
    <>
      <Toolbar />
      {/* <Landing /> */}
      <main id="main-content">
        <LeftNav />

        <div class="content-area">
          
        </div>

        <RightNav />
      </main>
      <Footer />
    </>
  );
};

export default App;
