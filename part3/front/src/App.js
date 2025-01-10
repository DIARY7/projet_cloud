import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import de Bootstrap
import logo from './logo.svg';  // Logo par défaut de React

// Importation des vues
import Home from './views/Home';
import About from './views/About';

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
                <li className="nav-item">
                  <Link to="/about" className="nav-link">À propos</Link>
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
