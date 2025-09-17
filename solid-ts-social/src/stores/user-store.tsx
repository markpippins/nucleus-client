// userStore.ts
import { createSignal } from 'solid-js';
import type { User } from '../models/user';

export const [activeUser, setActiveUser] = createSignal<User | undefined>();