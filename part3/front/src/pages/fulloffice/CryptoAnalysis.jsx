import React, { useState, useEffect } from 'react';
import { BarChart } from 'lucide-react';
import ErrorMessage from '../fulloffice/error/ErrorMessage';

const fetchCryptoData = async () => {
    try {
        const response = await fetch("http://localhost:8080/crypto/analyse");
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error('Une erreur est survenue lors de la récupération des données');
    }

    return {
        status: "success",
        code: 200,
        data: {
            analyse: {
                analyseCryptos: [
                    {
                        crypto: { id: 1, label: "BTC" },
                        min: 100000,
                        max: 2000000,
                        moyenne: 500000,
                        firstQuartile: 500000,
                        ecartType: 600000
                    },
                    {
                        crypto: { id: 2, label: "ETH" },
                        min: 50000,
                        max: 2500000,
                        moyenne: 1000000,
                        firstQuartile: 500000,
                        ecartType: 600000
                    }
                ]
            }
        },
        error: null,
        message: null
    };
};

export default function CryptoAnalysis() {
    const [cryptoData, setCryptoData] = useState([]);
    const [error, setError] = useState(null);
    const [stackTrace, setStackTrace] = useState(null);

    const [selectedCryptos, setSelectedCryptos] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [maxDate, setMaxDate] = useState('');
    const [minDate, setMinDate] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchCryptoData();
                setCryptoData(data.data.analyse.analyseCryptos);
                setError(null);
                setStackTrace(null);
            } catch (err) {
                setError(err.message);
                setStackTrace(err.stack);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (selectedCryptos.length === cryptoData.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedCryptos, cryptoData.length]);

    const handleCheckboxChange = (cryptoName) => {
        setSelectedCryptos((prevSelected) =>
            prevSelected.includes(cryptoName)
                ? prevSelected.filter((label) => label !== cryptoName)
                : [...prevSelected, cryptoName]
        );
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedCryptos([]); // Deselect all
        } else {
            setSelectedCryptos(cryptoData.map(crypto => crypto.crypto.label)); // Select all
        }
    };

    const handleMaxDateChange = (e) => {
        setMaxDate(e.target.value);
    }

    const handleMinDateChange = (e) => {
        setMinDate(e.target.value);
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center mb-8">
                        <BarChart className="h-8 w-8 text-yellow-500 mr-3" />
                        <h1 className="text-3xl font-bold text-white">Analyse des Cryptomonnaies</h1>
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
                    <BarChart className="h-8 w-8 text-yellow-500 mr-3" />
                    <h1 className="text-3xl font-bold text-white">Analyse des Cryptomonnaies</h1>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Filtres de Cryptomonnaies</h2>
                        <div className="flex flex-wrap gap-2 items-center mb-4">
                            <div className="me-2 flex flex-wrap gap-2 items-center">
                                <label className="text-white">Date Minimum:</label>
                                <input
                                    type="datetime-local"
                                    value={minDate}
                                    onChange={handleMinDateChange}
                                    className="px-4 py-2 rounded-lg text-black"
                                />
                            </div>
                            <div className="me-2 flex flex-wrap gap-2 items-center">
                                <label className="text-white">Date Maximum:</label>
                                <input
                                    type="datetime-local"
                                    value={maxDate}
                                    onChange={handleMaxDateChange}
                                    className="px-4 py-2 rounded-lg text-black"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="selectAll"
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                    className="form-checkbox h-5 w-5 text-yellow-500"
                                />
                                <label htmlFor="selectAll" className="ml-2 text-white">
                                    Tous
                                </label>
                            </div>
                            {cryptoData.map((crypto) => (
                                <div key={crypto.crypto.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={crypto.crypto.label}
                                        checked={selectedCryptos.includes(crypto.crypto.label)}
                                        onChange={() => handleCheckboxChange(crypto.crypto.label)}
                                        className="form-checkbox h-5 w-5 text-yellow-500"
                                    />
                                    <label htmlFor={crypto.crypto.label} className="ml-2 text-white">
                                        {crypto.crypto.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-800 overflow-x-auto rounded-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Tableau des Statistiques (en MGA)</h2>
                        <table className="min-w-full table-auto text-gray-300">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Cryptomonnaie</th>
                                    <th className="px-4 py-2 text-left">Min</th>
                                    <th className="px-4 py-2 text-left">Max</th>
                                    <th className="px-4 py-2 text-left">1er Quartile</th>
                                    <th className="px-4 py-2 text-left">Moyenne</th>
                                    <th className="px-4 py-2 text-left">Ecart-Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cryptoData
                                    .filter((crypto) => selectedCryptos.includes(crypto.crypto.label))
                                    .map((crypto) => (
                                        <tr key={crypto.crypto.id}>
                                            <td className="px-4 py-2">{crypto.crypto.label}</td>
                                            <td className="px-4 py-2">{crypto.min}</td>
                                            <td className="px-4 py-2">{crypto.max}</td>
                                            <td className="px-4 py-2">{crypto.firstQuartile}</td>
                                            <td className="px-4 py-2">{crypto.moyenne}</td>
                                            <td className="px-4 py-2">{crypto.ecartType}</td>
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
