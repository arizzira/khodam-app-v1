import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import BlurText from './BlurText'; 
import SplitText from "./SplitText";
import LiquidEther from './LiquidEther'; // Import Component Background

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
    {/* PERBAIKAN: px-4 untuk HP, md:px-6 untuk Laptop */}
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-900 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
          <span className="text-white font-bold text-lg font-serif">K</span>
        </div>
        <h1 className="font-bold text-lg md:text-xl tracking-wider text-white">KHODAM KONOHA</h1>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="w-full py-6 md:py-8 bg-black/80 backdrop-blur-sm text-zinc-600 text-center text-[10px] md:text-xs mt-auto border-t border-white/5 relative z-10 px-4">
    <p>&copy; 2026 Cek Khodam Pengurus KONOHA. Dibuat untuk hiburan semata.</p>
  </footer>
);

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

// --- MAIN APP ---

function App() {
  const [view, setView] = useState('home'); 
  const [formData, setFormData] = useState({ nama: '', tglLahir: '', hobby: '' });
  const [result, setResult] = useState(null);

  const API_URL = 'https://khodam-api-sigma.vercel.app';

  const handleStart = () => setView('form');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setView('loading');
    
    try {
      const response = await axios.post(API_URL, formData);
      setTimeout(() => {
        setResult(response.data.data.khodam); 
        setView('result');
      }, 2500);
    } catch (error) {
      console.error(error);
      alert("Gagal terhubung ke dukun digital (Server Error).");
      setView('form');
    }
  };

  const handleRetry = () => {
    setFormData({ nama: '', tglLahir: '', hobby: '' });
    setResult(null);
    setView('home');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-black text-zinc-100 selection:bg-red-900 selection:text-white overflow-hidden relative">
      
      {/* --- BACKGROUND ANIMATION LAYER --- */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <LiquidEther 
            colors={['#09090b', '#450a0a', '#7f1d1d']} 
            mouseForce={30} 
            viscous={20}
            autoDemo={true}
            autoSpeed={0.3}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      </div>

      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-4 pt-20 md:pt-24 relative z-10">
        
        <AnimatePresence mode='wait'>
          
          {/* VIEW: HOME */}
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl flex flex-col items-center w-full"
            >
              <div className="mb-8 md:mb-12 relative flex flex-col items-center w-full px-2">
                <span className="inline-block px-4 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] text-red-500 uppercase border border-red-900/50 bg-red-950/40 backdrop-blur-md rounded-full">
                  cari khodamu
                </span>
                
                {/* PERBAIKAN: text-5xl di HP, text-8xl di Desktop. max-w full agar tidak terpotong */}
                <BlurText
                  text="CEK KHODAM"
                  delay={150}
                  animateBy="letters"
                  direction="top"
                  className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-tight mb-2 justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] w-full break-words"
                />
                
                {/* PERBAIKAN: text-2xl di HP */}
                <SplitText
                  text="MERAH PUTIH"
                  className="text-2xl sm:text-4xl md:text-5xl font-black text-red-600 justify-center drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] mt-2"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  onLetterAnimationComplete={handleAnimationComplete}
                />
                
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 1 }}
                  className="text-sm md:text-xl text-zinc-300 mt-6 md:mt-8 mb-8 md:mb-10 max-w-lg mx-auto leading-relaxed drop-shadow-md px-4"
                >
                 mengungkap entitas khodam pengurus konaha yang tersembunyi dibalik tubuh kamu
                </motion.p>

                <button 
                  onClick={handleStart}
                  className="group relative inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 text-sm md:text-base font-bold text-white transition-all duration-300 bg-red-700/80 backdrop-blur-sm border border-red-600 rounded-full hover:bg-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] active:scale-95"
                >
                  MULAI PENGECEKAN
                </button>
              </div>

              {/* Fitur Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-8 border-t border-white/10 pt-8 md:pt-10 w-full">
                {[
                  { title: "Identitas", desc: "Input nama & data lahir." },
                  { title: "Ritual Digital", desc: "Proses scanning aura." },
                  { title: "Manifestasi", desc: "Hasil khodam muncul." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 md:p-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl hover:border-red-900/50 transition duration-300 hover:bg-zinc-900/60 text-left md:text-center flex md:block items-center gap-4 md:gap-0">
                    <div className="text-red-500 font-serif text-xl md:text-2xl font-bold md:mb-2 bg-red-900/10 md:bg-transparent w-10 h-10 md:w-auto md:h-auto rounded-full flex items-center justify-center">0{idx + 1}</div>
                    <div>
                      <h3 className="font-bold text-white mb-1 text-sm md:text-base">{item.title}</h3>
                      <p className="text-xs md:text-sm text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* VIEW: FORM */}
          {view === 'form' && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full max-w-md bg-zinc-900/60 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative"
            >
               <button onClick={() => setView('home')} className="absolute top-4 right-4 md:top-6 md:right-6 text-zinc-400 hover:text-white transition">✕</button>
              
              <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-white tracking-wide drop-shadow-lg">DATA RITUAL</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Nama Lengkap</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Nama target..."
                    className="w-full px-4 py-3 md:py-4 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition text-sm"
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Tanggal Lahir</label>
                  <input 
                    required
                    type="date" 
                    className="w-full px-4 py-3 md:py-4 bg-black/40 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition [color-scheme:dark] text-sm"
                    value={formData.tglLahir}
                    onChange={(e) => setFormData({...formData, tglLahir: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Hobby</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Kegiatan favorit..."
                    className="w-full px-4 py-3 md:py-4 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition text-sm"
                    value={formData.hobby}
                    onChange={(e) => setFormData({...formData, hobby: e.target.value})}
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full mt-2 bg-white/90 text-black py-3 md:py-4 rounded-xl font-bold hover:bg-white transition active:scale-95 tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.3)] text-sm md:text-base"
                >
                  PANGGIL KHODAM
                </button>
              </form>
            </motion.div>
          )}

          {/* VIEW: LOADING */}
          {view === 'loading' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8">
                <motion.div 
                  className="absolute inset-0 border border-zinc-600/50 rounded-full"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <motion.div 
                  className="absolute inset-2 border-2 border-transparent border-t-red-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white tracking-[0.2em] animate-pulse">MENEMBUS DIMENSI...</h3>
              <p className="text-zinc-400 text-xs md:text-sm mt-3 font-mono">Scanning: {formData.nama}</p>
            </motion.div>
          )}

          {/* VIEW: RESULT */}
          {view === 'result' && result && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="w-full max-w-lg px-2"
            >
              <div className="bg-zinc-900/40 p-1 rounded-3xl shadow-[0_0_50px_rgba(220,38,38,0.2)] border border-red-900/30 backdrop-blur-sm">
                <div className="bg-black/80 backdrop-blur-md rounded-[20px] p-6 md:p-8 text-center relative overflow-hidden flex flex-col items-center">
                  
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-900/30 to-transparent pointer-events-none"></div>

                  <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-6">Khodam Terdeteksi</p>
                  
                  <div className="mb-6 md:mb-8 min-h-[3rem] flex justify-center w-full">
                    {/* PERBAIKAN: text-3xl di HP, text-6xl di Desktop agar muat */}
                    <BlurText
                      text={result.nama}
                      delay={100}
                      animateBy="letters"
                      direction="bottom"
                      className="text-3xl sm:text-4xl md:text-6xl font-black text-white uppercase leading-tight text-center justify-center drop-shadow-[0_0_25px_rgba(220,38,38,1)]"
                    />
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-zinc-900/50 p-4 md:p-6 rounded-xl border border-white/5 mb-6 md:mb-8 relative w-full"
                  >
                    <span className="absolute top-[-10px] left-[20px] text-4xl text-red-900 font-serif">"</span>
                    <p className="text-zinc-300 italic font-serif leading-relaxed text-sm md:text-base">
                      {result.deskripsi}
                    </p>
                  </motion.div>

                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex justify-center gap-2 mb-2 md:mb-4">
                      <span className="px-4 py-1 bg-zinc-800/80 border border-zinc-700 rounded-full text-[10px] font-bold uppercase text-zinc-400">
                        Elemen: <span className="text-white">{result.elemen || "Gaib"}</span>
                      </span>
                    </div>

                    <button 
                      onClick={handleRetry}
                      className="w-full bg-red-700 text-white py-3 md:py-4 rounded-xl font-bold hover:bg-red-600 transition shadow-[0_0_20px_rgba(220,38,38,0.4)] text-sm md:text-base"
                    >
                      CARI LAGI
                    </button>
                    <p className="text-[10px] text-zinc-600 mt-2">Screenshot layar ini untuk disimpan</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;