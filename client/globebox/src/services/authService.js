import request from "../utils/request";

const baseUrl = 'http://localhost:3030/users';

export default {
    async register(email, password) {
        // Register the user
        const response = await request.post(`${baseUrl}/register`, {
            email,
            password
        });
        return response;
    },

    async login(email, password) {
        const response = await request.post(`${baseUrl}/login`, {
            email,
            password
        });
        return response;
    },

    logout() {
        return request.post(`${baseUrl}/logout`);
    },

    async getSession() {
        try {
            const response = await request.get(`${baseUrl}/session`);
            return response;
        } catch (error) {
            return (error);
        }
    }
};
