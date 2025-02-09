import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, PlusCircle, MinusCircle } from 'lucide-react';
import Navbar from '../../components/NavBar';
import { getToken } from '../../utils/auth';
import { formatDate } from '../../utils/formattage';

export default function TransactionsValidation() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = getToken();

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/fond/transaction', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            const result = await response.json();
            if (result.status === 'unauthorized') {
                window.location.href = '/unauthorized';
            }
            setTransactions(result.data?.demandes || []);
        } catch (err) {
            console.error('Erreur: ', err);
            setError(err.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    const handleTransactionAction = async (demandeId, valider) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/fond/transaction', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ demandeId, valider })
            });
            if (!response.ok) {
                throw new Error('Erreur lors du traitement de la transaction');
            }
            fetchTransactions();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
                </div>
            )}
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-center mb-8">
                    <ArrowRightLeft className="h-8 w-8 text-yellow-500 mr-3" />
                    <h1 className="text-3xl font-bold text-white">Transactions à valider</h1>
                </div>

                {error && (
                    <div className="text-red-500 text-center mb-6">
                        Erreur : {error}
                    </div>
                )}

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
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-white">
                                        Aucune transaction à valider.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((transaction) => (
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
                                            {/* {new Date(transaction.date).toLocaleDateString()} */}
                                            {formatDate(transaction.date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-white">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    className="text-green-500"
                                                    onClick={() => handleTransactionAction(transaction.id, true)}
                                                >
                                                    Valider
                                                </button>
                                                <button
                                                    className="text-red-500"
                                                    onClick={() => handleTransactionAction(transaction.id, false)}
                                                >
                                                    Refuser
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
