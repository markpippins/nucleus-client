// src/components/Toolbar.tsx
import { type Component } from "solid-js";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

const Landing: Component = () => {

  return (
    <>
      <main id="main-content">
        <LeftNav />
        <div class="content-area">
        </div>
        <RightNav />
      </main>
      <footer class="footer">
        &copy; 2024 SolidJS Social
      </footer>
    </>
  );
};

export default Landing;
