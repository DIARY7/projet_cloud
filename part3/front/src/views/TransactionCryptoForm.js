// src/views/TransactionCryptoForm.js
import React, { useState } from 'react';

function TransactionCryptoForm() {
    // États pour les champs du formulaire
    const [transactionType, setTransactionType] = useState('Achat'); // "achat" ou "vente"
    const [quantity, setQuantity] = useState('');
    const [crypto, setCrypto] = useState('');
    const [currency, setCurrency] = useState('');

    // Listes des cryptomonnaies et des devises pour les selects
    const cryptos = ['Bitcoin', 'Ethereum', 'Ripple', 'Litecoin', 'Cardano'];
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CHF'];

    // Gérer le changement dans les inputs
    const handleQuantityChange = (e) => setQuantity(e.target.value);
    const handleCryptoChange = (e) => setCrypto(e.target.value);
    const handleCurrencyChange = (e) => setCurrency(e.target.value);
    const handleTransactionTypeChange = (e) => setTransactionType(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Vous pouvez ajouter des logiques ici pour envoyer ces données au backend ou les traiter
        alert(`Vous souhaitez ${transactionType === 'achat' ? 'acheter' : 'vendre'} ${quantity} ${crypto} pour ${currency}`);
    };

    return (
        <div className="container mt-5">
            <h2>{transactionType} de Cryptomonnaies</h2>
            <form onSubmit={handleSubmit}>
                {/* Sélecteur de type de transaction (Achat/Vente) */}
                <div className="mb-3">
                    <label htmlFor="transactionType" className="form-label">
                        Type de Transaction
                    </label>
                    <select
                        className="form-select"
                        id="transactionType"
                        value={transactionType}
                        onChange={handleTransactionTypeChange}
                        required
                    >
                        <option value="Achat">Achat</option>
                        <option value="Vente">Vente</option>
                    </select>
                </div>

                {/* Champ de quantité */}
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                        Quantité
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        required
                    />
                </div>

                {/* Sélecteur de cryptomonnaie */}
                <div className="mb-3">
                    <label htmlFor="crypto" className="form-label">
                        Cryptomonnaie
                    </label>
                    <select
                        className="form-select"
                        id="crypto"
                        value={crypto}
                        onChange={handleCryptoChange}
                        required
                    >
                        <option value="">Choisir une cryptomonnaie</option>
                        {cryptos.map((cryptoOption, index) => (
                            <option key={index} value={cryptoOption}>
                                {cryptoOption}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sélecteur de devise */}
                <div className="mb-3">
                    <label htmlFor="currency" className="form-label">
                        Devise
                    </label>
                    <select
                        className="form-select"
                        id="currency"
                        value={currency}
                        onChange={handleCurrencyChange}
                        required
                    >
                        <option value="">Choisir une devise</option>
                        {currencies.map((currencyOption, index) => (
                            <option key={index} value={currencyOption}>
                                {currencyOption}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Bouton de soumission */}
                <button type="submit" className="btn btn-warning">
                    Soumettre
                </button>
            </form>
        </div>
    );
}

export default TransactionCryptoForm;
