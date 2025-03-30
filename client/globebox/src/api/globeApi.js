import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/locations';

export const useLocations = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then(setLocations)
    }, []);

    return { locations };
};

export const useLocation = (locationId) => {
    const [location, setLocation] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${locationId}`)
            .then(setLocation);
    }, [locationId])

    return {
        location,
    };
};

export const useLatestLocations = () => {
    const [latestLocations, setLatestLocations] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 3,
            select: '_id,imageUrl,title',
        });

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setLatestLocations)
    }, []);

    return { latestLocations };
};

export const useCreateLocation = () => {
    const { request } = useAuth();

    const create = (locationData) =>
        request.post(baseUrl, locationData);

    return {
        create,
    }
};

export const useEditLocation = () => {
    const { request } = useAuth();

    const edit = (locationId, locationData) =>
        request.put(`${baseUrl}/${locationId}`, { ...locationData, _id: locationId });

    return {
        edit,
    }
};

export const useDeleteLocation = () => {
    const { request } = useAuth();

    const deleteLocation = (locationId) =>
        request.delete(`${baseUrl}/${locationId}`);

    return {
        deleteLocation,
    }
};
