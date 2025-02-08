import React, { useState, useEffect } from 'react';
import { PlusCircle, MinusCircle, CreditCard } from 'lucide-react';
import Navbar from '../../components/NavBar';
import { getToken } from '../../utils/auth';
import { useAuth } from '../../context/AuthContext';

const fetchBalance = async () => {
  try {
    const token = getToken();

    const response = await fetch('http://localhost:8080/fond', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }

    const result = await response.json();
    return result?.data?.data || 0;
  } catch (error) {
    console.error("Erreur: ", error);
    throw error;
  }
};

export default function FundsWallet() {
  const [amountToDeposit, setAmountToDeposit] = useState('');
  const [amountToWithdraw, setAmountToWithdraw] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
    const getBalance = async () => {
      try {
        setLoading(true);
        const fetchedBalance = await fetchBalance();
        setBalance(fetchedBalance);
      } catch (err) {
        setError("Impossible de charger le solde");
      } finally {
        setLoading(false);
      }
    };
    getBalance();
  }, []);

  const handleDeposit = async () => {
    if (!amountToDeposit || parseFloat(amountToDeposit) <= 0) return alert('Veuillez entrer un montant valide.');

    try {
      setLoading(true);
      const token = getToken();
      const response = await fetch('http://localhost:8080/fond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ entree: parseFloat(amountToDeposit), sortie: 0.0 }),
        
      });

      if (!response.ok) throw new Error("Erreur lors du dépôt");
      const data = await response.json();
      console.log(data);
      if(data.status === 'success'){
        setSuccessMessage("Dépôt effectué avec succès !");
      }
      if(data.status === 'error'){
        setError(data.error.message)
      } 
      
    } catch (err) {
      setError("Erreur lors du dépôt");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amountToWithdraw || parseFloat(amountToWithdraw) <= 0) return alert('Veuillez entrer un montant valide.');

    try {
      setLoading(true);
      const token = getToken();
      const response = await fetch('http://localhost:8080/fond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ entree : 0.0, sortie: parseFloat(amountToWithdraw) }),
      });

      if (!response.ok) throw new Error("Erreur lors du retrait");
      const data = await response.json();
      console.log(data); // Récupération des données
      if(data.status === 'success'){
        setSuccessMessage("Dépôt effectué avec succès !");
      }
      if(data.status === 'error'){
        setError(data.error.message)
      } 
    } catch (err) {
      setError("Erreur lors du retrait");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center mb-8">
          <CreditCard className="h-8 w-8 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Portefeuille de Fonds</h1>
        </div>

        {successMessage && (
          <p className="text-green-500 text-lg font-semibold mb-4">{successMessage}</p>
        )}
        {error && (
          <p className="text-red-500 text-lg font-semibold mb-4">{error}</p>
        )}

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-400 mb-2">Solde Disponible</h2>
            {loading ? (
              <p className="text-3xl font-bold text-white">Chargement...</p>
            ) : (
              <p className="text-3xl font-bold text-white">{balance} MGA</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Déposer des Fonds</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Montant (MGA)
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="0.00"
                  value={amountToDeposit}
                  onChange={(e) => setAmountToDeposit(e.target.value)}
                />
              </div>
              <button
                onClick={handleDeposit}
                className="flex items-center justify-center w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Déposer
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Retirer des Fonds</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Montant (MGA)
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="0.00"
                  value={amountToWithdraw}
                  onChange={(e) => setAmountToWithdraw(e.target.value)}
                />
              </div>
              <button
                onClick={handleWithdraw}
                className="flex items-center justify-center w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
              >
                <MinusCircle className="h-5 w-5 mr-2" />
                Retirer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
