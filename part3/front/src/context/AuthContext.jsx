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

    const checkAuth = () => {
        if (!isAuthenticated()) {
            window.location.href = '/login';
        }
    };

    const login = (newToken, newIsAdmin) => {
        saveAuthData(newToken, newIsAdmin);
        setToken(newToken);
        setIsAdmin(newIsAdmin);
        window.location.href = '/'; 
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la déconnexion');
            }
        } catch (error) {
            console.error('Erreur API:', error);
        }

        removeAuthData();
        setToken(null);
        setIsAdmin(false);
        window.location.href = '/'; 
    };

    const value = {
        token,
        isAdmin,
        loading,
        login,
        logout,
        checkAuth,
        isAuthenticated: () => isAuthenticated()
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
