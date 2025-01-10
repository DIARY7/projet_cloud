import React from 'react';

function UserProfile() {
    // Exemple de données utilisateur et portefeuille
    const user = {
        fullname: "Jean Dupont", // Nouveau champ Full Name
        email: "utilisateur@example.com",
        solde: 500.75 // Solde en USD
    };

    const portefeuille = [
        { crypto: 'Bitcoin', quantite: 1.5, valeurActuelle: 30000 },
        { crypto: 'Ethereum', quantite: 10, valeurActuelle: 2000 },
        { crypto: 'Ripple', quantite: 500, valeurActuelle: 0.5 }
    ];

    // Calcul du total des quantités et de la valeur
    const totalQuantite = portefeuille.reduce((acc, item) => acc + item.quantite, 0);
    const totalValeurActuelle = portefeuille.reduce((acc, item) => acc + item.valeurActuelle, 0);
    const totalValeur = portefeuille.reduce((acc, item) => acc + (item.quantite * item.valeurActuelle), 0);

    // Génération de l'URL de l'avatar aléatoire basé sur l'email
    const avatarUrl = `https://robohash.org/${user.email}?set=set1`;

    return (
        <div className="container mt-5">
            {/* Section principale avec le titre */}
            <div className="row text-center mb-5">
                <div className="col">
                    <h1 className="display-4 text-warning">Mon Profil</h1>
                    <p className="lead text-muted">Gérez vos informations personnelles et votre portefeuille de cryptomonnaies</p>
                </div>
            </div>

            {/* Informations utilisateur avec avatar */}
            <div className="row justify-content-center mb-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <img
                                src={avatarUrl}
                                alt="Avatar Utilisateur"
                                className="img-fluid rounded-circle mb-3"
                                style={{ width: "150px", height: "150px", border: "5px solid #f8f9fa" }}
                            />
                            <h4 className="card-title">{user.fullname}</h4>
                            <p className="card-text"><strong>Email :</strong> {user.email}</p>
                            <p className="card-text"><strong>Solde :</strong> ${user.solde.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section portefeuille */}
            <div className="row mb-4">
                <div className="col">
                    <h4 className="text-center mb-4">Portefeuille de Cryptomonnaies</h4>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Cryptomonnaie</th>
                                    <th scope="col">Quantité</th>
                                    <th scope="col">Valeur Actuelle (USD)</th>
                                    <th scope="col">Valeur Totale (USD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {portefeuille.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.crypto}</td>
                                        <td>{item.quantite}</td>
                                        <td>${item.valeurActuelle.toFixed(2)}</td>
                                        <td>${(item.quantite * item.valeurActuelle).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                {/* Dernière ligne avec les totaux */}
                                <tr className="table-active">
                                    <td><strong>Total</strong></td>
                                    <td>{totalQuantite}</td>
                                    <td>${totalValeurActuelle.toFixed(2)}</td>
                                    <td>${totalValeur.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
