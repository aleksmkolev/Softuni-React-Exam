import { useState } from 'react';
import { UserContext } from './UserContextInstance';

export const UserProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    const userLoginHandler = (authData) => {
        setAuth(authData);
        localStorage.setItem('accessToken', authData.accessToken);
    };

    const userLogoutHandler = () => {
        setAuth({});
        localStorage.removeItem('accessToken');
    };

    const contextValue = {
        auth,
        userLoginHandler,
        userLogoutHandler,
        isAuthenticated: !!auth.accessToken
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};