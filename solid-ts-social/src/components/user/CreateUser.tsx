// CreateUserComponent.tsx
import { createSignal } from 'solid-js';
import { submitRequest } from "../../services/broker-client";

export default function CreateUser() {
  const [alias, setAlias] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [status, setStatus] = createSignal<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = createSignal('');

  const handleCreateUser = async () => {
    setStatus('idle');
    setErrorMessage('');

    const response = await submitRequest(
      'client-create-user',
      'userService',
      'save',
      {
        alias: alias(),
        email: email(),
        password: password()
      }
    );

    if (response && response.ok && response.data) {
      setStatus('success');
    } else {
      setStatus('error');
      const errors = response?.errors?.map(e => JSON.stringify(e)).join(', ') || 'Unknown error';
      setErrorMessage(errors);
    }
  };

  return (
    <div class="create-user-form">
      <h2>Create User</h2>
      <input
        type="text"
        placeholder="Alias"
        value={alias()}
        onInput={(e) => setAlias(e.currentTarget.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email()}
        onInput={(e) => setEmail(e.currentTarget.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
      />
      <button onClick={handleCreateUser}>Create</button>

      {status() === 'success' && <p style={{ color: 'green' }}>✅ User created successfully!</p>}
      {status() === 'error' && <p style={{ color: 'red' }}>❌ Failed to create user: {errorMessage()}</p>}
    </div>
  );
}