// src/components/Toolbar.tsx
import { type Component, createSignal } from "solid-js";

const Toolbar: Component = () => {
  const [open, setOpen] = createSignal(false);

  return (
      <nav class="toolbar">
        <div class="toolbar-title">Solid Social Demo</div>
        <div class="toolbar-actions">
          <button>Users</button>
          <button>Settings</button>
          <button>Logout</button>
        </div>
      </nav>
  );
};

export default Toolbar;
