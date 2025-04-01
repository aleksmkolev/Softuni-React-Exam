import { useState, useEffect } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Initialize state from localStorage
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {
            _id: '',
            email: '',
            username: '',
            accessToken: '',
        };
    });

    // Update localStorage when user state changes
    useEffect(() => {
        if (user.accessToken) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const userLoginHandler = (userData) => {
        setUser(userData);
    };

    const userRegisterHandler = (userData) => {
        setUser(userData);
    };

    const userLogoutHandler = () => {
        setUser({
            _id: '',
            email: '',
            username: '',
            accessToken: '',
        });
    };

    const contextValue = {
        ...user,
        userLoginHandler,
        userRegisterHandler,
        userLogoutHandler,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}; 