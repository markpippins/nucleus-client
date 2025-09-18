import { submitRequest } from './broker-client';
import type { User } from '../models/user';

export class UserBrokerService {
    private users: Map<string, User> = new Map();
    public activeUser: User | undefined;

    constructor(private clientId: string) { }

    async getUserByAlias(alias: string): Promise<User | null> {
        const response = await submitRequest<User>(
            this.clientId,
            'userService',
            'getUserByAlias',
            { alias }
        );

        if (!response || !response.ok || !response.data) {
            console.error('getUserByAlias failed:', response?.errors);
            return null;
        }

        const user = response.data;
        this.users.set(alias, user);
        return user;
    }

    async login(alias: string, password: string): Promise<boolean> {
        console.log(`Broker login(${alias}) called`);

        const response = await submitRequest<User>(
            this.clientId,
            'userService',
            'login',
            { alias, password }
        );

        if (!response || !response.ok || !response.data) {
            console.error('Login failed:', response?.errors);
            return false;
        }

        const user = response.data;
        this.activeUser = user;
        this.users.set(alias, user);

        sessionStorage.setItem('social.media.user.loggedIn', 'true');
        sessionStorage.setItem('social.media.user.user.id', user.id.toString());
        sessionStorage.setItem('social.media.user.user.alias', user.alias);
        sessionStorage.setItem('social.media.user.user.name', user.name);
        sessionStorage.setItem('social.media.user.user.avatarUrl', user.avatarUrl);
        sessionStorage.setItem('social.media.user.user.email', user.email);

        return true;
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem('social.media.user.loggedIn') === 'true';
    }

    activeUserAlias(): string | null {
        return sessionStorage.getItem('social.media.user.user.alias');
    }

    logout() {
        this.activeUser = undefined;
        sessionStorage.clear();
        sessionStorage.setItem('social.media.user.loggedIn', 'false');
    }
}