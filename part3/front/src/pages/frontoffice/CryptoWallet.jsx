import React, { useState, useEffect } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Navbar from '../../components/NavBar';
import { getToken } from '../../utils/auth';
import { useAuth } from '../../context/AuthContext';

export default function CryptoWallet() {
  const [amounts, setAmounts] = useState({});
  const [cryptoDatas, setCryptoDatas] = useState([]);
  const [totalBalance, setTotalBalance] = useState('0');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const {checkAuth} = useAuth();

  const fetchCryptoData = () => {
    const token = getToken();

    if (!token) {
      checkAuth();
    }

    fetch('http://localhost:8080/TransCrypto/porteFeuille', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then((data) => {
        setCryptoDatas(data.data.data);
        const total = data.data.data.reduce((acc, cryptoData) => {
          return acc + cryptoData.valeur;
        }, 0);
        setTotalBalance(total.toFixed(2));
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
        setErrorMessage("Erreur lors de la récupération des données. Veuillez réessayer.");
      });
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const handleBuySubmit = (cryptoId) => {
    const amountToBuy = amounts[cryptoId]?.buy || '';
    if (!amountToBuy || isNaN(amountToBuy) || amountToBuy <= 0) {
      setErrorMessage("Veuillez entrer un montant valide à acheter.");
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    const token = getToken();

    const url = new URL('http://localhost:8080/TransCrypto/insert');
    const params = new URLSearchParams({
      qte: amountToBuy.toString(),
      typeCommissionId: '2', // 2 = buy transaction
      cryptoId: cryptoId.toString()
    });

    fetch(`${url}?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 'success') {
          console.log('Transaction réussie:', data.message);
          fetchCryptoData();
          setSuccessMessage('Transaction réussie');
        } else {
          console.error('Erreur transaction:', data.message);
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la transaction:', error);
        setErrorMessage("Erreur lors de la transaction.");
      });
  };

  const handleSellSubmit = (cryptoId) => {
    const amountToSell = amounts[cryptoId]?.sell || '';
    if (!amountToSell || isNaN(amountToSell) || amountToSell <= 0) {
      setErrorMessage("Veuillez entrer un montant valide à vendre.");
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    const token = getToken();

    const url = new URL('http://localhost:8080/TransCrypto/insert');
    const params = new URLSearchParams({
      qte: amountToSell.toString(),
      typeCommissionId: '1', // 1 = sell transaction
      cryptoId: cryptoId.toString()
    });

    fetch(`${url}?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 'success') {
          setErrorMessage("");
          fetchCryptoData();
          setSuccessMessage('Transaction réussie');
        } else {
          console.error('Erreur transaction:', data.message);
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la transaction:', error);
        setErrorMessage("Erreur lors de la transaction.");
      });
  };

  const handleAmountChange = (cryptoId, type, value) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [cryptoId]: {
        ...prevAmounts[cryptoId],
        [type]: value
      }
    }));
  };

  // Handle the Enter key press for submit
  const handleKeyDown = (e, cryptoId, type) => {
    if (e.key === 'Enter') {
      if (type === 'buy') {
        handleBuySubmit(cryptoId);
      } else if (type === 'sell') {
        handleSellSubmit(cryptoId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-yellow-500 mr-3" />
            <h1 className="text-3xl font-bold text-white">Portefeuille Crypto</h1>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-600 text-white p-4 mb-6 rounded-lg">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-600 text-white p-4 mb-6 rounded-lg">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-400 mb-2">Balance Totale</h2>
            <p className="text-3xl font-bold text-white">{totalBalance} MGA</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-white mb-4">Vos Cryptomonnaies</h2>

          {cryptoDatas.length === 0 ? (
            <p className="text-white text-center">Vous n'avez pas encore de cryptomonnaie.</p>
          ) : (
            <div className="space-y-4">
              {cryptoDatas.map((cryptoData) => (
                <div key={cryptoData.idCrypto} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-white">{cryptoData.nomCrypto}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-white">{cryptoData.qte} {cryptoData.nomCrypto} = {cryptoData.valeur} MGA</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="w-full sm:w-[48%]">
                      <h3 className="text-sm text-gray-400 mb-2">Acheter {cryptoData.nomCrypto}</h3>
                      <input
                        type="number"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Montant"
                        value={amounts[cryptoData.idCrypto]?.buy || ''}
                        onChange={(e) => handleAmountChange(cryptoData.idCrypto, 'buy', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, cryptoData.idCrypto, 'buy')}
                      />
                      <button
                        onClick={() => handleBuySubmit(cryptoData.idCrypto)}
                        className="w-full mt-2 flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400"
                      >
                        <ArrowDownLeft className="h-4 w-4 mr-2" />
                        Acheter
                      </button>
                    </div>

                    <div className="w-full sm:w-[48%]">
                      <h3 className="text-sm text-gray-400 mb-2">Vendre {cryptoData.nomCrypto}</h3>
                      <input
                        type="number"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Montant"
                        value={amounts[cryptoData.idCrypto]?.sell || ''}
                        onChange={(e) => handleAmountChange(cryptoData.idCrypto, 'sell', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, cryptoData.idCrypto, 'sell')}
                      />
                      <button
                        onClick={() => handleSellSubmit(cryptoData.idCrypto)}
                        className="w-full mt-2 flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
                      >
                        <ArrowUpRight className="h-4 w-4 mr-2" />
                        Vendre
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
