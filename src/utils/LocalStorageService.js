export default class LocalStorageService {
    static setItem(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting item in localStorage:", error);
        }
    }

    static getItem(key) {
        try {
            const value = sessionStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error("Error getting item from localStorage:", error);
            return null;
        }
    }

    static removeItem(key) {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing item from localStorage:", error);
        }
    }

    static clear() {
        try {
            sessionStorage.clear();
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    }

    static isLoggedIn() {
        return !!sessionStorage.getItem("access-token");
    }
}
