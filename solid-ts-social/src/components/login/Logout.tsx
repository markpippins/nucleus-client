import { Show } from 'solid-js';
import { activeUser, setActiveUser } from '../../stores/user-store';
import { submitRequest } from '../../services/broker-client';

export default function LogoutButton() {
  const handleLogout = async () => {
    const user = activeUser();
    if (!user) return;

    const response = await submitRequest(
      'client-logout',
      'userService',
      'logoff',
      { alias: user.alias }
    );

    if (response?.ok) {
      console.log('User logged out successfully');
    } else {
      console.warn('Logout failed:', response?.errors);
    }
    
    setActiveUser(undefined);
    sessionStorage.clear();
    sessionStorage.setItem('social.media.user.loggedIn', 'false');
  };

  return (
    // <Show when={activeUser()}>
      <button onClick={handleLogout}>Logout</button>
    // </Show>
  );
}