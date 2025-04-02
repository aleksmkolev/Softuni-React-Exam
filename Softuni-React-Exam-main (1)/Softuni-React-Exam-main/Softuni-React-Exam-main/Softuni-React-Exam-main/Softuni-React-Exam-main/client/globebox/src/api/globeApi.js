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

// Export getAllMarkers for direct use
export const getAllMarkers = async () => {
    try {
        const response = await request.get(baseUrl);
        return response ? Object.values(response) : [];
    } catch (error) {
        console.error('Error fetching markers:', error);
        throw error;
    }
};

export const useMarkers = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        getAllMarkers()
            .then(setMarkers)
            .catch(() => setMarkers([]));
    }, []);

    return {
        markers,
        getAllMarkers, // Keep this for backward compatibility
    };
};

export const useMarker = (markerId) => {
    const [marker, setMarker] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${markerId}`)
            .then(response => ({
                ...response,
                lat: Number(response.lat) || 0,
                lng: Number(response.lng) || 0
            }))
            .then(setMarker)
            .catch(error => {
                console.error('Error fetching marker:', error);
                throw error;
            });
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

// Export the direct function
export const createMarker = async (markerData, accessToken) => {
    const options = {
        headers: {
            'X-Authorization': accessToken,
        }
    };
    
    return request.post(baseUrl, markerData, options)
        .catch(error => {
            console.error('Error creating marker:', error);
            throw error;
        });
};

// Keep the hook for components that need it
export const useCreateMarker = () => {
    const {options} = useAuth();

    const create = (markerData) => {
        return createMarker(markerData, options.headers['X-Authorization']);
    };

    return {
        createMarker: create, 
    }
};

export const useEditMarker = () => {
    const {options} = useAuth();

    const editMarker = (markerId, markerData) => {
        console.log('Edit request:', {
            url: `${baseUrl}/${markerId}`,
            data: markerData,
            options
        });

        return request.put(`${baseUrl}/${markerId}`, {...markerData, _id: markerId}, options)
            .catch(error => {
                console.error('Error editing marker:', error);
                throw error;
            });
    };

    return {
        editMarker, 
    }
};

// Similarly for delete
export const deleteMarker = async (markerId, accessToken) => {
    const options = {
        headers: {
            'X-Authorization': accessToken,
        }
    };
    
    return request.delete(`${baseUrl}/${markerId}`, null, options);
};

export const useDeleteMarker = () => {
    const {options} = useAuth(); 

    const remove = (markerId) => {
        return deleteMarker(markerId, options.headers['X-Authorization']);
    };

    return {
        deleteMarker: remove, 
    }
};
