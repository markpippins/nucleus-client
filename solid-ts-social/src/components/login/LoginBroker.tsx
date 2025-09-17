// LoginComponent.tsx
import { createSignal, onMount, Show } from 'solid-js';
import { UserBrokerService } from "../../services/user-broker";
import type { User } from '../../models/user';

const userService = new UserBrokerService('solid-ts-social-client');

export default function LoginBroker() {
  const [alias, setAlias] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [loggedInUser, setLoggedInUser] = createSignal<User | undefined>();

  onMount(() => {
    if (userService.isLoggedIn()) {
      const alias = userService.activeUserAlias();
      if (alias) {
        userService.getUserByAlias(alias).then((user: any) => setLoggedInUser(user));
      }
    }
  });

  const handleLogin = async () => {
    try {
      await userService.login(alias(), "test");
      setLoggedInUser(userService.activeUser);
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div class="login-container">
      <Show when={!loggedInUser()}>
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

      <Show when={loggedInUser()}>
        <span>Welcome, {loggedInUser()?.alias}!</span>
      </Show>
    </div>
  );
}