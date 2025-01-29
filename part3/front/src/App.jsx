import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/fulloffice/LandingPage';
import Login from './pages/fulloffice/Login';
import Register from './pages/fulloffice/Register';
import TransactionsList from './pages/backoffice/TransactionsList';
import CryptoWallet from './pages/frontoffice/CryptoWallet';
import FundsWallet from './pages/frontoffice/FundsWallet';
import PinConfirmation from './pages/fulloffice/PinConfirmation';
import CryptoPrices from './pages/fulloffice/CryptoPrices';

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

        {/* Backoffice Routes */}
        <Route path="/admin/transactions" element={<TransactionsList />} />

        {/* Frontoffice Routes */}
        <Route path="/wallet/crypto" element={<CryptoWallet />} />
        <Route path="/wallet/funds" element={<FundsWallet />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;