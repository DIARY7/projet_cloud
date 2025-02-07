// import React, { useState } from 'react';
// import { Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
// import Navbar from '../../components/NavBar';

// export default function CryptoWallet() {
//   const [amountToBuy, setAmountToBuy] = useState('');
//   const [amountToSell, setAmountToSell] = useState('');

//   const cryptoDatas = [
//     { crypto: {id: 1, label: 'BTC'}, qte: '0.5', prix: '20000' },
//     { crypto: {id: 2, label: 'ETH'}, qte: '10', prix: '15000' },
//   ];

//   const handleBuySubmit = (cryptoId) => {
//     console.log(`Acheter ${amountToBuy} de ${cryptoId}`);
//   };

//   const handleSellSubmit = (cryptoId) => {
//     console.log(`Vendre ${amountToSell} de ${cryptoId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <Navbar />
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-center mb-8">
//           <div className="flex items-center">
//             <Wallet className="h-8 w-8 text-yellow-500 mr-3" />
//             <h1 className="text-3xl font-bold text-white">Portefeuille Crypto</h1>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-6 mb-8">
//           <div className="bg-gray-800 rounded-lg p-6">
//             <h2 className="text-lg font-medium text-gray-400 mb-2">Balance Totale</h2>
//             <p className="text-3xl font-bold text-white">35,000 MGA</p>
//           </div>
//         </div>

//         <div className="bg-gray-800 rounded-lg shadow p-6">
//           <h2 className="text-xl font-bold text-white mb-4">Vos Cryptomonnaies</h2>
//           <div className="space-y-4">
//             {cryptoDatas.map((cryptoData) => (
//               <div key={cryptoData.crypto.id} className="bg-gray-700 rounded-lg p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-lg font-medium text-white">{cryptoData.crypto.label}</h3>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-lg font-medium text-white">{cryptoData.qte} {cryptoData.crypto.label} = {cryptoData.prix} MGA</p>
//                   </div>
//                 </div>

//                 <div className="mt-4 flex flex-wrap gap-4">
//                   <div className="w-full sm:w-[48%]">
//                     <h3 className="text-sm text-gray-400 mb-2">Acheter {cryptoData.crypto.label}</h3>
//                     <input
//                       type="number"
//                       className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                       placeholder="Montant"
//                       prix={amountToBuy}
//                       onChange={(e) => setAmountToBuy(e.target.prix)}
//                     />
//                     <button
//                       onClick={() => handleBuySubmit(cryptoData.crypto.label)}
//                       className="w-full mt-2 flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400"
//                     >
//                       <ArrowDownLeft className="h-4 w-4 mr-2" />
//                       Acheter
//                     </button>
//                   </div>

//                   <div className="w-full sm:w-[48%]">
//                     <h3 className="text-sm text-gray-400 mb-2">Vendre {cryptoData.crypto.label}</h3>
//                     <input
//                       type="number"
//                       className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                       placeholder="Montant"
//                       prix={amountToSell}
//                       onChange={(e) => setAmountToSell(e.target.prix)}
//                     />
//                     <button
//                       onClick={() => handleSellSubmit(cryptoData.crypto.label)}
//                       className="w-full mt-2 flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
//                     >
//                       <ArrowUpRight className="h-4 w-4 mr-2" />
//                       Vendre
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Navbar from '../../components/NavBar';
import { getToken } from '../../utils/auth';

export default function CryptoWallet() {
  const [amountToBuy, setAmountToBuy] = useState('');
  const [amountToSell, setAmountToSell] = useState('');
  const [cryptoDatas, setCryptoDatas] = useState([]);
  const [totalBalance, setTotalBalance] = useState(''); // for total balance
  useEffect(() => {
    // Récupération du token
    const token = getToken();

    if (!token) {
      console.error("Token non trouvé");
      return; // Sortir de la fonction si aucun token n'est trouvé
    }

    // Faire la requête fetch avec l'ajout du Bearer Token dans l'en-tête
    fetch('http://localhost:8080/TransCrypto/porteFeuille', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Ajouter le Bearer Token
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setCryptoDatas(data.data.data); // Ajustez en fonction de la structure de la réponse
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  const handleBuySubmit = (cryptoId) => {
    console.log(`Acheter ${amountToBuy} de ${cryptoId}`);
  };

  const handleSellSubmit = (cryptoId) => {
    console.log(`Vendre ${amountToSell} de ${cryptoId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-yellow-500 mr-3" />
            <h1 className="text-3xl font-bold text-white">Portefeuille Crypto</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-400 mb-2">Balance Totale</h2>
            <p className="text-3xl font-bold text-white">{totalBalance} MGA</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-white mb-4">Vos Cryptomonnaies</h2>
          <div className="space-y-4">
            {cryptoDatas.map((cryptoData) => (
              <div key={cryptoData.crypto.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">{cryptoData.crypto.label}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-white">{cryptoData.qte} {cryptoData.crypto.label} = {cryptoData.prix} MGA</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="w-full sm:w-[48%]">
                    <h3 className="text-sm text-gray-400 mb-2">Acheter {cryptoData.crypto.label}</h3>
                    <input
                      type="number"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Montant"
                      value={amountToBuy}
                      onChange={(e) => setAmountToBuy(e.target.value)}
                    />
                    <button
                      onClick={() => handleBuySubmit(cryptoData.crypto.label)}
                      className="w-full mt-2 flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400"
                    >
                      <ArrowDownLeft className="h-4 w-4 mr-2" />
                      Acheter
                    </button>
                  </div>

                  <div className="w-full sm:w-[48%]">
                    <h3 className="text-sm text-gray-400 mb-2">Vendre {cryptoData.crypto.label}</h3>
                    <input
                      type="number"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Montant"
                      value={amountToSell}
                      onChange={(e) => setAmountToSell(e.target.value)}
                    />
                    <button
                      onClick={() => handleSellSubmit(cryptoData.crypto.label)}
                      className="w-full mt-2 flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Vendre
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
