import React, { useState, useEffect, useRef } from 'react';
import { Settings, Dna, History, Trophy, AlertCircle, RotateCcw } from 'lucide-react';
import { Tier, LotteryItem, LOTTERY_CONFIG } from './types';
import { drawTier, generateItem } from './utils';
import { ResultCard } from './components/ResultCard';
import { GachaMachine } from './components/GachaMachine';

export default function App() {
  // State
  const [totalDraws, setTotalDraws] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>('10');
  const [inventory, setInventory] = useState<LotteryItem[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState<LotteryItem | null>(null);

  // Computed
  const remainingDraws = totalDraws === null ? 0 : totalDraws - inventory.length;
  const isSetup = totalDraws !== null;

  const stats = {
    [Tier.HIDDEN]: inventory.filter(i => i.tier === Tier.HIDDEN).length,
    [Tier.EPIC]: inventory.filter(i => i.tier === Tier.EPIC).length,
    [Tier.RARE]: inventory.filter(i => i.tier === Tier.RARE).length,
    [Tier.BASIC]: inventory.filter(i => i.tier === Tier.BASIC).length,
  };

  // Scroll to new items in history
  const historyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollLeft = historyRef.current.scrollWidth;
    }
  }, [inventory]);

  const handleSetCount = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(inputValue);
    if (count > 0 && count <= 1000) {
      setTotalDraws(count);
    } else {
      alert("Please enter a valid number between 1 and 1000.");
    }
  };

  const handleDraw = () => {
    if (remainingDraws <= 0 || isSpinning) return;

    setIsSpinning(true);
    setShowResult(null);

    // Animation delay
    setTimeout(() => {
      const wonTier = drawTier();
      const newItem = generateItem(wonTier);
      
      setInventory(prev => [...prev, newItem]);
      setShowResult(newItem);
      setIsSpinning(false);
    }, 1500);
  };

  const closeResult = () => {
    setShowResult(null);
  };

  // --- Screens ---

  if (!isSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 max-w-md w-full text-center space-y-6">
          <div className="flex justify-center mb-4">
             <div className="bg-indigo-500/10 p-4 rounded-full">
               <Settings className="w-12 h-12 text-indigo-400" />
             </div>
          </div>
          <h1 className="text-3xl font-bold text-white">System Setup</h1>
          <p className="text-slate-400">
            Welcome to the Exclusive Lottery System. 
            <br/>
            <span className="text-amber-400 font-semibold text-sm">⚠️ Configuration can only be set once.</span>
          </p>
          
          <form onSubmit={handleSetCount} className="space-y-4">
            <div className="relative">
              <input
                type="number"
                min="1"
                max="1000"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg py-4 px-4 text-center text-2xl font-bold text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
                placeholder="Enter amount"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">DRAWS</span>
            </div>
            
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-indigo-600/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Initialize System
            </button>
          </form>

          <div className="grid grid-cols-4 gap-2 text-xs pt-4 border-t border-slate-700/50">
            <div className="text-slate-500">Basic<br/>50%</div>
            <div className="text-blue-400">Rare<br/>35%</div>
            <div className="text-purple-400">Epic<br/>25%</div>
            <div className="text-yellow-400">Hidden<br/>8%</div>
          </div>
          <p className="text-[10px] text-slate-600 italic">*Probabilities normalized based on input weights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Dna className="text-indigo-400 w-6 h-6" />
          <h1 className="font-bold text-lg tracking-wider">GACHA<span className="text-indigo-400">SYS</span></h1>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-100">{stats[Tier.HIDDEN]}</span>
            </div>
             <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                <History className="w-4 h-4 text-slate-400" />
                <span>{inventory.length} / {totalDraws}</span>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4">
        <GachaMachine 
          onDraw={handleDraw} 
          isSpinning={isSpinning} 
          remainingDraws={remainingDraws}
          disabled={remainingDraws === 0}
        />
        
        {remainingDraws === 0 && (
          <div className="mt-4 px-4 py-2 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 flex items-center gap-2 animate-pulse">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">System Limit Reached</span>
          </div>
        )}
      </main>

      {/* Inventory Strip */}
      <div className="relative z-10 bg-slate-900/90 border-t border-slate-800 backdrop-blur-lg h-48 flex flex-col">
        <div className="px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between">
            <span>Acquisition Log</span>
            <span>Total: {inventory.length}</span>
        </div>
        <div 
          ref={historyRef}
          className="flex-1 overflow-x-auto overflow-y-hidden flex items-center gap-4 px-6 pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
        >
          {inventory.length === 0 ? (
            <div className="w-full text-center text-slate-600 text-sm italic">
              No items acquired yet. Start the machine.
            </div>
          ) : (
            inventory.map((item) => (
              <div key={item.id + item.timestamp} className="flex-shrink-0">
                <ResultCard item={item} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Result Modal Overlay */}
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeResult}
          />
          <div className="relative z-10 animate-[bounce_0.5s_ease-out]">
             <ResultCard item={showResult} isReveal={true} />
             <button 
                onClick={closeResult}
                className="mt-8 mx-auto block px-8 py-2 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-colors shadow-xl"
             >
                Continue
             </button>
          </div>
        </div>
      )}
    </div>
  );
}