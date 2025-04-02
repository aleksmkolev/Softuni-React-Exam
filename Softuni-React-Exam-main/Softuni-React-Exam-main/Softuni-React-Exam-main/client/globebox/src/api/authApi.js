import { useContext, useEffect } from "react";
import request from "../utils/request"
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/users';

export const useLogin = () => {
    const login = async (email, password) => {
        try {
            return await request.post(`${baseUrl}/login`, {
                email,
                password
            });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    return {
        login,
    }
}

export const useRegister = () => {
    const register = async (email, password) => {
        try {
            return await request.post(`${baseUrl}/register`, {
                email,
                password,
                username: email // Use email as username if not provided
            });
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
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