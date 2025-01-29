import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function TransactionsList() {
  const transactions = [
    {
      id: 1,
      user: 'user@example.com',
      crypto: 'BTC',
      entree: 0.5,
      sortie: 0,
      valeur: 20000,
      date: '2024-03-15'
    },
    {
      id: 2,
      user: 'trader@example.com',
      crypto: 'ETH',
      entree: 0,
      sortie: 10,
      valeur: 15000,
      date: '2024-03-14'
    },
  ];

  const userTotals = transactions.reduce((acc, transaction) => {
    const { user, entree, sortie, valeur } = transaction;

    if (!acc[user]) {
      acc[user] = { totalAchat: 0, totalVente: 0 , totalValue: 0};
    }

    if (entree > 0) {
      acc[user].totalAchat += entree * valeur;
    }

    if (sortie > 0) {
      acc[user].totalVente += sortie * valeur;
    }

    acc[user].totalValue += entree * valeur - sortie * valeur;

    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <DollarSign className="h-8 w-8 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Les Transactions de Cryptomonnaies</h1>
        </div>

        <div className="bg-gray-800 rounded-lg shadow mb-8 overflow-x-auto">
          <table className="min-w-full table-auto divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Utilisateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Achat (MGA)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Vente (MGA)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Valeur (MGA)</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {Object.keys(userTotals).map((user) => (
                <tr key={user}>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{userTotals[user].totalAchat} MGA</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{userTotals[user].totalVente} MGA</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{userTotals[user].totalValue} MGA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-800 rounded-lg shadow overflow-x-auto">
          <table className="min-w-full table-auto divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Utilisateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Entree</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sortie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cryptomonnaie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Valeur (en MGA)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
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
                    {transaction.crypto}
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
