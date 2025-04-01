import request from "../utils/request";

const baseUrl = 'http://localhost:3030/users';

export default {
    async register(email, password) {
        // Register the user
        const response = await request.post(`${baseUrl}/register`, {
            email,
            password
        });
        
        // Store auth data
        localStorage.setItem('authToken', response.accessToken);
        localStorage.setItem('userEmail', response.email);
        
        return response;
    },

    async login(email, password) {
        const response = await request.post(`${baseUrl}/login`, {
            email,
            password
        });
        
        localStorage.setItem('authToken', response.accessToken);
        localStorage.setItem('userEmail', response.email);
        
        return response;
    },

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
    },

    getToken() {
        return localStorage.getItem('authToken');
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    getUserEmail() {
        return localStorage.getItem('userEmail');
    }
};
