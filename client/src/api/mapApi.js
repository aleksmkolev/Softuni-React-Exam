import { useState, useEffect, useContext, useCallback } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";


export const baseUrl = 'http://localhost:3030/data/markers';
export const PAGE_SIZE = 3;

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

    const getMarkers = useCallback(async () => {
        try {
            const data = await request.get(baseUrl);
            setMarkers(data);
        } catch (error) {
            console.error('Error fetching markers:', error);
        }
    }, []);

    useEffect(() => {
        getMarkers();
    }, [getMarkers]);

    return {
        markers,
        getMarkers
    };
};

export const useMarker = (markerId) => {
    const [marker, setMarker] = useState({});

    useEffect(() => {
        if (markerId) {  // Only fetch if markerId exists
            request.get(`${baseUrl}/${markerId}`)
                .then(setMarker)
                .catch(error => console.error('Error fetching marker:', error));
        }
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
            select: "name,description,imageUrl,rating,latitude,longitude,_id",
        })

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setLatestMarkers)
    }, []);

    return {
        latestMarkers,
    };
};

export const useCreateMarker = () => {
    const { accessToken } = useContext(UserContext);

    const createMarker = async (markerData) => {
        if (!accessToken) {
            throw new Error('Authentication required');
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken
            },
            body: JSON.stringify(markerData)
        };

        try {
            const response = await fetch(baseUrl, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating marker:', error);
            throw error;
        }
    };

    return {
        createMarker,
    };
};

export const useEditMarker = () => {
    const {options} = useAuth();

    const editMarker = (markerId, {name, description, image, rating, latitude, longitude}) => {

        return request.put(`${baseUrl}/${markerId}`, {name, description, image, rating, latitude, longitude, _id: markerId}, options);
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