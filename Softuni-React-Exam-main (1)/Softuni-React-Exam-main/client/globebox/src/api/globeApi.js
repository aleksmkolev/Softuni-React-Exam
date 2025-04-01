import { useState, useEffect, useContext } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";


const baseUrl = 'http://localhost:3030/data/markers';
const PAGE_SIZE = 5;

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

export const useMarkers = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then(setMarkers)
    }, []);

    return {
        markers,
    };
};

export const useMarker = (markerId) => {
    const [marker, setMarker] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${markerId}`)
            .then(setMarker)
    }, [markerId]);

    return {
        marker,
    };
};

export const useLatestMarkers = () => {
    const [latestMarkers, setLatestMarkers] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            sortBy: "_createdOn desc",
            pageSize: PAGE_SIZE, 
            select: "name,country,mainImageUrl,_id",
        })

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setLatestMarkers)
    }, []);

    return {
        latestMarkers,
    };
};

export const useCreateMarker = () => {
    const {options} = useAuth();

    const createMarker = ({name, description, imageUrl, rating, lat, lng}) => {
        return request.post(baseUrl, {
            name,
            description,
            imageUrl,
            rating,
            lat,
            lng
        }, options);
    };

    return {
        createMarker, 
    }
};

export const useEditMarker = () => {
    const {options} = useAuth();

    const editMarker = (markerId, {imageUrl, ...markerData}) => {
        let imageUrls = [];
        if(imageUrl !== ''){
            imageUrls.push(imageUrl);
        }

        return request.put(`${baseUrl}/${markerId}`, {...markerData, imageUrls, _id: markerId}, options);
    };

    return {
        editMarker, 
    }
};

export const useDeleteMarker = () => {
    const {options} = useAuth(); 

    const deleteMarker = (markerId) => {
        return request.delete(`${baseUrl}/${markerId}`, null, options);
    };

    return {
        deleteMarker, 
    }
};
