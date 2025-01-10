// src/views/CryptoPrices.js
import React, { useState, useEffect } from 'react';

const CryptoPrices = () => {
    // Générer des données de cryptomonnaies aléatoires
    const generateRandomPrice = () => {
        return (Math.random() * (50000 - 1000) + 1000).toFixed(2);
    };

    const [prices, setPrices] = useState([
        { name: 'Bitcoin', symbol: 'BTC', price: generateRandomPrice() },
        { name: 'Ethereum', symbol: 'ETH', price: generateRandomPrice() },
        { name: 'Ripple', symbol: 'XRP', price: generateRandomPrice() },
        { name: 'Litecoin', symbol: 'LTC', price: generateRandomPrice() },
        { name: 'Cardano', symbol: 'ADA', price: generateRandomPrice() },
    ]);

    // Mettre à jour les prix toutes les 5 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prices.map(crypto => ({
                ...crypto,
                price: generateRandomPrice()
            })));
        }, 5000);

        // Nettoyer l'intervalle à la désactivation du composant
        return () => clearInterval(interval);
    }, [prices]);

    return (
        <div className="container">
            <h1 className="my-4 text-warning">Prix des Cryptomonnaies en Temps Réel</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Symbole</th>
                        <th>Prix (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map((crypto, index) => (
                        <tr key={index}>
                            <td>{crypto.name}</td>
                            <td>{crypto.symbol}</td>
                            <td>${crypto.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoPrices;
