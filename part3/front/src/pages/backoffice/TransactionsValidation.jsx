import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, PlusCircle, MinusCircle } from 'lucide-react';

export default function TransactionsValidation() {

    const transactions = [
        {
            id: 1,
            user: { id: 1, fullname: 'user', email: 'user@example.com' },
            entree: 20000,
            sortie: 0,
            date: '2024-03-15'
        },
        {
            id: 2,
            user: { id: 2, fullname: 'trader', email: 'trader@example.com' },
            entree: 0,
            sortie: 50000,
            date: '2024-03-14'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8">
                    <ArrowRightLeft className="h-8 w-8 text-yellow-500 mr-3" />
                    <h1 className="text-3xl font-bold text-white">Transactions à valider</h1>
                </div>

                <div className="bg-gray-800 rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full table-auto divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Utilisateur</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Entree</th>
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
                                                {transaction.entree > 0 ? 'Dépot' : 'Retrait'}
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
                                        {transaction.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-white">
                                        <div className="flex items-center gap-4">
                                            <Link className='text-green-500'>Valider</Link>
                                            <Link className='text-red-500' >Refuser</Link>
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
