// src/App.tsx
import type { Component } from "solid-js";
import Toolbar from "./components/Toolbar";

const App: Component = () => {
  return (
  <div class="toolbar">
    <div class="toolbar-title">SolidJS Social</div>
    <div class="toolbar-actions">
      <button>Users</button>
      <button>Settings</button>
      <button>Logout</button>
    </div>
  </div>
  );
};

export default App;
