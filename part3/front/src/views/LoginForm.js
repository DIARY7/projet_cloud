import React, { useState } from 'react';

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Vous pouvez ajouter ici le code pour gérer l'envoi du formulaire, par exemple, une requête API.
        console.log('Login form submitted', formData);
    };

    return (
        <div className="container mt-5">
            {/* Section principale avec un titre */}
            <div className="row text-center mb-5">
                <div className="col">
                    <h1 className="display-4 text-warning">Se Connecter</h1>
                    <p className="lead text-muted">Entrez vos informations pour accéder à votre compte.</p>
                </div>
            </div>

            {/* Formulaire de connexion */}
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mot de Passe</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-warning w-100">Se Connecter</button>
                    </form>
                </div>
            </div>

            {/* Section d'informations supplémentaires */}
            <div className="row mt-5 text-center">
                <div className="col">
                    <p className="text-muted">Pas encore de compte ? <a href="/sign-up">Inscrivez-vous ici</a>.</p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
