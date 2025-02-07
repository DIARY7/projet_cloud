import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'lucide-react';
import Navbar from '../../components/NavBar';

export default function TransactionsResume() {
    const [maxDate, setMaxDate] = useState('');

    const userTotals = [
        {
            user: { id: 1, fullname: 'Rakoto Bema', email: 'bema@example.com' },
            achatPrix: 10000,
            ventePrix: 20000
        },
        {
            user: { id: 2, fullname: 'Rasoa Lala', email: 'lala@example.com' },
            achatPrix: 5000,
            ventePrix: 15000
        },
        {
            user: { id: 3, fullname: 'Rabema Koto', email: 'koto@example.com' },
            achatPrix: 0,
            ventePrix: 0
        }
    ];


    const fetchData = async (e) => {
        e.preventDefault();
        setLoading(true); // Activer le chargement
    
    
        try {
          const response = await fetch('http://localhost:8080/TransCrypto/ListResume', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: null,
          });
    
          const result = await response.json();
    
          if (result.status === 'success') {
            console.log(result.datas);
            userTotals = result.datas.listEtat;
          } else {
            console.error('Erreur:', result.error);
          }
        } catch (error) {
          console.error('Erreur de requête :', error);
        } finally {
          setLoading(false); // Désactiver le chargement
        }
      };

      useEffect(() => {
        fetchData();
    }, []);


    const handleDateChange = (e) => {
        setMaxDate(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar/>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-center mb-8">
                    <Table className="h-8 w-8 text-yellow-500 mr-3" />
                    <h1 className="text-3xl font-bold text-white">Récapitulatif des Transactions</h1>
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
                                <tr key={user.user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-yellow-500">
                                        <Link to="/transactions">
                                            <div className="flex items-center">
                                                <img
                                                    src={`https://robohash.org/${user.user.id}?set=set1`}
                                                    alt={user.user.id}
                                                    className="h-8 w-8 rounded-full mr-2"
                                                />
                                                <span>{user.user.email}</span>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-white">{user.achatPrix}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-white">{user.ventePrix}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-white">{user.achatPrix - user.ventePrix}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
