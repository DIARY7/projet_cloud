import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// FullOffice
import LandingPage from './pages/fulloffice/LandingPage';
import Login from './pages/fulloffice/Login';
import Register from './pages/fulloffice/Register';
import PinConfirmation from './pages/fulloffice/PinConfirmation';
import CryptoPrices from './pages/fulloffice/CryptoPrices';
import CryptoAnalysis from './pages/fulloffice/CryptoAnalysis';
import CryptoEvolution from './pages/fulloffice/CryptoEvolution';

import Page404 from './pages/fulloffice/error/Page404';
import Unauthorized from './pages/fulloffice/error/Unauthorized';

// BackOffice
import TransactionResume from './pages/backoffice/TransactionResume';
import TransactionsValidation from './pages/backoffice/TransactionsValidation';
import EditCommission from './pages/backoffice/EditCommission';
import CommissionAnalysis from './pages/backoffice/CommissionAnalysis';

// FrontOffice
import TransactionsList from './pages/frontoffice/TransactionsList';
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
        <Route
          path="/transactions/resume"
          element={
            <ProtectedRoute>
              <TransactionResume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions/validation"
          element={
            <ProtectedRoute>
              <TransactionsValidation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/commissions/edit"
          element={
            <ProtectedRoute>
              <EditCommission />
            </ProtectedRoute>
          }
        />
        <Route
          path="/commissions/analysis"
          element={
            <ProtectedRoute>
              <CommissionAnalysis />
            </ProtectedRoute>
          }
        />

        {/* Frontoffice Routes */}
        <Route path="/transactions" element={<TransactionsList />} />
        <Route path="/wallet/cryptos" element={<CryptoWallet />} />
        <Route path="/wallet/funds" element={<FundsWallet />} />

        {/* Fallback route */}
        <Route path="*" element={<Page404 />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
