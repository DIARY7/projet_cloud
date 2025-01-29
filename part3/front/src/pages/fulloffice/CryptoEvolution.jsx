import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Select from 'react-select';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const cryptoData = {
    BTC: [
        { date: '2024-01-01', price: 30000 },
        { date: '2024-01-02', price: 32000 },
        { date: '2024-01-03', price: 31000 },
        { date: '2024-01-04', price: 33000 },
        { date: '2024-01-05', price: 34000 },
    ],
    ETH: [
        { date: '2024-01-01', price: 2000 },
        { date: '2024-01-02', price: 2100 },
        { date: '2024-01-03', price: 2050 },
        { date: '2024-01-04', price: 2200 },
        { date: '2024-01-05', price: 2300 },
    ],
    XRP: [
        { date: '2024-01-01', price: 0.5 },
        { date: '2024-01-02', price: 0.6 },
        { date: '2024-01-03', price: 0.55 },
        { date: '2024-01-04', price: 0.65 },
        { date: '2024-01-05', price: 0.7 },
    ]
};

const options = [
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'XRP', label: 'XRP (XRP)' },
];

export default function CryptoEvolution() {
    const [selectedCrypto, setSelectedCrypto] = useState('BTC');

    // Extraire les données pour le graphique en fonction de la cryptomonnaie sélectionnée
    const data = cryptoData[selectedCrypto];

    const chartData = {
        labels: data.map((entry) => entry.date),  // Dates
        datasets: [
            {
                label: `${selectedCrypto} Price (MGA)`,
                data: data.map((entry) => entry.price),
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
    };

    const handleChange = (selectedOption) => {
        setSelectedCrypto(selectedOption.value);
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8">
                    <TrendingUp className="h-8 w-8 text-yellow-500 mr-3" />
                    <h1 className="text-3xl font-bold text-white">Évolution des Cryptomonnaies</h1>
                </div>

                <div className="mb-4">
                    <Select
                        options={options}
                        onChange={handleChange}
                        defaultValue={options[0]}
                        className="w-60"
                    />
                </div>

                <div className="bg-gray-800 rounded-lg shadow p-6">
                    <div style={{ position: 'relative', height: '400px' }}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
}
