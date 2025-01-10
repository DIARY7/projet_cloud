// src/views/TransactionList.js
import React, { useState, useEffect } from 'react';

function TransactionList() {
    // État pour stocker les transactions
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Données statiques pour les transactions
    const staticTransactions = [
        {
            id: 1,
            user: "Utilisateur1",
            type: "Achat",
            quantity: 2.5,
            crypto: "Bitcoin",
            amount: 10000,
            currency: "USD",
            date: "2025-01-01T14:30:00Z"
        },
        {
            id: 2,
            user: "Utilisateur2",
            type: "Vente",
            quantity: 1.0,
            crypto: "Ethereum",
            amount: 3000,
            currency: "EUR",
            date: "2025-01-02T09:00:00Z"
        },
        {
            id: 3,
            user: "Utilisateur3",
            type: "Achat",
            quantity: 5.0,
            crypto: "Ripple",
            amount: 5000,
            currency: "GBP",
            date: "2025-01-03T16:00:00Z"
        },
        {
            id: 4,
            user: "Utilisateur4",
            type: "Vente",
            quantity: 0.8,
            crypto: "Litecoin",
            amount: 1200,
            currency: "JPY",
            date: "2025-01-04T11:15:00Z"
        },
        {
            id: 5,
            user: "Utilisateur5",
            type: "Achat",
            quantity: 3.2,
            crypto: "Cardano",
            amount: 7000,
            currency: "CHF",
            date: "2025-01-05T13:30:00Z"
        }
    ];

    // Utilisation de useEffect pour charger les données statiques
    useEffect(() => {
        setLoading(true);
        // Simuler un délai de chargement
        setTimeout(() => {
            setTransactions(staticTransactions);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div>Chargement des transactions...</div>;
    }

    return (
        <div className="container mt-5">
            <h2 class="text-warning" >Liste des Transactions</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Utilisateur</th>
                        <th scope="col">Type de Transaction</th>
                        <th scope="col">Quantité</th>
                        <th scope="col">Cryptomonnaie</th>
                        <th scope="col">Montant</th>
                        <th scope="col">Devise</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.user}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.quantity}</td>
                            <td>{transaction.crypto}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.currency}</td>
                            <td>{new Date(transaction.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionList;
