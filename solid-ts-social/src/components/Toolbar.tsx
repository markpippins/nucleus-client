// src/components/Toolbar.tsx
import { type Component, createSignal, Show } from "solid-js";
import LoginDirect from "./login/LoginDirect";
import LoginBroker from "./login/LoginBroker";
import LogoutButton from "./login/Logout";
import { activeUser } from './../stores/user-store';

const Toolbar: Component = () => {
  const [open, setOpen] = createSignal(false);

  return (
      <nav class="toolbar">
        <div class="toolbar-title">Solid Social Demo</div>
        <LoginDirect />
        <LoginBroker />
        <Show when={activeUser()}>
            <LogoutButton />
        </Show>
      </nav>
  );
};

export default Toolbar;
