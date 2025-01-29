import React from 'react';

const ErrorMessage = ({ message, stackTrace }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
            <div className="max-w-3xl mx-auto bg-red-800 text-white rounded-lg shadow-lg p-6 w-full sm:w-11/12 md:w-9/12 lg:w-7/12">
                <h2 className="text-2xl font-bold mb-4">Erreur</h2>
                <p className="text-lg mb-4">{message}</p>
                <div className="bg-red-900 p-4 rounded-lg overflow-auto">
                    <h3 className="text-xl font-semibold mb-2">Détails de l'erreur :</h3>
                    <pre className="text-sm whitespace-pre-wrap break-words">{stackTrace}</pre>
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;
