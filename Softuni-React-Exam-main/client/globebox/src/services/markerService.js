import request from '../utils/request';

const baseUrl = 'http://localhost:3030/jsonstore/markers';

const markerService = {
    async create(markerData, token) {
        try {
            const options = {
                headers: {
                    'X-Authorization': token
                }
            };
            
            const savedMarker = await request.post(baseUrl, {
                name: markerData.name,
                description: markerData.description,
                imageUrl: markerData.imageUrl,
                rating: markerData.rating,
                lat: markerData.lat,
                lng: markerData.lng,
            }, options);
            return savedMarker;
        } catch (error) {
            console.error('Error creating marker:', error);
            throw error;
        }
    },

    async getAll() {
        try {
            const response = await request.get(baseUrl);
            // Convert object of objects to array and handle null/empty response
            return response ? Object.values(response) : [];
        } catch (error) {
            console.error('Error fetching markers:', error);
            return [];
        }
    },

    async edit(markerId, markerData, token) {
        try {
            const options = {
                headers: {
                    'X-Authorization': token
                }
            };
            
            // Log the request details for debugging
            console.log('Edit request:', {
                url: `${baseUrl}/${markerId}`,
                data: markerData,
                token
            });
            
            const updatedMarker = await request.put(`${baseUrl}/${markerId}`, markerData, options);
            return updatedMarker;
        } catch (error) {
            console.error('Error editing marker:', error);
            throw error;
        }
    },

    async delete(markerId, token) {
        try {
            const options = {
                headers: {
                    'X-Authorization': token
                }
            };
            await request.delete(`${baseUrl}/${markerId}`, null, options);
        } catch (error) {
            console.error('Error deleting marker:', error);
            throw error;
        }
    },

    async getById(markerId) {
        try {
            const response = await request.get(`${baseUrl}/${markerId}`);
            // Convert lat/lng to numbers and provide defaults
            return {
                ...response,
                lat: Number(response.lat) || 0,
                lng: Number(response.lng) || 0
            };
        } catch (error) {
            console.error('Error fetching marker:', error);
            throw error;
        }
    }
};

export default markerService;