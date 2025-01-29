import React, { useState, useEffect } from 'react';
import { BarChart } from 'lucide-react';

const commissionData = [
    { name: 'Bitcoin', somme: 1000, moyenne: 200 },
    { name: 'Ethereum', somme: 1500, moyenne: 300 },
    { name: 'Ripple', somme: 500, moyenne: 100 },
    { name: 'Litecoin', somme: 800, moyenne: 150 },
];

export default function CommissionAnalysis() {
    const [selectedCryptos, setSelectedCryptos] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [maxDate, setMaxDate] = useState('');
    const [minDate, setMinDate] = useState('');

    useEffect(() => {
        if (selectedCryptos.length === commissionData.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedCryptos]);

    const handleCheckboxChange = (cryptoName) => {
        setSelectedCryptos((prevSelected) =>
            prevSelected.includes(cryptoName)
                ? prevSelected.filter((name) => name !== cryptoName)
                : [...prevSelected, cryptoName]
        );
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedCryptos([]); // Deselect all
        } else {
            setSelectedCryptos(commissionData.map(crypto => crypto.name)); // Select all
        }
    };

    const handleDateChange = (e) => {
        setMaxDate(e.target.value);
        setMinDate(e.target.value);
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8">
                    <BarChart className="h-8 w-8 text-yellow-500 mr-3" />
                    <h1 className="text-3xl font-bold text-white">Analyse des Commissions</h1>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Filtres des Cryptomonnaies</h2>
                        <div className="flex flex-wrap gap-2 items-center mb-4">
                            <div className="me-2 flex flex-wrap gap-2 items-center"> 
                                <label className="text-white">Date Minimum:</label>
                                <input
                                    type="datetime-local"
                                    value={maxDate}
                                    onChange={handleDateChange}
                                    className="px-4 py-2 rounded-lg text-black"
                                />
                            </div>
                            <div className="me-2 flex flex-wrap gap-2 items-center"> 
                                <label className="text-white">Date Maximum:</label>
                                <input
                                    type="datetime-local"
                                    value={minDate}
                                    onChange={handleDateChange}
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
                            {commissionData.map((crypto) => (
                                <div key={crypto.name} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={crypto.name}
                                        checked={selectedCryptos.includes(crypto.name)}
                                        onChange={() => handleCheckboxChange(crypto.name)}
                                        className="form-checkbox h-5 w-5 text-yellow-500"
                                    />
                                    <label htmlFor={crypto.name} className="ml-2 text-white">
                                        {crypto.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-800 overflow-x-auto rounded-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Tableau des Commissions (en MGA)</h2>
                        <table className="min-w-full table-auto text-gray-300">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Cryptomonnaie</th>
                                    <th className="px-4 py-2 text-left">Somme</th>
                                    <th className="px-4 py-2 text-left">Moyenne</th>
                                </tr>
                            </thead>
                            <tbody>
                                {commissionData
                                    .filter((crypto) => selectedCryptos.includes(crypto.name))
                                    .map((crypto) => (
                                        <tr key={crypto.name}>
                                            <td className="px-4 py-2">{crypto.name}</td>
                                            <td className="px-4 py-2">{crypto.somme}</td>
                                            <td className="px-4 py-2">{crypto.moyenne}</td>
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
