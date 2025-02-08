import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, PlusCircle, MinusCircle } from 'lucide-react';
import Navbar from '../../components/NavBar';

export default function TransactionsValidation() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://localhost:8080/fond/transaction');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const result = await response.json();
                setTransactions(result.data.demandes || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) {
        return <div className="text-white text-center">Chargement des transactions...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">Erreur : {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-center mb-8">
                    <ArrowRightLeft className="h-8 w-8 text-yellow-500 mr-3" />
                    <h1 className="text-3xl font-bold text-white">Transactions à valider</h1>
                </div>

                <div className="bg-gray-800 rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full table-auto divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Utilisateur</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Entrée</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sortie</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {transaction.entree > 0 ? (
                                                <MinusCircle className="h-5 w-5 text-green-500 mr-2" />
                                            ) : (
                                                <PlusCircle className="h-5 w-5 text-red-500 mr-2" />
                                            )}
                                            <span className="text-white">
                                                {transaction.entree > 0 ? 'Dépôt' : 'Retrait'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-yellow-500">
                                        <Link to="/transactions">
                                            <div className="flex items-center">
                                                <img
                                                    src={`https://robohash.org/${transaction.user.id}?set=set1`}
                                                    alt={transaction.user.id}
                                                    className="h-8 w-8 rounded-full mr-2"
                                                />
                                                <span>{transaction.user.email}</span>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-white">
                                        {transaction.entree}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-white">
                                        {transaction.sortie}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-white">
                                        {new Date(transaction.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-white">
                                        <div className="flex items-center gap-4">
                                            <Link className="text-green-500">Valider</Link>
                                            <Link className="text-red-500">Refuser</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
