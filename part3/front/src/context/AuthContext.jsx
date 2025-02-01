import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, getIsAdmin, saveAuthData, removeAuthData, isAuthenticated } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(getToken());
    const [isAdmin, setIsAdmin] = useState(getIsAdmin());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated()) {
            setToken(getToken());
            setIsAdmin(getIsAdmin());
        }
        setLoading(false);
    }, []);

    const login = (newToken, newIsAdmin) => {
        saveAuthData(newToken, newIsAdmin);
        setToken(newToken);
        setIsAdmin(newIsAdmin);
    };

    const logout = () => {
        removeAuthData();
        setToken(null);
        setIsAdmin(false);
    };

    const value = {
        token,
        isAdmin,
        loading,
        login,
        logout,
        isAuthenticated: () => isAuthenticated()
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
