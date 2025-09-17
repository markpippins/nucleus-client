// src/App.tsx
import type { Component } from "solid-js";
import Toolbar from "./components/nav/Toolbar";
import LeftNav from "./components/nav/LeftNav";
import RightNav from "./components/nav/RightNav";
import Footer from "./components/nav/Footer";
import CreateUser from "./components/user/CreateUser";
const App: Component = () => {
  return (
    <>
      <Toolbar />
      {/* <Landing /> */}
      <main id="main-content">
        <LeftNav />

        <div class="content-area">
          <CreateUser />
        </div>

        <RightNav />
      </main>
      <Footer />
    </>
  );
};

export default App;
