import React, {useState} from 'react';
import { DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function TransactionsList() {
  const [maxDate, setMaxDate] = useState('');

  const userTotals = [
    {
      user: 'user@example.com',
      totalAchat: 10000,
      totalVente: 20000
    },
    {
      user: 'trader@example.com',
      totalAchat: 5000,
      totalVente: 15000
    },
    {
      user: 'user2@example.com',
      totalAchat: 0,
      totalVente: 0
    }
  ];

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

  const handleDateChange = (e) => {
    setMaxDate(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <DollarSign className="h-8 w-8 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Les Transactions de Cryptomonnaies</h1>
        </div>

        <div className="mb-4 ms-1">
          <label className="text-white mr-2">Filtrer par date maximale:</label>
          <input
            type="datetime-local"
            value={maxDate}
            onChange={handleDateChange}
            className="px-4 py-2 rounded-lg text-black"
          />
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
              {userTotals.map((user) => (
                <tr key={user.user}>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.totalAchat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.totalVente}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.totalAchat - user.totalVente}</td>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Valeur (MGA)</th>
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
                    {transaction.valeur}
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
