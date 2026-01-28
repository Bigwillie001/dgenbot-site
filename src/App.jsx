import React, { useState, useEffect } from 'react';
import { Send, TrendingUp, BarChart3 } from 'lucide-react';
import botPfp from './bot-pfp.jpg'; 

const App = () => {
  const [price, setPrice] = useState("0.0000");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const TOKEN_ADDRESS = "6tbe2qsKdbPvN19b1nbi1VrBkRER5RzGqR3qz4Qspump"; 
  const X_URL = "https://x.com/dgenbot";
  const TELEGRAM_URL = "https://t.me/dbdotfun";
  // ✅ FIXED: Ended with backtick (`) instead of quote (')
  const JUPITER_URL = `https://jup.ag/swap/SOL-${TOKEN_ADDRESS}`;
  const DEXSCREENER_URL = `https://dexscreener.com/solana/${TOKEN_ADDRESS}`;

  const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
    </svg>
  );

  const fetchPrice = async () => {
    try {
      const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`);
      const data = await res.json();
      if (data.pairs && data.pairs.length > 0) {
        setPrice(data.pairs[0].priceUsd);
        setLoading(false);
      }
    } catch (e) { console.log("Price fetching..."); } 
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-green-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="z-10 flex flex-col items-center max-w-2xl w-full">
        
        {/* PFP */}
        <div className="group relative mb-6">
          <div className="absolute -inset-1 bg-green-500 rounded-full blur opacity-75 animate-pulse"></div>
          <div className="relative w-36 h-36 md:w-64 md:h-64 rounded-full border-4 border-green-500 overflow-hidden bg-zinc-900">
            <img src={botPfp} alt="DGENBOT" className="w-full h-full object-cover" onError={(e) => e.target.src = "/bot-pfp.jpg"} />
          </div>
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-green-300 to-green-700 mb-4 tracking-tighter text-center uppercase">
          DGEN<span className="text-white">BOT</span>
        </h1>

        {/* Speech */}
        <p className="text-zinc-400 text-sm md:text-lg text-center max-w-lg mb-8 leading-relaxed px-6">
          Welcome to the home of <span className="text-white font-bold">dgenbot</span>. The premier bot for traders on the Solana blockchain. Dgenbot monitors the chain for alpha, tracks events of interest and keeps you ahead of the game.
        </p>

        {/* CA Bar */}
        <div 
          className="w-full max-w-md bg-zinc-900/80 border border-green-500/30 p-1.5 rounded-xl flex items-center justify-between mb-8 hover:border-green-500 transition-all cursor-pointer group" 
          onClick={() => {navigator.clipboard.writeText(TOKEN_ADDRESS); setCopied(true); setTimeout(() => setCopied(false), 2000);}}
        >
          <div className="flex-1 overflow-hidden px-3">
            {/* ✅ FIXED: Corrected spelling of 'medium' */}
            <code className="text-green-400 text-[10px] md:text-xs truncate block font-medium tracking-wider opacity-90">
              {TOKEN_ADDRESS}
            </code>
          </div>
          <button className="bg-green-600 text-black font-black text-[10px] md:text-xs px-4 py-2 rounded-lg shrink-0 uppercase">
            {copied ? "COPIED!" : "COPY CA"}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-5 w-full justify-center px-4 items-center">
          
          <button 
            onClick={() => window.open(JUPITER_URL, '_blank')}
            className="w-auto flex items-center justify-center gap-2 bg-green-500 text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-green-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] cursor-pointer"
          >
            <TrendingUp size={17} /> BUY NOW
          </button>
          
          <div className="flex gap-4">
             <button onClick={() => window.open(DEXSCREENER_URL, '_blank')} className="p-4 bg-zinc-800 rounded-full border border-zinc-700 hover:text-green-400 hover:border-green-500 transition-all cursor-pointer">
              <BarChart3 size={20} />
            </button>
            <button onClick={() => window.open(X_URL, '_blank')} className="p-4 bg-zinc-800 rounded-full border border-zinc-700 hover:text-green-400 hover:border-green-500 transition-all cursor-pointer flex items-center justify-center">
              <XIcon />
            </button>
            <button onClick={() => window.open(TELEGRAM_URL, '_blank')} className="p-4 bg-zinc-800 rounded-full border border-zinc-700 hover:text-green-400 hover:border-green-500 transition-all cursor-pointer">
              <Send size={20} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;