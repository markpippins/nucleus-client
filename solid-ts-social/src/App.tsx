// src/App.tsx
import type { Component } from "solid-js";

const App: Component = () => {
  return (
    <>
      <div class="toolbar">
        <div class="toolbar-title">SolidJS Social</div>
        <div class="toolbar-actions">
          <button>Users</button>
          <button>Settings</button>
          <button>Logout</button>
        </div>
      </div>
      <main id="main-content">
        <nav class="left-nav">
          <p>Left navigation content goes here</p>
        </nav>
        <div class="content-area">
          <p>
            Welcome to the Service Broker Demo application. This is the home
            page.
          </p>
        </div>
        <nav class="right-nav">
          <p>Right navigation content goes here</p>
        </nav>
      </main>
      <footer class="footer">
        &copy; 2024 SolidJS Social
      </footer>
    </>
  );
};

export default App;
