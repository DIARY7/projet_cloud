import React from 'react';
import { XCircle } from 'lucide-react';

export default function Page404() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-center p-6">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-white">404</h1>
                <p className="text-lg text-gray-400">Page non trouvée</p>
                <p className="text-sm text-gray-500 mt-4">Désolé, la page que vous cherchez n'existe pas.</p>
            </div>
        </div>
    );
}
