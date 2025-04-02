import request from '../utils/request';

const baseUrl = 'http://localhost:3030/jsonstore/likes';

const likeService = {
    async like(markerId, userId) {
        try {
            const result = await request.post(baseUrl, {
                markerId,
                userId,
                createdAt: new Date().toISOString()
            });
            return result;
        } catch (error) {
            console.error('Error liking marker:', error);
            throw error;
        }
    },

    async getLikesByMarkerId(markerId) {
        try {
            const allLikes = await request.get(baseUrl);
            return Object.values(allLikes).filter(like => like.markerId === markerId);
        } catch (error) {
            console.error('Error getting likes:', error);
            return [];
        }
    },

    async hasUserLiked(markerId, userId) {
        try {
            const allLikes = await request.get(baseUrl);
            return Object.values(allLikes).some(like => 
                like.markerId === markerId && like.userId === userId
            );
        } catch (error) {
            console.error('Error checking like status:', error);
            return false;
        }
    }
};

export default likeService; 