import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// FullOffice
import LandingPage from './pages/fulloffice/LandingPage';
import Login from './pages/fulloffice/Login';
import Register from './pages/fulloffice/Register';
import PinConfirmation from './pages/fulloffice/PinConfirmation';
import CryptoPrices from './pages/fulloffice/CryptoPrices';
import CryptoAnalysis from './pages/fulloffice/CryptoAnalysis';

// BackOffice
import TransactionsList from './pages/backoffice/TransactionsList';
import EditCommission from './pages/backoffice/EditCommission';

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
        <Route path="/cryptos/analysis" element={<CryptoAnalysis/>} />

        {/* Backoffice Routes */}
        <Route path="/transactions" element={<TransactionsList />} />
        <Route path="/commission/edit" element={<EditCommission />} />

        {/* Frontoffice Routes */}
        <Route path="/wallet/cryptos" element={<CryptoWallet />} />
        <Route path="/wallet/funds" element={<FundsWallet />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;