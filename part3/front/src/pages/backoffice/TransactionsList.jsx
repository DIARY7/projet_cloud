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
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-white mb-4">Vos Cryptomonnaies</h2>
          <div className="space-y-4">
            {cryptos.map((crypto) => (
              <div key={crypto.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">{crypto.name}</h3>
                    <p className="text-sm text-gray-400">{crypto.amount} {crypto.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-white">{crypto.value} MGA</p>
                    <p className={`text-sm ${parseFloat(crypto.change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {crypto.change}%
                    </p>
                  </div>
                </div>

                {/* Formulaires d'achat et de vente en flex wrap */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {/* Formulaire d'achat */}
                  <div className="w-full sm:w-1/2">
                    <h3 className="text-sm text-gray-400 mb-2">Acheter {crypto.name}</h3>
                    <input
                      type="number"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Montant"
                      value={amountToBuy}
                      onChange={(e) => setAmountToBuy(e.target.value)}
                    />
                    <button
                      onClick={() => handleBuySubmit(crypto.name)}
                      className="w-full mt-2 flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400"
                    >
                      <ArrowDownLeft className="h-4 w-4 mr-2" />
                      Acheter
                    </button>
                  </div>

                  {/* Formulaire de vente */}
                  <div className="w-full sm:w-1/2">
                    <h3 className="text-sm text-gray-400 mb-2">Vendre {crypto.name}</h3>
                    <input
                      type="number"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Montant"
                      value={amountToSell}
                      onChange={(e) => setAmountToSell(e.target.value)}
                    />
                    <button
                      onClick={() => handleSellSubmit(crypto.name)}
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
        </div>
      </div>
    </div>
  );
}
