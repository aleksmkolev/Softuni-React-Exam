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
    }
};

export default markerService;