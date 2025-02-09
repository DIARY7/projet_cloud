export function formatDate(dateString) {
    const date = new Date(dateString);

    if (isNaN(date)) {
        return 'Date invalide';
    }

    return date.toLocaleString('fr-FR', {
        weekday: 'short',  // Jour de la semaine abrégé
        year: 'numeric',   // Année complète
        month: 'short',    // Mois abrégé
        day: 'numeric',    // Jour du mois
        hour: '2-digit',   // Heure en 2 chiffres
        minute: '2-digit', // Minute en 2 chiffres
        second: '2-digit', // Seconde en 2 chiffres
        hour12: false,     // Format 24h
    });
}
