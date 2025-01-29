import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function CryptoWallet() {
  const [amountToBuy, setAmountToBuy] = useState('');
  const [amountToSell, setAmountToSell] = useState('');

  const cryptos = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', amount: '0.5', value: '20000' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', amount: '10', value: '15000' },
  ];

  const handleBuySubmit = (cryptoId) => {
    console.log(`Acheter ${amountToBuy} de ${cryptoId}`);
  };

  const handleSellSubmit = (cryptoId) => {
    console.log(`Vendre ${amountToSell} de ${cryptoId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-yellow-500 mr-3" />
            <h1 className="text-3xl font-bold text-white">Portefeuille Crypto</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-400 mb-2">Balance Totale</h2>
            <p className="text-3xl font-bold text-white">35,000 MGA</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-white mb-4">Vos Cryptomonnaies</h2>
          <div className="space-y-4">
            {cryptos.map((crypto) => (
              <div key={crypto.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">{crypto.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-white">{crypto.amount} {crypto.symbol} = {crypto.value} MGA</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="w-full sm:w-[48%]">
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

                  <div className="w-full sm:w-[48%]">
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
