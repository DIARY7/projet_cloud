// src/views/CryptoChart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function CryptoChart() {
    // État pour stocker les données du graphique
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Prix en USD',
                data: [],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    });

    const [loading, setLoading] = useState(true);
    const [selectedCrypto, setSelectedCrypto] = useState('bitcoin'); // Par défaut, afficher Bitcoin
    const [cryptos] = useState([
        { name: 'Bitcoin', symbol: 'bitcoin' },
        { name: 'Ethereum', symbol: 'ethereum' },
        { name: 'Ripple', symbol: 'ripple' },
        { name: 'Litecoin', symbol: 'litecoin' },
        { name: 'Cardano', symbol: 'cardano' },
    ]);

    // Fonction pour récupérer les données des prix d'une cryptomonnaie
    const fetchCryptoData = async (crypto) => {
        try {
            // Requête à l'API de CoinGecko pour obtenir les prix des cryptos
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=30`);
            const data = await response.json();

            // Récupérer les prix et les dates
            const prices = data.prices.map(price => price[1]);
            const labels = data.prices.map(price => new Date(price[0]).toLocaleDateString());

            // Mettre à jour l'état avec les nouvelles données
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: `Prix en USD - ${crypto.charAt(0).toUpperCase() + crypto.slice(1)}`,
                        data: prices,
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.1,
                    },
                ],
            });
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de la crypto :', error);
            setLoading(false);
        }
    };

    // Fonction pour gérer la sélection de la cryptomonnaie
    const handleCryptoChange = (e) => {
        setSelectedCrypto(e.target.value);
        setLoading(true); // Montrer le message de chargement pendant la récupération des nouvelles données
        fetchCryptoData(e.target.value);
    };

    // Utilisation de useEffect pour récupérer les données au montage du composant
    useEffect(() => {
        fetchCryptoData(selectedCrypto);
    }, [selectedCrypto]);

    if (loading) {
        return <div>Chargement du graphique...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Évolution du Prix de la Cryptomonnaie</h2>

            {/* Sélecteur de cryptomonnaie */}
            <div className="mb-4">
                <label htmlFor="crypto" className="form-label">
                    Choisir une Cryptomonnaie
                </label>
                <select
                    className="form-select"
                    id="crypto"
                    value={selectedCrypto}
                    onChange={handleCryptoChange}
                >
                    {cryptos.map((crypto) => (
                        <option key={crypto.symbol} value={crypto.symbol}>
                            {crypto.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Affichage du graphique */}
            <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
    );
}

export default CryptoChart;
