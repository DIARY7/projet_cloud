import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Save } from 'lucide-react';

export default function EditCommission() {
    const [commissionValue, setCommissionValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Commission enregistrée:', commissionValue);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Settings className="mx-auto h-12 w-12 text-yellow-500" />
                    <h2 className="mt-6 text-3xl font-bold text-white">
                        Modifier la commission
                    </h2>
                </div>
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
    );
}
