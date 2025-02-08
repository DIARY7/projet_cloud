import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Lock, Unlock, Loader2 } from 'lucide-react';
import { saveAuthData } from '../../utils/auth';
import {useAuth} from '../../context/AuthContext';
import { use } from 'react';

export default function PinConfirmation() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const email = location.state?.email || 'Email inconnu';
  const origin = location.state.origin;
  const navigate = useNavigate();
  const {login} = useAuth();

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pin.length !== 6) {
      setError('Le PIN doit comporter exactement 6 chiffres.');
      return;
    }

    const payload = {
      Email: email,
      pin,
    };

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      let response;
      if (origin === 'register') {
        response = await fetch('http://localhost:5000/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else if (origin === 'login') {
        response = await fetch('http://localhost:5000/confirmLogin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const result = await response.json();
      setLoading(false); // Arrête le chargement

      if (result.status === 'success') {
        setSuccessMessage(result.datas.message);
        saveAuthData()
        if (origin === 'login') {
            // saveAuthData(result.datas.token, false);
            // window.location.reload();
          login(result.datas.token, result.datas.isAdmin);
        }
        if (origin === 'register') {
            navigate('/login', { state: { message: 'Veuillez vous connecter maintenant' } });
        }
      } else {
        setError(result.error || 'Erreur de confirmation.');
      }
    } catch (err) {
      setLoading(false);
      setError('Erreur lors de la requête.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Lock className="mx-auto h-12 w-12 text-yellow-500" />
          <h2 className="mt-6 text-3xl font-bold text-white">Confirmer votre PIN</h2>
          <p className="mt-2 text-sm text-gray-400">
            Utilisateur : <span className="text-yellow-500">{email}</span>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="password"
                required
                maxLength="6"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="PIN"
                value={pin}
                onChange={handlePinChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 text-gray-900" />
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Unlock className="h-5 w-5 text-gray-900" />
                  </span>
                  Confirmer
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <Link to="/" className="text-yellow-500 hover:text-yellow-400">
              Retourner à l'accueil
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
