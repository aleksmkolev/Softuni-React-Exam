import { useContext, useEffect } from "react";
import request from "../utils/request"
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/users';

export const useLogin = () => {
    const login = async (email, password) => {
        return await request.post(`${baseUrl}/login`, { email, password });
    }

    return {
        login,
    }
}

export const useRegister = () => {
    const register = async (email, username, password) => {
        return await request.post(`${baseUrl}/register`, { email, username, password });
    }

    return {
        register,
    }
}

export const useLogout = () => {
    const {accessToken, useLogoutHandler} = useContext(UserContext);

    useEffect(() => {
        if(!accessToken) {
            return;
        }

        const options = {
            headers: {
                'X-Authorization': accessToken,
            }
        }

        request.get(`${baseUrl}/logout`, null, options)
            // .then(useLogoutHandler)
            .finally(useLogoutHandler);
    },[accessToken, useLogoutHandler]);

    return {
        // isLoggedOut: Boolean(!accessToken),
        isLoggedOut: !!accessToken,
    }
}