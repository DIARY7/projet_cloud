import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Navbar from '../../components/NavBar';

export default function TransactionsList() {
  const [maxDate, setMaxDate] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('');

  const transactions = [
    {
      id: 1,
      user: {id:1, fullname: 'user', email: 'user@example.com'},
      crypto: { id: 1, label: 'BTC' },
      entree: 0.5,
      sortie: 0,
      valeur: 20000,
      date: '2024-03-15'
    },
    {
      id: 2,
      user: {id:2, fullname: 'trader', email: 'trader@example.com'},
      crypto: { id: 2, label: 'ETH' },
      entree: 0,
      sortie: 10,
      valeur: 15000,
      date: '2024-03-14'
    },
  ];

  const cryptos = [
    { id: 1, label: 'BTC' },
    { id: 2, label: 'ETH' },
  ];

  const users = [
    { id: 1, fullname: 'Rakoto Bema', email: 'bema@example.com' },
    { id: 2, fullname: 'Rasoa Lala', email: 'lala@example.com' },
    { id: 3, fullname: 'Rabema Koto', email: 'koto@example.com' },
  ];

  const handleDateChange = (e) => {
    setMaxDate(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleCryptoChange = (e) => {
    setSelectedCrypto(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar/>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center mb-8">
          <ArrowRightLeft className="h-8 w-8 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Historique des Transactions</h1>
        </div>

        <div className="mb-4 ms-1">
          <label className="text-white mr-2">Filtrer par utilisateur:</label>
          <select
            value={selectedUser}
            onChange={handleUserChange}
            className="px-4 py-2 rounded-lg text-black mr-4"
          >
            <option value="">Tous les utilisateurs</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullname}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-4 ms-1'>
          <label className="text-white mr-2">Filtrer par crypto:</label>
          <select
            value={selectedCrypto}
            onChange={handleCryptoChange}
            className="px-4 py-2 rounded-lg text-black"
          >
            <option value="">Toutes les cryptos</option>
            {cryptos.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.label}
              </option>
            ))}
          </select>
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
                  <td className="px-6 py-4 whitespace-nowrap text-yellow-500">
                    <Link to ="/transactions">
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
                    {transaction.crypto.label}
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
