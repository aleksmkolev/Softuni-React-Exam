import request from "../utils/request";
import authService from "./authService";

const baseUrl = 'http://localhost:3030/jsonstore/markers';

export default {
    async getAll() {
        const response = await request.get(baseUrl);
        return Object.values(response || {});
    },

    async create(position) {
        const markerData = {
            lat: position.lat,
            lng: position.lng,
            timestamp: new Date().toISOString(),
            userEmail: authService.getUserEmail()
        };
        
        const response = await request.post(baseUrl, markerData);
        return response;
    }
};