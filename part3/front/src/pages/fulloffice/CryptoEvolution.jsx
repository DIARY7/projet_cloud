import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { LineChart, X } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Select from 'react-select';
import ErrorMessage from '../fulloffice/error/ErrorMessage';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const fetchCryptoData = async () => {
    try {
        const response = await fetch("http://localhost:8080/crypto/evolution");
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
        }
        const result = await response.json();
        console.log(result.data);
        return result;
    } catch (error) {
        throw new Error('Une erreur est survenue lors de la récupération des données');
    }
};


export default function CryptoEvolution() {
    const [selectedCrypto, setSelectedCrypto] = useState('BTC');
    const [cryptoData, setCryptoData] = useState([]);
    const [options, setOptions] = useState([]);
    const [error, setError] = useState(null);
    const [stackTrace, setStackTrace] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchCryptoData();
                setCryptoData(data.data.evolution.cryptoPrix);
                setOptions(data.data.cryptos);
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
                        <LineChart className="h-8 w-8 text-yellow-500 mr-3" />
                        <h1 className="text-3xl font-bold text-white">Évolution des Cryptomonnaies</h1>
                    </div>
                    <ErrorMessage message={error} stackTrace={stackTrace} />
                </div>
            </div>
        );
    }

    const dataForSelectedCrypto = cryptoData.find(item => item.crypto.label === selectedCrypto);

    if (!dataForSelectedCrypto) return <div>Loading...</div>;

    const chartData = {
        labels: dataForSelectedCrypto.details.map((entry) =>
            new Date(entry.date).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit', year: 'numeric', month: 'numeric', day: 'numeric' })
        ),
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
                    <LineChart className="h-8 w-8 text-yellow-500 mr-3" />
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
