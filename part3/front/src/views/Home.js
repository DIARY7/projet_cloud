import React from 'react';

function Home() {
    return (
        <div className="container mt-5">
            {/* Section principale avec un titre et une image de crypto */}
            <div className="row text-center mb-5">
                <div className="col">
                    <h1 className="display-4 text-warning">Bienvenue dans l'Univers des Cryptomonnaies</h1>
                    <p className="lead text-muted">Suivez, échangez et investissez dans les cryptomonnaies avec notre plateforme</p>
                </div>
            </div>

            {/* Section avec des avantages spécifiques aux cryptomonnaies */}
            <div className="row mt-5 text-center">
                <div className="col-12 col-md-4">
                    <h5><i className="bi bi-currency-bitcoin"></i> Suivi des prix en temps réel</h5>
                    <p>Restez informé avec les mises à jour en temps réel des prix des cryptomonnaies les plus populaires.</p>
                </div>
                <div className="col-12 col-md-4">
                    <h5><i className="bi bi-wallet2"></i> Portefeuille sécurisé</h5>
                    <p>Gérez vos cryptomonnaies en toute sécurité avec un portefeuille numérique intégré à notre application.</p>
                </div>
                <div className="col-12 col-md-4">
                    <h5><i className="bi bi-arrow-repeat"></i> Échanges rapides</h5>
                    <p>Effectuez des transactions et échangez vos cryptomonnaies en toute simplicité et sécurité.</p>
                </div>
            </div>

            {/* Section avec un graphique ou des données en temps réel */}
            <div className="row mt-5 text-center">
                <div className="col">
                    <h4 className="text-primary">Graphique en temps réel</h4>
                    <p>Suivez les tendances du marché des cryptomonnaies grâce à des graphiques interactifs (fictifs dans cet exemple).</p>
                    <img src="https://via.placeholder.com/600x300/00B4D8/FFFFFF?text=Graphique+Crypto" alt="Graphique Crypto" className="img-fluid rounded shadow-lg" />
                </div>
            </div>
        </div>
    );
}

export default Home;
