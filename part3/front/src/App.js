import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from './logo.svg';

// Importation des vues
import Home from './views/Home';
import About from './views/About';
import SignUpForm from './views/SignUpForm';
import LoginForm from './views/LoginForm';
import PinConfirmationForm from './views/PinConfirmationForm';
import CryptoPrices from './views/CryptoPrices';
import NotFound from './views/NotFound';
import TransactionCryptoForm from './views/TransactionCryptoForm';
import TransactionFondForm from './views/TransactionFondForm';
import TransactionList from './views/TransactionList';
import CryptoChart from './views/CryptoChart';
import UserProfile from './views/UserProfile';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Barre de navigation avec Bootstrap */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Crypto</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">Accueil</Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/about" className="nav-link">À propos</Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/cours" className="nav-link">Cours des Cryptos</Link>
                </li>
                {/* Dropdown pour l'authentification */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="authDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Authentification
                  </a>
                  <ul className="dropdown-menu bg-dark" aria-labelledby="authDropdown">
                    <li><Link className="dropdown-item bg-dark text-white" to="/sign-up">Inscription</Link></li>
                    <li><Link className="dropdown-item bg-dark text-white" to="/login">Connexion</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Contenu principal */}
        <div className="container mt-5 pt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/pin-form" element={<PinConfirmationForm />} />
            <Route path="/cours" element={<CryptoPrices />} />
            <Route path="/t-crypto" element={<TransactionCryptoForm />} />
            <Route path="/t-fond" element={<TransactionFondForm />} />
            <Route path="/l-crypto" element={<TransactionList />} />
            <Route path="/chart" element={<CryptoChart />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
