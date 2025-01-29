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

        
      </div>
    </div>
  );
}
