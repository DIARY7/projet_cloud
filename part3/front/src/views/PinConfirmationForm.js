import React, { useState } from 'react';

function PinConfirmationForm() {
    const [pin, setPin] = useState('');
    const [email] = useState('user@example.com');  // Exemple d'email caché, vous pouvez le récupérer d'une autre manière

    const handleChange = (e) => {
        const { value } = e.target;
        if (value.length <= 4) {
            setPin(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Vous pouvez ici envoyer le PIN et l'email pour la validation
        console.log('PIN soumis:', pin);
        console.log('Email:', email);
    };

    return (
        <div className="container mt-5">
            {/* Section principale avec un titre */}
            <div className="row text-center mb-5">
                <div className="col">
                    <h1 className="display-4 text-warning">Confirmer votre Code PIN</h1>
                    <p className="lead text-muted">Veuillez entrer le code PIN envoyé pour confirmer votre identité.</p>
                </div>
            </div>

            {/* Formulaire de confirmation du PIN */}
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <form onSubmit={handleSubmit}>
                        {/* Champ caché pour l'email */}
                        <input type="hidden" name="email" value={email} />

                        <div className="mb-3">
                            <label htmlFor="pin" className="form-label">Code PIN</label>
                            <input
                                type="text"
                                className="form-control text-center"
                                id="pin"
                                name="pin"
                                value={pin}
                                onChange={handleChange}
                                maxLength="6"
                                required
                                autoFocus
                            />
                        </div>

                        <button type="submit" className="btn btn-warning w-100">Confirmer le PIN</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PinConfirmationForm;
