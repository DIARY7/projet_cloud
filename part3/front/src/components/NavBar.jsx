import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Dropdown from './DropDown';

const Navbar = () => {
    const { token, isAdmin, logout } = useAuth();
    const isAuth = token != null;

    const [dropdowns, setDropdowns] = useState({
        transactions: false,
        commissions: false,
        cryptos: false,
        wallet: false,
    });

    const toggleDropdown = (dropdown, state) => {
        setDropdowns((prevState) => ({
            ...prevState,
            [dropdown]: state,
        }));
    };

    return (
        <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <Link to="/">
                    <div className="flex items-center">
                        <Bitcoin className="h-8 w-8 text-yellow-500" />
                        <span className="ml-2 text-xl font-bold text-white">CryptoTrade</span>
                    </div>
                </Link>
                <div className="flex items-center space-x-4">
                    {!isAuth ? (
                        <>
                            <Link to="/login" className="text-white hover:text-yellow-500">
                                Connexion
                            </Link>
                            <Link
                                to="/register"
                                className="bg-yellow-500 px-4 py-2 rounded-lg text-gray-900 hover:bg-yellow-400"
                            >
                                Inscription
                            </Link>
                        </>
                    ) : isAdmin ? (
                        <>
                            <Dropdown
                                label="Transactions"
                                isOpen={dropdowns.transactions}
                                toggleDropdown={(state) => toggleDropdown('transactions', state)}
                                items={[
                                    { label: 'Résumé', link: '/transactions/resume' },
                                    { label: 'Liste', link: '/transactions' },
                                    { label: 'Validation', link: '/transactions/validation' },
                                ]}
                            />
                            <Dropdown
                                label="Commissions"
                                isOpen={dropdowns.commissions}
                                toggleDropdown={(state) => toggleDropdown('commissions', state)}
                                items={[
                                    { label: 'Analyse', link: '/commissions/analysis' },
                                    { label: 'Configuration', link: '/commissions/edit' },
                                ]}
                            />
                            <Dropdown
                                label="Cryptos"
                                isOpen={dropdowns.cryptos}
                                toggleDropdown={(state) => toggleDropdown('cryptos', state)}
                                items={[
                                    { label: 'Analyse', link: '/cryptos/analysis' },
                                    { label: 'Cours', link: '/cryptos/prices' },
                                    { label: 'Évolution', link: '/cryptos/evolution' },
                                ]}
                            />
                            <button
                                onClick={logout}
                                className="text-white hover:text-yellow-500"
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <Dropdown
                                label="Wallet"
                                isOpen={dropdowns.wallet}
                                toggleDropdown={(state) => toggleDropdown('wallet', state)}
                                items={[
                                    { label: 'Fonds', link: '/wallet/funds' },
                                    { label: 'Cryptos', link: '/wallet/cryptos' },
                                ]}
                            />
                            <Dropdown
                                label="Cryptos"
                                isOpen={dropdowns.cryptos}
                                toggleDropdown={(state) => toggleDropdown('cryptos', state)}
                                items={[
                                    { label: 'Analyse', link: '/cryptos/analysis' },
                                    { label: 'Prix', link: '/cryptos/prices' },
                                    { label: 'Évolution', link: '/cryptos/evolution' },
                                ]}
                            />
                            <button
                                onClick={logout}
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
};

export default Navbar;