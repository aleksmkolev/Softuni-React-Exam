import { useState, useEffect } from 'react';
import { UserContext } from './UserContextInstance';
import authService from '../services/authService';

export const UserProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    const userLoginHandler = (authData) => {
        setAuth(authData);
    };

    const userLogoutHandler = () => {
        setAuth({});
    };

    const contextValue = {
        auth,
        userLoginHandler,
        userLogoutHandler,
        isAuthenticated: !!auth.accessToken
    };

    // Check session on mount
    useEffect(() => {
        authService.getSession()
            .then(session => {
                if (session) {
                    setAuth(session);
                }
            });
    }, []);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};