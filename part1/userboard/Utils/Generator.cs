using System;
using System.Security.Cryptography;
using System.Text;

namespace userboard.Utils
{
    public class Generator
    {
        public static string GenererPin(int longueur = 4)
        {
            if (longueur <= 0)
                throw new ArgumentException("La longueur doit être supérieure à zéro.");

            var random = new Random();
            var pin = "";

            for (int i = 0; i < longueur; i++)
            {
                pin += random.Next(0, 10).ToString();
            }

            return pin;
        }

        public static string GenererToken(int longueur = 32)
        {
            if (longueur <= 0)
                throw new ArgumentException("La longueur doit être supérieure à zéro.");

            const string caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var tokenBuilder = new StringBuilder();
            var rng = new RNGCryptoServiceProvider();
            var data = new byte[1];

            while (tokenBuilder.Length < longueur)
            {
                rng.GetBytes(data); // Remplit le tableau de bytes avec des valeurs aléatoires
                var index = data[0] % caracteres.Length;
                tokenBuilder.Append(caracteres[index]);
            }

            return tokenBuilder.ToString();
        }
    }
}