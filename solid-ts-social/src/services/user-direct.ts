import { activeUser, setActiveUser } from './../stores/user-store';
import { type User } from "../models/user";

type UserCallback = (user: User) => void;

export class UserDirectService {
  private USERS: string;
  private users: Map<string, User> = new Map();
  private userLoginListeners: UserCallback[] = [];

  constructor(hostURL: string) {
    console.log('UserDirectService is constructed');
    this.USERS = `${hostURL}/api/users`;

    if (!activeUser() && this.isLoggedIn()) {
      const id = sessionStorage.getItem('social.media.user.user.id');
      const alias = sessionStorage.getItem('social.media.user.user.alias');
      const name = sessionStorage.getItem('social.media.user.user.name');
      const avatarUrl = sessionStorage.getItem('social.media.user.user.avatarUrl');
      const email = sessionStorage.getItem('social.media.user.user.email');

      if (id && alias && name && avatarUrl && email) {
        setActiveUser({
          id: +id,
          alias,
          name,
          email,
          avatarUrl
        });
      } else {
        this.logout();
      }
    }
  }

  onUserLogin(callback: UserCallback) {
    this.userLoginListeners.push(callback);
  }

  private emitUserLogin(user: User) {
    this.userLoginListeners.forEach(cb => cb(user));
  }

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.USERS}/all`);
    return response.json();
  }

  async getUserByAlias(alias: string): Promise<User> {
    const response = await fetch(`${this.USERS}/alias/${alias}`);
    return response.json();
  }

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${this.USERS}/id/${id}`);
    return response.json();
  }

  async login(alias: string): Promise<void> {
    console.log(`login(${alias}) called`);

    if (this.users.has(alias)) {
      console.log('user found in cache');
      const user = this.users.get(alias);
      if (user) this.setUser(user);
    } else {
      console.log('retrieving user...');
      try {
        const user = await this.getUserByAlias(alias);
        if (user) {
          console.log('user returned from back end');
          this.users.set(alias, user);
          this.setUser(user);
        }
      } catch (err) {
        console.error('HTTP Error', err);
        // You can handle navigation or error reporting here
      }
    }
  }

  setUser(user: User) {
    setActiveUser(user);

    sessionStorage.setItem('social.media.user.loggedIn', 'true');
    sessionStorage.setItem('social.media.user.user.id', user.id.toString());
    sessionStorage.setItem('social.media.user.user.alias', user.alias);
    sessionStorage.setItem('social.media.user.user.name', user.name);
    sessionStorage.setItem('social.media.user.user.avatarUrl', user.avatarUrl);
    sessionStorage.setItem('social.media.user.user.email', user.email);

    this.emitUserLogin(user);
  }

  logout() {
    setActiveUser(undefined);
    sessionStorage.clear();
    sessionStorage.setItem('social.media.user.loggedIn', 'false');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('social.media.user.loggedIn') === 'true';
  }

  activeUserAlias(): string | null {
    return sessionStorage.getItem('social.media.user.alias');
  }
}