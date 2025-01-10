// // src/views/TransactionList.js
// import React, { useState, useEffect } from 'react';

// function TransactionList() {
//     // État pour stocker les transactions
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(false);

//     // Données statiques pour les transactions
//     const staticTransactions = [
//         {
//             id: 1,
//             user: "Utilisateur1",
//             type: "Achat",
//             quantity: 2.5,
//             crypto: "Bitcoin",
//             amount: 10000,
//             currency: "USD",
//             date: "2025-01-01T14:30:00Z"
//         },
//         {
//             id: 2,
//             user: "Utilisateur2",
//             type: "Vente",
//             quantity: 1.0,
//             crypto: "Ethereum",
//             amount: 3000,
//             currency: "EUR",
//             date: "2025-01-02T09:00:00Z"
//         },
//         {
//             id: 3,
//             user: "Utilisateur3",
//             type: "Achat",
//             quantity: 5.0,
//             crypto: "Ripple",
//             amount: 5000,
//             currency: "GBP",
//             date: "2025-01-03T16:00:00Z"
//         },
//         {
//             id: 4,
//             user: "Utilisateur4",
//             type: "Vente",
//             quantity: 0.8,
//             crypto: "Litecoin",
//             amount: 1200,
//             currency: "JPY",
//             date: "2025-01-04T11:15:00Z"
//         },
//         {
//             id: 5,
//             user: "Utilisateur5",
//             type: "Achat",
//             quantity: 3.2,
//             crypto: "Cardano",
//             amount: 7000,
//             currency: "CHF",
//             date: "2025-01-05T13:30:00Z"
//         }
//     ];

//     // Utilisation de useEffect pour charger les données statiques
//     useEffect(() => {
//         setLoading(true);
//         // Simuler un délai de chargement
//         setTimeout(() => {
//             setTransactions(staticTransactions);
//             setLoading(false);
//         }, 1000);
//     }, []);

//     if (loading) {
//         return <div>Chargement des transactions...</div>;
//     }

//     return (
//         <div className="container mt-5">
//             <h2 class="text-warning" >Liste des Transactions</h2>
//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th scope="col">ID</th>
//                         <th scope="col">Utilisateur</th>
//                         <th scope="col">Type de Transaction</th>
//                         <th scope="col">Quantité</th>
//                         <th scope="col">Cryptomonnaie</th>
//                         <th scope="col">Montant</th>
//                         <th scope="col">Devise</th>
//                         <th scope="col">Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {transactions.map((transaction) => (
//                         <tr key={transaction.id}>
//                             <td>{transaction.id}</td>
//                             <td>{transaction.user}</td>
//                             <td>{transaction.type}</td>
//                             <td>{transaction.quantity}</td>
//                             <td>{transaction.crypto}</td>
//                             <td>{transaction.amount}</td>
//                             <td>{transaction.currency}</td>
//                             <td>{new Date(transaction.date).toLocaleString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default TransactionList;

// src/views/TransactionList.js
import React, { useState, useEffect } from 'react';

function TransactionList() {
    // État pour stocker les transactions
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Filtres sélectionnés
    const [userFilter, setUserFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [cryptoFilter, setCryptoFilter] = useState('');

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

    // Fonction pour filtrer les transactions
    const filteredTransactions = transactions.filter((transaction) => {
        return (
            (userFilter ? transaction.user === userFilter : true) &&
            (typeFilter ? transaction.type === typeFilter : true) &&
            (cryptoFilter ? transaction.crypto === cryptoFilter : true)
        );
    });

    if (loading) {
        return <div>Chargement des transactions...</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-warning">Liste des Transactions</h2>

            {/* Tableau des Transactions */}
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
                    {filteredTransactions.map((transaction) => (
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

            {/* Filtres */}
            <div className="mb-4">
                <label htmlFor="userFilter" className="form-label">Filtrer par Utilisateur :</label>
                <select
                    id="userFilter"
                    className="form-select"
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                >
                    <option value="">Tous les utilisateurs</option>
                    <option value="Utilisateur1">Utilisateur1</option>
                    <option value="Utilisateur2">Utilisateur2</option>
                    <option value="Utilisateur3">Utilisateur3</option>
                    <option value="Utilisateur4">Utilisateur4</option>
                    <option value="Utilisateur5">Utilisateur5</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="typeFilter" className="form-label">Filtrer par Type de Transaction :</label>
                <select
                    id="typeFilter"
                    className="form-select"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="">Tous les types</option>
                    <option value="Achat">Achat</option>
                    <option value="Vente">Vente</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="cryptoFilter" className="form-label">Filtrer par Cryptomonnaie :</label>
                <select
                    id="cryptoFilter"
                    className="form-select"
                    value={cryptoFilter}
                    onChange={(e) => setCryptoFilter(e.target.value)}
                >
                    <option value="">Toutes les cryptomonnaies</option>
                    <option value="Bitcoin">Bitcoin</option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="Ripple">Ripple</option>
                    <option value="Litecoin">Litecoin</option>
                    <option value="Cardano">Cardano</option>
                </select>
            </div>
        </div>
    );
}

export default TransactionList;
