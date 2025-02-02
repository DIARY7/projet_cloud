import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Unlock } from 'lucide-react'; // Icône de sécurité

export default function PinConfirmation() {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handlePinChange = (e) => {
        setPin(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pin.length === 6) {
            console.log('PIN correct, validation réussie !');
            setError('');
        } else {
            setError('Le PIN doit comporter exactement 6 chiffres.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Lock className="mx-auto h-12 w-12 text-yellow-500" />
                    <h2 className="mt-6 text-3xl font-bold text-white">Confirmer votre PIN</h2>
                    <p className="mt-2 text-sm text-gray-400">Entrez votre code PIN pour confirmer l'action.</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                type="password"
                                required
                                maxLength="6"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                                placeholder="PIN à 6 chiffres"
                                value={pin}
                                onChange={handlePinChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <Unlock className="h-5 w-5 text-gray-900" />
                            </span>
                            Confirmer
                        </button>
                    </div>

                    <div className="text-center">
                        <Link to="/" className="text-yellow-500 hover:text-yellow-400">
                            Retourner à l'accueil
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
