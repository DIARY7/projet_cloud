import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, CreditCard, BarChart } from 'lucide-react';
import Navbar from '../../components/NavBar';
import { isAuthenticated } from '../../utils/auth';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar/>
      <main className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Bienvenue dans l'Univers des Cryptomonnaies
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Plateforme légère pour gérer, acheter et vendre vos cryptomonnaies.
          </p>
          {!isAuthenticated() && (
            <Link
              to="/register"
              className="inline-flex items-center bg-yellow-500 px-6 py-3 rounded-lg text-gray-900 hover:bg-yellow-400"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
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

        <section className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Suivi des Cryptomonnaies</h2>
          <div className="flex justify-center space-x-8">
            <Link to="/cryptos/evolution" className="inline-flex items-center bg-yellow-500 px-6 py-3 rounded-lg text-gray-900 hover:bg-yellow-400">
              Voir l'évolution des cryptos
            </Link>
            <Link to="/cryptos/prices" className="inline-flex items-center bg-yellow-500 px-6 py-3 rounded-lg text-gray-900 hover:bg-yellow-400">
              Voir le cours actuel
            </Link>
            <Link to="/cryptos/analysis" className="inline-flex items-center bg-yellow-500 px-6 py-3 rounded-lg text-gray-900 hover:bg-yellow-400">
              Accéder à l'analyse
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
