/**
 * Singleton class representing current session
 * USAGE:
 * import { Session } from 'praxis';
 * Session.create();
 * Session.set('token', token);
 * Session.set('user', user);
 * Session.set('permissions', { 'user.create': true, ...});
 */
class Session {
    constructor() {
        this.data = {};
    }

    /**
     * Creates a new session and saves to local storage
     */
    create() {
        let now = new Date();
        this.set('_created', now.value);
        this.save();
    }

    /**
     * Destroys the session and clears local storage
     */
    destroy() {
        for (let key in this.data) {
            delete this.data[key];
        }
        localStorage.clear();
    }

    /**
     * e.g. set('token', '123456');
     */
    set(key, data) {
        this.data[key] = data;
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Gets session value (from memory)
     */
    get(key) {
        return this.data[key];
    }

    /**
     * Load saved session from local storage
     */
    load() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            this.set(key, JSON.parse(localStorage.getItem(key)));
        }
    }

    /**
     * Saves a complete snapshot of the current session data to local storage
     */
    save() {
        localStorage.clear();
        for (let key in this.data) {
            localStorage.setItem(key, JSON.stringify(this.data[key]));
        }
    }

    /**
     * Shorthand function to get permissions
     */
    can(action) {
        return this.data.permissions[action];
    }
}

export default new Session();