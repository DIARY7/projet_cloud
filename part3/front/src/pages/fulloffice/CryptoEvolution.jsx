import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Select from 'react-select';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fetchCryptoData = async () => {
    return {
        status: "success",
        code: 200,
        data: {
            evolution: {
                cryptoPrix: [
                    {
                        crypto: { id: 1, label: "BTC" },
                        details: [
                            { prix: 50000, date: "2025-01-28T09:00:00" },
                            { prix: 61000, date: "2025-01-29T09:00:00" }
                        ]
                    },
                    {
                        crypto: { id: 2, label: "ETH" },
                        details: [
                            { prix: 1000, date: "2025-01-28T09:00:00" },
                            { prix: 2100, date: "2025-01-29T09:00:00" }
                        ]
                    }
                ]
            }
        }
    };
};

const options = [
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
];

export default function CryptoEvolution() {
    const [selectedCrypto, setSelectedCrypto] = useState('BTC');
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchCryptoData();
            setCryptoData(data.data.evolution.cryptoPrix);
        };
        loadData();
    }, []);

    const dataForSelectedCrypto = cryptoData.find(item => item.crypto.label === selectedCrypto);

    if (!dataForSelectedCrypto) return <div>Loading...</div>;

    const chartData = {
        labels: dataForSelectedCrypto.details.map((entry) => new Date(entry.date).toLocaleDateString()),  // Dates formatées
        datasets: [
            {
                label: `${selectedCrypto} Price (MGA)`,
                data: dataForSelectedCrypto.details.map((entry) => entry.prix),
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
                        defaultValue={options.find(opt => opt.value === selectedCrypto)}
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
