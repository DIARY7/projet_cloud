using Microsoft.Extensions.Caching.Memory;
using userboard.Models;

namespace userboard.Utils
{
    public class MultiAuthCache
    {
        private readonly IMemoryCache _cache;

        // Constructeur pour l'injection de dépendance
        public MultiAuthCache(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        // Méthode non statique pour ajouter un utilisateur au cache
        public void AddUserToCache(UserCacheInfo userCache)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(2) // Expire après 2 minutes
            };

            _cache.Set(userCache.User.Email, userCache, cacheEntryOptions);
        }

        // Méthode non statique pour supprimer un utilisateur du cache
        public void RemoveUserFromCache(string email)
        {
            _cache.Remove(email);
        }

        // Méthode non statique pour récupérer les informations d'un utilisateur dans le cache
        public UserCacheInfo GetUserCacheInfo(string email)
        {
            _cache.TryGetValue(email, out UserCacheInfo? userCache);
            return userCache;
        }

        // Méthode non statique pour valider un PIN
        public bool ValidatePin(string email, string pin)
        {
            var userCacheInfo = GetUserCacheInfo(email);
            return userCacheInfo != null && userCacheInfo.ExpectedPin == pin;
        }
    }
}
