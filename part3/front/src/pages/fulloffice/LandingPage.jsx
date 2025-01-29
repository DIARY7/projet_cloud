import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, ArrowRight, TrendingUp, CreditCard, BarChart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Coins className="h-8 w-8 text-yellow-500" />
            <span className="ml-2 text-xl font-bold text-white">CryptoTrade</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-white hover:text-yellow-500">Connexion</Link>
            <Link to="/register" className="bg-yellow-500 px-4 py-2 rounded-lg text-gray-900 hover:bg-yellow-400">
              Inscription
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Bienvenue dans l'Univers des Cryptomonnaies
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Plateforme légère pour gérer, acheter et vendre vos cryptomonnaies.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-yellow-500 px-6 py-3 rounded-lg text-gray-900 hover:bg-yellow-400"
          >
            Commencer maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-800 p-6 rounded-lg">
            <TrendingUp className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Trading Simple</h3>
            <p className="text-gray-400">Interface intuitive pour trader facilement vos cryptomonnaies.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <CreditCard className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Dépôts & Retraits Simples</h3>
            <p className="text-gray-400">Effectuez facilement des dépôts et retraits de fonds en toute sécurité.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <BarChart className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Analyse en Temps Réel</h3>
            <p className="text-gray-400">Optimisez vos profits avec nos outils d'analyse et de trading.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
