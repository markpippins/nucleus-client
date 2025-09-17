// src/App.tsx
import type { Component } from "solid-js";
import Toolbar from "./components/Toolbar";
import LeftNav from "./components/nav/LeftNav";
import RightNav from "./components/nav/RightNav";
import Footer from "./components/nav/Footer";
import MainContent from "./components/MainContent";
const App: Component = () => {
  return (
    <>
      <Toolbar />
      <main id="main-content">
        <LeftNav />
        <div class="content-area">
          <MainContent />
        </div>
        <RightNav />
      </main>
      <Footer />
    </>
  );
};

export default App;
