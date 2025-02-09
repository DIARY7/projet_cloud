    import React, { useState,useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { Table } from 'lucide-react';
    import Navbar from '../../components/NavBar';
    import { getToken } from '../../utils/auth';

    export default function TransactionsResume() {
        const [userTotals, setuserTotals] = useState([]);
        const [loading, setLoading] = useState(false);

        const fetchData = async (date = '') => {
            const token = getToken();
            setLoading(true);
        
            try {
            const response = await fetch('http://localhost:8080/TransCrypto/ListResume?dateFin='+date, {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
                body: null,
            });
        
            const result = await response.json();
        
            console.log(result);
            if (result.status === 'success') {
                console.log(result.data.listEtat);
                setuserTotals(result.data.listEtat);
            } else if (result.status === 'unauthorized') {
                window.location.href = '/unauthorized';
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
        }, []);


        const handleDateChange = (e) => {
            fetchData(e.target.value);
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
                        <Table className="h-8 w-8 text-yellow-500 mr-3" />
                        <h1 className="text-3xl font-bold text-white">Récapitulatif des Transactions</h1>
                    </div>


                    <div className="mb-4 ms-1">
                        <label className="text-white mr-2">Filtrer par date maximale:</label>
                        <input
                            type="date"
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
                                    <tr key={user.userId}>
                                        <td className="px-6 py-4 whitespace-nowrap text-yellow-500">
                                            <Link to="/transactions">
                                                <div className="flex items-center">
                                                    <img
                                                        src={`https://robohash.org/${user.userId}?set=set1`}
                                                        alt={user.userId}
                                                        className="h-8 w-8 rounded-full mr-2"
                                                    />
                                                    <span>{user.user}</span>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-white">{user.achatPrix}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-white">{user.ventePrix}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-white">{user.fond}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
