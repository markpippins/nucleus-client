// LoginComponent.tsx
import { createSignal, Show } from 'solid-js';
import { UserDirectService } from "../../services/user-direct";
import { activeUser } from '../../stores/user-store';

const userService = new UserDirectService('http://localhost:8080');

export default function LoginDirect() {
  const [alias, setAlias] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleLogin = async () => {
    try {
      await userService.login(alias());
      // The activeUser signal is set inside the service,
      // so we don't need to set it here.
      // setLoggedInUser(activeUser());
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div class="login-container">
      <Show when={!activeUser()}>
        <input
          type="text"
          placeholder="Alias"
          value={alias()}
          onInput={(e) => setAlias(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </Show>

      <Show when={activeUser()}>
        <span>Welcome, {activeUser()?.alias}!</span>
      </Show>
    </div>
  );
}