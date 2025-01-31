import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// FullOffice
import LandingPage from './pages/fulloffice/LandingPage';
import Login from './pages/fulloffice/Login';
import Register from './pages/fulloffice/Register';
import PinConfirmation from './pages/fulloffice/PinConfirmation';
import CryptoPrices from './pages/fulloffice/CryptoPrices';
import CryptoAnalysis from './pages/fulloffice/CryptoAnalysis';
import CryptoEvolution from './pages/fulloffice/CryptoEvolution';

import Page404 from './pages/fulloffice/error/Page404';

// BackOffice
import TransactionsList from './pages/backoffice/TransactionsList';
import TransactionResume from './pages/backoffice/TransactionResume';
import TransactionsValidation from './pages/backoffice/TransactionsValidation';
import EditCommission from './pages/backoffice/EditCommission';
import CommissionAnalysis from './pages/backoffice/CommissionAnalysis';

// FrontOffice
import CryptoWallet from './pages/frontoffice/CryptoWallet';
import FundsWallet from './pages/frontoffice/FundsWallet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Fulloffice Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pin/confirm" element={<PinConfirmation />} />
        <Route path="/cryptos/prices" element={<CryptoPrices />} />
        <Route path="/cryptos/analysis" element={<CryptoAnalysis />} />
        <Route path="/cryptos/evolution" element={<CryptoEvolution />} />

        {/* Backoffice Routes */}
        <Route path="/transactions" element={<TransactionsList />} />
        <Route path="/transactions/resume" element={<TransactionResume />} />
        <Route path="/transactions/validation" element={<TransactionsValidation />} />
        <Route path="/commissions/edit" element={<EditCommission />} />
        <Route path="/commissions/analysis" element={<CommissionAnalysis />} />

        {/* Frontoffice Routes */}
        <Route path="/wallet/cryptos" element={<CryptoWallet />} />
        <Route path="/wallet/funds" element={<FundsWallet />} />

        {/* Fallback route */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;