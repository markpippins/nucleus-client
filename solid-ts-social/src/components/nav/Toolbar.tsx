// src/components/Toolbar.tsx
import { type Component, createSignal } from "solid-js";
import LoginDirect from "../login/LoginDirect";
import LoginBroker from "../login/LoginBroker";

const Toolbar: Component = () => {
  const [open, setOpen] = createSignal(false);

  return (
      <nav class="toolbar">
        <div class="toolbar-title">Solid Social Demo</div>
        <LoginDirect />
        <LoginBroker />
        {/* <div class="toolbar-actions">
          <button>Users</button>
          <button>Settings</button>
          <button>Logout</button>
        </div> */}
      </nav>
  );
};

export default Toolbar;
