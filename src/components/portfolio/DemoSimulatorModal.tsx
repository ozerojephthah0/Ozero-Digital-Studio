import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Square,
  RotateCcw,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  ShoppingBag,
  BookOpen,
  HelpCircle,
  Code2,
  PieChart,
  Sparkles,
  Check,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowRight
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatNaira } from '../../utils/formatters';
import { logAction } from '../../utils/logger';

export const DemoSimulatorModal: React.FC = () => {
  const { demoModalProject, setDemoModalProject, setPrefilledCategory, navigateTo } = useStudio();

  if (!demoModalProject) return null;

  return (
    <Modal
      isOpen={!!demoModalProject}
      onClose={() => setDemoModalProject(null)}
      title={`Interactive Simulator · ${demoModalProject.title}`}
      subtitle={demoModalProject.tagline}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Simulator Content by project ID */}
        {demoModalProject.id === 'proj-cartnova' && <CartNovaSimulator />}
        {demoModalProject.id === 'proj-beatbox' && <BeatboxSimulator />}
        {demoModalProject.id === 'proj-novella' && <NovellaSimulator />}
        {demoModalProject.id === 'proj-budget-tracker' && <BudgetTrackerSimulator />}
        {demoModalProject.id === 'proj-image-game' && <ImageGameSimulator />}
        {demoModalProject.id === 'proj-quiz-master' && <QuizMasterSimulator />}
        {demoModalProject.id === 'proj-coderush' && <CodeRushSimulator />}

        {/* Modal Bottom actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Interactive live preview powered by Ozero Digital Studio
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              size="sm"
              variant="secondary"
              actionName="Close Simulator"
              onClick={() => setDemoModalProject(null)}
            >
              Exit Simulator
            </Button>
            <Button
              size="sm"
              variant="primary"
              actionName={`Hire For: ${demoModalProject.title}`}
              onClick={() => {
                setPrefilledCategory(
                  demoModalProject.category === 'ecommerce'
                    ? 'E-commerce Website Development'
                    : 'Web Application Development'
                );
                setDemoModalProject(null);
                navigateTo('contact', 'enquiry-form-section');
              }}
              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Build Something Like This
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// 1. CartNova Store Simulator
const CartNovaSimulator: React.FC = () => {
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([
    { id: '1', name: 'Minimalist Tech Backpack', price: 45000, qty: 1 }
  ]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'gear' | 'apparel'>('all');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const sampleProducts = [
    { id: '1', name: 'Minimalist Tech Backpack', category: 'gear', price: 45000, inStock: true },
    { id: '2', name: 'Wireless Ergonomic Keyboard', category: 'gear', price: 68000, inStock: true },
    { id: '3', name: 'Studio Oversized Hoodie', category: 'apparel', price: 28000, inStock: true },
    { id: '4', name: 'Ultra-Fast GaN Fast Charger', category: 'gear', price: 18500, inStock: true }
  ];

  const addToCart = (product: typeof sampleProducts[0]) => {
    logAction('CartNova Simulator: Add to cart', { product: product.name });
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        return prev.map(i => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    logAction('CartNova Simulator: Remove from cart', { id });
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="space-y-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-cyan-400" />
          <span className="font-bold font-display text-white">CartNova Store Demo</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 text-xs rounded-lg ${selectedCategory === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40' : 'text-slate-400'}`}
          >
            All Items
          </button>
          <button
            onClick={() => setSelectedCategory('gear')}
            className={`px-2.5 py-1 text-xs rounded-lg ${selectedCategory === 'gear' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40' : 'text-slate-400'}`}
          >
            Gear
          </button>
          <button
            onClick={() => setSelectedCategory('apparel')}
            className={`px-2.5 py-1 text-xs rounded-lg ${selectedCategory === 'apparel' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40' : 'text-slate-400'}`}
          >
            Apparel
          </button>
        </div>
      </div>

      {checkoutSuccess ? (
        <div className="p-8 text-center space-y-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h5 className="text-base font-bold text-white">Order Simulated Successfully!</h5>
          <p className="text-xs text-slate-300">Total processed: {formatNaira(total)}. Cart state cleared.</p>
          <Button
            size="sm"
            variant="outline"
            actionName="Reset CartNova Demo"
            onClick={() => {
              setCart([]);
              setCheckoutSuccess(false);
            }}
          >
            Shop Again
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Products List */}
          <div className="md:col-span-2 space-y-2">
            <div className="text-xs font-semibold text-slate-400">Available Products:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sampleProducts
                .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
                .map(product => (
                  <div key={product.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="text-xs font-semibold text-white">{product.name}</div>
                      <div className="text-xs font-mono text-cyan-400 font-bold">{formatNaira(product.price)}</div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-1.5 px-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Cart ({cart.reduce((a, b) => a + b.qty, 0)})</span>
                <span className="text-cyan-400 font-mono">{formatNaira(total)}</span>
              </div>
              <div className="divide-y divide-slate-800 pt-2 max-h-40 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-500">Cart is empty</div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="py-1.5 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-slate-200 font-medium truncate max-w-[120px]">{item.name}</div>
                        <div className="text-slate-400 text-[10px]">{item.qty} × {formatNaira(item.price)}</div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-rose-400 p-1">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <Button
              size="sm"
              variant="primary"
              actionName="CartNova Simulator: Checkout"
              disabled={cart.length === 0}
              onClick={() => {
                logAction('CartNova Simulator: Order Placed', { total });
                setCheckoutSuccess(true);
              }}
              className="w-full"
            >
              Simulate Checkout ({formatNaira(total)})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. Beatbox Pro Simulator
const BeatboxSimulator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [currentStep, setCurrentStep] = useState(0);
  const [grid, setGrid] = useState<boolean[][]>([
    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], // Kick
    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], // Snare
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],             // Hi-Hat
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true]  // Clap
  ]);

  const tracks = ['Kick (808)', 'Snare', 'Hi-Hat', 'Clap'];
  const audioCtxRef = useRef<AudioContext | null>(null);

  const toggleCell = (trackIdx: number, stepIdx: number) => {
    logAction('Beatbox Simulator: Toggle Pad', { trackIdx, stepIdx });
    setGrid(prev => {
      const copy = prev.map(row => [...row]);
      copy[trackIdx][stepIdx] = !copy[trackIdx][stepIdx];
      return copy;
    });
  };

  const playSound = (trackIdx: number) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freqMap = [100, 220, 800, 440];
      osc.frequency.setValueAtTime(freqMap[trackIdx], ctx.currentTime);

      if (trackIdx === 0) {
        osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      }

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      const stepTimeMs = (60 / bpm / 4) * 1000;
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const next = (prev + 1) % 16;
          grid.forEach((row, trackIdx) => {
            if (row[next]) {
              playSound(trackIdx);
            }
          });
          return next;
        });
      }, stepTimeMs);
    } else {
      setCurrentStep(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying, bpm, grid]);

  return (
    <div className="space-y-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-cyan-400" />
          <span className="font-bold font-display text-white">Beatbox Pro 16-Step Sequencer</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span>BPM:</span>
            <input
              type="number"
              min="60"
              max="180"
              value={bpm}
              onChange={e => setBpm(Number(e.target.value))}
              className="w-14 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400"
            />
          </div>
          <button
            onClick={() => {
              logAction('Beatbox Simulator: Play/Stop', { isPlaying: !isPlaying });
              setIsPlaying(!isPlaying);
            }}
            className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              isPlaying ? 'bg-rose-600 text-white' : 'bg-cyan-500 text-slate-950'
            }`}
          >
            {isPlaying ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Stop' : 'Play'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-2 overflow-x-auto pb-2">
        {grid.map((row, trackIdx) => (
          <div key={trackIdx} className="flex items-center gap-2 min-w-[500px]">
            <div className="w-24 text-xs font-mono font-medium text-slate-300 shrink-0">
              {tracks[trackIdx]}
            </div>
            <div className="grid grid-cols-16 gap-1 flex-1">
              {row.map((active, stepIdx) => {
                const isCurrent = isPlaying && currentStep === stepIdx;
                return (
                  <button
                    key={stepIdx}
                    onClick={() => toggleCell(trackIdx, stepIdx)}
                    className={`h-7 rounded-sm transition-all ${
                      active
                        ? isCurrent
                          ? 'bg-white shadow-lg shadow-cyan-400 scale-105'
                          : 'bg-cyan-500 shadow-sm shadow-cyan-500/40'
                        : isCurrent
                        ? 'bg-slate-700'
                        : stepIdx % 4 === 0
                        ? 'bg-slate-800/80 hover:bg-slate-700'
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Novella Simulator
const NovellaSimulator: React.FC = () => {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [themeMode, setThemeMode] = useState<'dark' | 'sepia' | 'light'>('dark');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const fontClasses = {
    sm: 'text-xs leading-relaxed',
    base: 'text-sm leading-relaxed',
    lg: 'text-base leading-loose'
  };

  const themeClasses = {
    dark: 'bg-slate-950 text-slate-200 border-slate-800',
    sepia: 'bg-[#f4ecd8] text-[#5b4636] border-[#e2d5bd]',
    light: 'bg-white text-slate-900 border-slate-200'
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-white">Novella Focus Reader</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <button onClick={() => setFontSize('sm')} className={`px-2 py-0.5 rounded text-xs ${fontSize === 'sm' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}>A-</button>
            <button onClick={() => setFontSize('base')} className={`px-2 py-0.5 rounded text-xs ${fontSize === 'base' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}>A</button>
            <button onClick={() => setFontSize('lg')} className={`px-2 py-0.5 rounded text-xs ${fontSize === 'lg' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}>A+</button>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex gap-1">
            <button onClick={() => setThemeMode('dark')} className={`px-2 py-0.5 rounded text-[11px] ${themeMode === 'dark' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'}`}>Dark</button>
            <button onClick={() => setThemeMode('sepia')} className={`px-2 py-0.5 rounded text-[11px] ${themeMode === 'sepia' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-400'}`}>Sepia</button>
            <button onClick={() => setThemeMode('light')} className={`px-2 py-0.5 rounded text-[11px] ${themeMode === 'light' ? 'bg-white text-slate-900 font-bold' : 'text-slate-400'}`}>Light</button>
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-2xl border transition-colors ${themeClasses[themeMode]} max-h-[300px] overflow-y-auto space-y-3`}>
        <div className="flex items-center justify-between border-b pb-2 opacity-75">
          <span className="font-mono text-xs uppercase tracking-wider">Chapter 1 · The Digital Architecture</span>
          <button
            onClick={() => {
              logAction('Novella: Bookmark Toggled', { isBookmarked: !isBookmarked });
              setIsBookmarked(!isBookmarked);
            }}
            className={`text-xs font-medium px-2 py-0.5 rounded ${isBookmarked ? 'bg-cyan-500/20 text-cyan-500' : 'opacity-60'}`}
          >
            {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </button>
        </div>
        <p className={fontClasses[fontSize]}>
          In the quiet glow of the terminal, thousands of lines resolved into a seamless interface. The goal was not merely to output visual components, but to construct a digital home that visitors would remember and trust instinctively.
        </p>
        <p className={fontClasses[fontSize]}>
          Typography flowed naturally across the viewport. Every spacing decision was calculated to guide the reader’s eye without friction, proving that simplicity is the ultimate sophistication in software design.
        </p>
      </div>
    </div>
  );
};

// 4. Budget Tracker Simulator
const BudgetTrackerSimulator: React.FC = () => {
  const [transactions, setTransactions] = useState([
    { id: '1', title: 'Domain Registration', amount: -15000, category: 'Hosting' },
    { id: '2', title: 'Client Web Payment', amount: 350000, category: 'Income' },
    { id: '3', title: 'Cloud Database Quota', amount: -22000, category: 'Infrastructure' }
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const totalBalance = transactions.reduce((acc, t) => acc + t.amount, 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount) return;
    const amountVal = Number(newAmount);
    setTransactions(prev => [
      { id: String(Date.now()), title: newTitle.trim(), amount: amountVal, category: amountVal > 0 ? 'Income' : 'Expense' },
      ...prev
    ]);
    logAction('Budget Tracker: Transaction Added', { title: newTitle, amount: amountVal });
    setNewTitle('');
    setNewAmount('');
  };

  return (
    <div className="space-y-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-cyan-400" />
          <span className="font-bold font-display text-white">Expense Tracker Analytics</span>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-400">Total Net Balance</div>
          <div className="text-sm font-bold font-mono text-cyan-400">{formatNaira(totalBalance)}</div>
        </div>
      </div>

      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          type="text"
          placeholder="Title (e.g. Server hosting)"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
        />
        <input
          type="number"
          placeholder="Amount (Negative for expense)"
          value={newAmount}
          onChange={e => setNewAmount(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono"
        />
        <Button size="sm" variant="primary" type="submit" actionName="Add Transaction">
          + Log Transaction
        </Button>
      </form>

      <div className="space-y-1.5 max-h-36 overflow-y-auto pt-1">
        {transactions.map(t => (
          <div key={t.id} className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-200 font-medium">{t.title}</span>
              <span className="text-[10px] text-slate-400 ml-2">({t.category})</span>
            </div>
            <span className={`font-mono font-bold ${t.amount >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {t.amount >= 0 ? '+' : ''}{formatNaira(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Image Guessing Game Simulator
const ImageGameSimulator: React.FC = () => {
  const [tiles, setTiles] = useState<boolean[]>(Array(9).fill(false));
  const [guess, setGuess] = useState('');
  const [solved, setSolved] = useState(false);
  const [score, setScore] = useState(100);

  const revealTile = (idx: number) => {
    if (tiles[idx] || solved) return;
    logAction('Image Game: Reveal Tile', { tileIndex: idx });
    setTiles(prev => {
      const copy = [...prev];
      copy[idx] = true;
      return copy;
    });
    setScore(s => Math.max(10, s - 10));
  };

  const handleGuess = () => {
    logAction('Image Game: Guess submitted', { guess });
    if (guess.toLowerCase().includes('laptop') || guess.toLowerCase().includes('macbook') || guess.toLowerCase().includes('computer')) {
      setSolved(true);
      setTiles(Array(9).fill(true));
    }
  };

  return (
    <div className="space-y-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
        <span className="font-bold text-white">Unmask & Guess the Subject</span>
        <span className="font-mono text-cyan-400">Score: {score} pts</span>
      </div>

      <div className="max-w-[240px] mx-auto grid grid-cols-3 gap-1 aspect-square bg-slate-900 p-1 rounded-xl border border-slate-800 relative overflow-hidden">
        {/* Underneath image content */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-300 p-4">
          <div className="text-center space-y-1">
            <Code2 className="w-12 h-12 text-cyan-400 mx-auto" />
            <div className="text-xs font-bold text-white">Developer Laptop</div>
          </div>
        </div>

        {/* Masking tiles */}
        {tiles.map((isRevealed, idx) => (
          <button
            key={idx}
            onClick={() => revealTile(idx)}
            className={`z-10 rounded transition-all ${
              isRevealed ? 'opacity-0 pointer-events-none' : 'bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-center'
            }`}
          >
            {!isRevealed && `?`}
          </button>
        ))}
      </div>

      {solved ? (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-semibold">
          🎉 Correct! You guessed the Developer Laptop with {score} points!
        </div>
      ) : (
        <div className="flex gap-2 max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Type your guess (e.g. laptop)..."
            value={guess}
            onChange={e => setGuess(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
          />
          <Button size="sm" variant="primary" onClick={handleGuess} actionName="Submit Game Guess">
            Guess
          </Button>
        </div>
      )}
    </div>
  );
};

// 6. Quiz Master Simulator
const QuizMasterSimulator: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = [
    {
      q: 'Which frontend library is widely praised for declarative component architecture?',
      options: ['React', 'jQuery 1.0', 'Flash Player', 'VBScript'],
      correct: 0
    },
    {
      q: 'What is the primary benefit of TypeScript over vanilla JavaScript?',
      options: ['Static type safety and compile-time error checks', 'Makes browser window larger', 'Requires no compiler', 'Disables functions'],
      correct: 0
    },
    {
      q: 'What standard currency code is used for the Nigerian Naira?',
      options: ['NGN', 'NRA', 'NGD', 'NGA'],
      correct: 0
    }
  ];

  const handleAnswer = (optionIdx: number) => {
    logAction('Quiz Master: Answer Selected', { questionIndex: currentQ, option: optionIdx });
    if (optionIdx === questions[currentQ].correct) {
      setScore(s => s + 1);
    }
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="space-y-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
        <span className="font-bold text-white">Quiz Master Trivia Engine</span>
        <span className="font-mono text-cyan-400">Score: {score}/{questions.length}</span>
      </div>

      {!finished ? (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-200">
            Question {currentQ + 1} of {questions.length}:
          </div>
          <p className="text-sm font-bold text-white font-display">
            {questions[currentQ].q}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="p-3 text-left rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:text-cyan-300 text-xs text-slate-200 transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 text-center space-y-3 bg-slate-900 rounded-xl border border-slate-800">
          <Sparkles className="w-8 h-8 text-cyan-400 mx-auto" />
          <h5 className="text-base font-bold text-white">Quiz Completed!</h5>
          <p className="text-xs text-slate-300">
            You scored {score} out of {questions.length} questions correctly!
          </p>
          <Button
            size="sm"
            variant="outline"
            actionName="Restart Quiz"
            onClick={() => {
              setCurrentQ(0);
              setScore(0);
              setFinished(false);
            }}
          >
            Restart Quiz
          </Button>
        </div>
      )}
    </div>
  );
};

// 7. CodeRush Simulator
const CodeRushSimulator: React.FC = () => {
  const [snippet, setSnippet] = useState('const calculateTotal = (price, tax) => price + tax;');
  const [input, setInput] = useState('');
  const [isMatch, setIsMatch] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val === snippet) {
      logAction('CodeRush: Code snippet completed accurately!');
      setIsMatch(true);
    }
  };

  return (
    <div className="space-y-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
        <span className="font-bold text-white">Ozero-CodeRush Prototype Mini-Challenge</span>
        <span className="text-amber-400 font-mono text-[11px]">Prototype Mode</span>
      </div>

      <div className="space-y-2 text-left">
        <div className="text-xs text-slate-400">Type the syntax snippet accurately:</div>
        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300 select-none">
          {snippet}
        </div>
        <input
          type="text"
          placeholder="Start typing the code snippet above..."
          value={input}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      {isMatch && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-semibold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Speed Target Hit! 100% Accuracy Verified.</span>
        </div>
      )}
    </div>
  );
};
