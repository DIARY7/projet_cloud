import React from 'react';
import { Table, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function TransactionsList() {
  const transactions = [
    {
      id: 1,
      user: 'user@example.com',
      entree: 0.5,
      sortie: 0,
      valeur: 20000,
      date: '2024-03-15'
    },
    {
      id: 2,
      user: 'trader@example.com',
      entree: 0,
      sortie: 10,
      valeur: 15000,
      date: '2024-03-14'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Liste des Transactions</h1>
          <div className="flex space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400">
              Exporter
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Entree
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Sortie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Valeur (en MGA)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {transaction.entree > 0 ? (
                        <ArrowDownLeft className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span className="text-white">
                        {transaction.entree > 0 ? 'Achat' : 'Vente'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {transaction.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {transaction.entree}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {transaction.sortie}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {transaction.valeur} MGA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {transaction.date}
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
