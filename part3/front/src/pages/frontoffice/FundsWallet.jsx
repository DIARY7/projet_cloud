import React from 'react';
import { Wallet, PlusCircle, MinusCircle, CreditCard } from 'lucide-react';

export default function FundsWallet() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <CreditCard className="h-8 w-8 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Portefeuille de Fonds</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-400 mb-2">Solde Disponible</h2>
            <p className="text-3xl font-bold text-white">5,000 MGA</p>
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
                />
              </div>
              <button className="flex items-center justify-center w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400">
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
                />
              </div>
              <button className="flex items-center justify-center w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400">
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