import React, { useState , useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bitcoin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { token, isAdmin, logout } = useAuth();

    const isAuth = token != null;

    const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
    const [isCommissionsOpen, setIsCommissionsOpen] = useState(false);
    const [isCryptosOpen, setIsCryptosOpen] = useState(false);
    const [isWalletOpen, setIsWalletOpen] = useState(false);

    return (
        <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Bitcoin className="h-8 w-8 text-yellow-500" />
                    <span className="ml-2 text-xl font-bold text-white">CryptoTrade</span>
                </div>
                <div className="flex items-center space-x-4">
                    {!isAuth ? (
                        // Si non authentifié
                        <>
                            <Link to="/login" className="text-white hover:text-yellow-500">Connexion</Link>
                            <Link to="/register" className="bg-yellow-500 px-4 py-2 rounded-lg text-gray-900 hover:bg-yellow-400">
                                Inscription
                            </Link>
                        </>
                    ) : isAdmin ? (
                        // Si authentifié et admin
                        <>
                            <div className="relative">
                                <button
                                    onClick={() => setIsTransactionsOpen(!isTransactionsOpen)}
                                    className="text-white hover:text-yellow-500"
                                >
                                    Transactions
                                </button>
                                {isTransactionsOpen && (
                                    <div className="absolute bg-white text-black p-2 rounded-lg shadow-lg">
                                        <Link to="/transactions/resume" className="block">Résumé</Link>
                                        <Link to="/transactions" className="block">Liste</Link>
                                        <Link to="/transactions/validation" className="block">Validation</Link>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setIsCommissionsOpen(!isCommissionsOpen)}
                                    className="text-white hover:text-yellow-500"
                                >
                                    Commissions
                                </button>
                                {isCommissionsOpen && (
                                    <div className="absolute bg-white text-black p-2 rounded-lg shadow-lg">
                                        <Link to="/commissions/analysis" className="block">Analyse</Link>
                                        <Link to="/commissions/edit" className="block">Configuration</Link>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setIsCryptosOpen(!isCryptosOpen)}
                                    className="text-white hover:text-yellow-500"
                                >
                                    Cryptos
                                </button>
                                {isCryptosOpen && (
                                    <div className="absolute bg-white text-black p-2 rounded-lg shadow-lg">
                                        <Link to="/cryptos/analysis" className="block">Analyse</Link>
                                        <Link to="/cryptos/prices" className="block">Cours</Link>
                                        <Link to="/cryptos/evolution" className="block">Évolution</Link>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={logout} // Appeler la fonction de déconnexion
                                className="text-white hover:text-yellow-500"
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        // Si authentifié mais non admin
                        <>
                            <div className="relative">
                                <button
                                    onClick={() => setIsWalletOpen(!isWalletOpen)}
                                    className="text-white hover:text-yellow-500"
                                >
                                    Wallet
                                </button>
                                {isWalletOpen && (
                                    <div className="absolute bg-white text-black p-2 rounded-lg shadow-lg">
                                        <Link to="/wallet/funds" className="block">Fonds</Link>
                                        <Link to="/wallet/cryptos" className="block">Cryptos</Link>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setIsCryptosOpen(!isCryptosOpen)}
                                    className="text-white hover:text-yellow-500"
                                >
                                    Cryptos
                                </button>
                                {isCryptosOpen && (
                                    <div className="absolute bg-white text-black p-2 rounded-lg shadow-lg">
                                        <Link to="/cryptos/analysis" className="block">Analyse</Link>
                                        <Link to="/cryptos/prices" className="block">Prix</Link>
                                        <Link to="/cryptos/evolution" className="block">Évolution</Link>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={logout} // Appeler la fonction de déconnexion
                                className="text-white hover:text-yellow-500"
                            >
                                Déconnexion
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
