import { useState, useEffect, useContext } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";


const baseUrl = 'http://localhost:3030/data/comments';

const useAuth = () => {
    const {accessToken} = useContext(UserContext); 

    const options = {
        headers: {
            'X-Authorization': accessToken,
        }
    }

    return {
        options,
    }
}

export const useComments = (markerId) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `markerId="${markerId}"`
        })
        // request.get(`${baseUrl}/${markerId}`)
        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setComments)
    }, [markerId]);

    return {
        comments,
        setComments
    };
};

export const useCreateComment = () => {
    const {options} = useAuth();

    const createComment = (markerId, username, comment) => { 
        if(comment.length === 0) {
            return;
        }

        return request.post(baseUrl, {markerId, username, comment}, options);
    };

    return {
        createComment, 
    }
};
