import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import Navbar from '../../components/NavBar';

export default function EditCommission() {
    const [commissionValue, setCommissionValue] = useState('');
    const [commissionType, setCommissionType] = useState('1');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:8080/commission/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    typeCommissionId: commissionType,
                    pourcentage: commissionValue,
                })
            });

            const data = await response.json();

            if (data.status == 'success') {
                setSuccessMessage('Commission mise à jour avec succès!');
            } else {
                setError('Erreur lors de la mise à jour de la commission: ' + data.message);
                console.error(data.error);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la commission", error);
            setError('Une erreur est survenue lors de la mise à jour.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <Settings className="mx-auto h-12 w-12 text-yellow-500" />
                        <h2 className="mt-6 text-3xl font-bold text-white">
                            Modifier la commission
                        </h2>
                    </div>

                    {/* Affichage du message de succès ou d'erreur */}
                    {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}
                    {error && <div className="text-red-500 text-center">{error}</div>}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input
                                    type="number"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                                    placeholder="Valeur de la commission"
                                    value={commissionValue}
                                    onChange={(e) => setCommissionValue(e.target.value)}
                                    min="0"
                                />
                            </div>

                            <div className="mt-4">
                                <select
                                    id="commissionType"
                                    name="commissionType"
                                    value={commissionType}
                                    onChange={(e) => setCommissionType(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                >
                                    <option value="1">Commission sur vente</option>
                                    <option value="2">Commission sur achat</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <Save className="h-5 w-5 text-gray-900" />
                                </span>
                                Sauvegarder
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
