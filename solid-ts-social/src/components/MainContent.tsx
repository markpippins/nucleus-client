import { Show } from 'solid-js';
import CreateUser from "./user/CreateUser";
import { activeUser } from './../stores/user-store';

export default function MainContent() {

  return (
    <div class="content-area">
      <Show when={!activeUser()}>
        <CreateUser />
      </Show>

      <Show when={activeUser()}>
        <div>
          <h2>Welcome, {activeUser()?.alias}!</h2>
          <p>This is your main content area. You can add dashboard widgets, user-specific data, or anything else here.</p>
        </div>
      </Show>
    </div>
  );
}