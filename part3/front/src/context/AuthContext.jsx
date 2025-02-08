import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, getIsAdmin, saveAuthData, removeAuthData, isAuthenticated } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

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
        useNavigate('/')();
        window.location.reload();
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

        useNavigate('/')();
        window.location.reload();
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
