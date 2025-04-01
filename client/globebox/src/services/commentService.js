import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore/markers';

export default {
    async getAll(markerId) {
        const comments = await request.get(baseUrl);

        const markerComments = Object.values(comments).filter(comment => comment.markerId === markerId);

        return markerComments;
    },
    create(email, markerId, comment) {
        return request.post(baseUrl, { email, markerId, comment });
    }
};