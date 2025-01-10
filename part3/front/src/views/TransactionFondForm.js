// src/views/TransactionFondForm.js
import React, { useState } from 'react';

function TransactionFondForm() {
    // États pour les champs du formulaire
    const [transactionType, setTransactionType] = useState('Dépôt'); // "Dépôt" ou "Retrait"
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');

    // Listes des devises pour les selects
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CHF'];

    // Gérer le changement dans les inputs
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleCurrencyChange = (e) => setCurrency(e.target.value);
    const handleTransactionTypeChange = (e) => setTransactionType(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Vous pouvez ajouter des logiques ici pour envoyer ces données au backend ou les traiter
        alert(`Vous souhaitez ${transactionType === 'Dépôt' ? 'déposer' : 'retirer'} ${amount} ${currency}`);
    };

    return (
        <div className="container mt-5">
            <h2>{transactionType} de Fonds</h2>
            <form onSubmit={handleSubmit}>
                {/* Sélecteur de type de transaction (Dépôt/Retrait) */}
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
                        <option value="Dépôt">Dépôt</option>
                        <option value="Retrait">Retrait</option>
                    </select>
                </div>

                {/* Champ de montant */}
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                        Montant
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        required
                        min="0"
                    />
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

export default TransactionFondForm;
