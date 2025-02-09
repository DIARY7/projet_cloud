import React from 'react';
import { Lock } from 'lucide-react';
import Navbar from '../../../components/NavBar';

export default function Unauthorized() {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <Navbar />
            <div className="flex flex-1 items-center justify-center text-center p-6">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                    <Lock className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-white">403</h1>
                    <p className="text-lg text-gray-400">Accès refusé</p>
                    <p className="text-sm text-gray-500 mt-4">Vous n'avez pas l'autorisation d'accéder à cette page.</p>
                </div>
            </div>
        </div>
    );
}
