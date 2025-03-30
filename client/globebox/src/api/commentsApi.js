import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/comments';


export const useComments = (locationId) => {
    const { request } = useAuth();
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `locationId="${locationId}"`
        });

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setComments)
    }, [locationId, request]);

    return {
        comments,
    }
}

export const useCreateComment = () => {
    const { request } = useAuth();

    const create = (commentData) =>
        request.post(baseUrl, commentData);

    return {
        create,
    }
}

export const useDeleteComment = () => {
    const { request } = useAuth();

    const deleteComment = (commentId) =>
        request.delete(`${baseUrl}/${commentId}`);

    return {
        deleteComment,
    }
}

export const useEditComment = () => {
    const { request } = useAuth();

    const edit = (commentId, commentData) =>
        request.put(`${baseUrl}/${commentId}`, { ...commentData, _id: commentId });

    return {
        edit,
    }
}
