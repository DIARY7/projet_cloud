// Sauvegarder le token et le rôle (isAdmin) dans localStorage
export const saveAuthData = (token, isAdmin) => {
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', isAdmin);
};

// Récupérer le token depuis localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Récupérer le rôle isAdmin depuis localStorage
export const getIsAdmin = () => {
    return localStorage.getItem('isAdmin') === 'true';  // Retourne true ou false
};

// Supprimer le token et le rôle de localStorage
export const removeAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
};

// Vérifier si l'utilisateur est authentifié
export const isAuthenticated = () => {
    return !!getToken();  // Retourne true si le token existe
};
