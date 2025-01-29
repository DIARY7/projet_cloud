import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw } from 'lucide-react';

export default function CryptoWallet() {
  const cryptos = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', amount: '0.5', value: '20000', change: '+5.2' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', amount: '10', value: '15000', change: '-2.1' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-yellow-500 mr-3" />
            <h1 className="text-3xl font-bold text-white">Portefeuille Crypto</h1>
          </div>
          <button className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-400 mb-2">Balance Totale</h2>
            <p className="text-3xl font-bold text-white">35,000 EUR</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-400 mb-2">24h Change</h2>
            <p className="text-3xl font-bold text-green-500">+2.5%</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow">
          <div className="p-6">
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
                      <p className="text-lg font-medium text-white">{crypto.value} EUR</p>
                      <p className={`text-sm ${parseFloat(crypto.change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {crypto.change}%
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex items-center justify-center w-1/2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400">
                      <ArrowDownLeft className="h-4 w-4 mr-2" />
                      Acheter
                    </button>
                    <button className="flex items-center justify-center w-1/2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400">
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Vendre
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}