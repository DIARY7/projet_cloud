import React from 'react';

function About() {
    return (
        <div className="container mt-5">
            {/* Section principale */}
            <div className="row text-center mb-5">
                <div className="col">
                    <h1 className="display-4 text-warning">À propos de l'application</h1>
                    <p className="lead text-muted">Une plateforme dédiée à l'univers des cryptomonnaies et de la blockchain.</p>
                    <p>
                        Cette application permet aux utilisateurs de suivre les prix des cryptomonnaies, de gérer un portefeuille sécurisé, et de réaliser des échanges de manière rapide et intuitive.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
