import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Navbar from '../../components/NavBar';
import { Search } from 'lucide-react';

export default function TransactionsList() {
  const [maxDate, setMaxDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [transactions, setTrans] = useState([]);
  const [cryptos, setcryptos] = useState([]);
  const [users, setusers] = useState([]);
  
  const [loading, setLoading] = useState(false);
      
  const fetchData = async () => {
              setLoading(true);
          
              try {
              const response = await fetch('http://localhost:8080/TransCrypto/List?dateDebut='+minDate+'&dateFin='+maxDate+'&userId='+selectedUser+'&cryptoId='+selectedCrypto, {
                  method: 'GET',
                  headers: {
                  'Content-Type': 'application/json',
                  },
                  body: null,
              });
          
              const result = await response.json();
          
              if (result.status === 'success') {
                  setTrans(result.data.listTransactionCrypto);
                  setcryptos(result.data.listCrypto);
                  setusers(result.data.listUser);
              } else {
                  console.error('Erreur:', result.error);
              }
              } catch (error) {
                console.error('Erreur de requête :', error);
              } finally {
              setLoading(false);
              }
          };
  
  useEffect(() => {
    fetchData();
  }, [selectedUser, minDate, maxDate, selectedCrypto]);

  const handleDateMaxChange = (e) => {
    setMaxDate(e.target.value);
  };
  
  const handleDateMinChange = (e) => {
    setMinDate(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleCryptoChange = (e) => {
    setSelectedCrypto(e.target.value);
  };
  
  const handleSubmit = (e) => {
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-900">
         {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
        </div>
      )}
      <Navbar/>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center mb-8">
          <ArrowRightLeft className="h-8 w-8 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Historique des Transactions</h1>
        </div>
        <form className="mt-8 space-y-6">
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
                {user.fullName}
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
            type="date"
            onChange={handleDateMaxChange}
            className="px-4 py-2 rounded-lg text-black"
          />
        </div>
      
        <div className="mb-4 ms-1">
          <label className="text-white mr-2">Filtrer par date minimale:</label>
          <input
            type="date"
            onChange={handleDateMinChange}
            className="px-4 py-2 rounded-lg text-black"
          />
        </div>

        <div>
                    <button
                    onClick={handleSubmit}
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      disabled={loading}
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <Search className="h-5 w-5 text-gray-900" />
                      </span>
                      {loading ? 'Filtrage...' : 'Filtrer'}
                    </button>
                  </div>
            </form>
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
                      {transaction.commission.id == 2 ? (
                        <ArrowDownLeft className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span className="text-white">
                        {transaction.commission.id == 2 ? 'Achat' : 'Vente'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-yellow-500">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => {
                        setSelectedUser(transaction.users.id);  // Définit l'ID de l'utilisateur sélectionné
                        fetchData();  // Rafraîchit les données avec le nouvel ID d'utilisateur
                      }}
                    >
                      <img
                        src={`https://robohash.org/${transaction.users.id}?set=set1`}
                        alt={transaction.users.id}
                        className="h-8 w-8 rounded-full mr-2"
                      />
                      <span>{transaction.users.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                  {transaction.commission.id == 2 ? transaction.qte : 0.0 }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {transaction.commission.id == 2 ? 0.0 : transaction.qte}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {transaction.crypto.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {transaction.prix}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {transaction.dtTransaction}
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
