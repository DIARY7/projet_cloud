// src/views/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center mt-5 pt-5">
            <div className="text-center">
                <h1 className="display-1 text-danger">404</h1>
                <h2 className="text-muted">Page non trouvée</h2>
                <p className="lead text-center mt-4">
                    Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
                </p>
                <Link to="/" className="btn btn-primary btn-lg mt-4">
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
