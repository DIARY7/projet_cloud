import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (!isAdmin) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
