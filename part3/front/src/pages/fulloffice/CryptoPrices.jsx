import React, { useState, useEffect } from 'react';
import { Monitor } from 'lucide-react';
import ErrorMessage from '../fulloffice/error/ErrorMessage';

const fetchCryptoPrices = async () => {
    const isError = false; 
    if (isError) {
        throw new Error('Une erreur est survenue lors de la récupération des prix');
    }

    return {
        status: 'success',
        code: 200,
        data: [
            { id: 1, label: 'BTC', price: 15000000 },
            { id: 2, label: 'ETH', price: 1200000 },
            { id: 3, label: 'XRP', price: 2000 },
            { id: 4, label: 'ADA', price: 1000 },
            { id: 5, label: 'DOT', price: 3000 },
        ],
        error: null,
        message: null,
    };
};

export default function CryptoPrices() {
    const [cryptoData, setCryptoData] = useState([]);
    const [error, setError] = useState(null);
    const [stackTrace, setStackTrace] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchCryptoPrices();
                setCryptoData(data.data);
                setError(null);
                setStackTrace(null);
            } catch (err) {
                setError(err.message);
                setStackTrace(err.stack);
            }
        };
        loadData();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center mb-8">
                        <Monitor className="h-8 w-8 text-yellow-500 mr-3" />
                        <h1 className="text-3xl font-bold text-white">Cours des Cryptomonnaies</h1>
                    </div>
                    <ErrorMessage message={error} stackTrace={stackTrace} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8">
                    <Monitor className="h-8 w-8 text-yellow-500 mr-3" />
                    <h1 className="text-3xl font-bold text-white">Cours des Cryptomonnaies</h1>
                </div>

                <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Crypto
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Prix (MGA)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {cryptoData.map((crypto) => (
                                    <tr key={crypto.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-white">{crypto.label.toUpperCase()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-white">{crypto.price.toLocaleString()} MGA</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
