import request from '../utils/request';

const baseUrl = 'http://localhost:3030/data/locations';

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
            return await request.get(baseUrl);
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
            return await request.get(`${baseUrl}/${markerId}`);
        } catch (error) {
            console.error('Error fetching marker:', error);
            throw error;
        }
    }
};

export default markerService;