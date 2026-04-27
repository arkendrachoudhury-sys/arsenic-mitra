import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Download, Share2, Info, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResourceViewerProps {
  title: string;
  onClose: () => void;
}

export default function ResourceViewer({ title, onClose }: ResourceViewerProps) {
  const [page, setPage] = useState(1);
  const totalPages = title === "Arsenicosis Identification" ? 12 : 15;

  const renderPageContent = () => {
    if (title === "Arsenicosis Identification") {
      return renderArsenicosisContent(page, () => setPage(1));
    } else {
      return renderAquiferContent(page, () => setPage(1));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#020617] text-white">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0a0f1e]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sleek-blue/20 rounded-lg flex items-center justify-center border border-sleek-blue/30 text-sleek-blue shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest">{title}</h2>
            <p className="text-[10px] text-sleek-muted font-bold tracking-tight">Technical Compendium • Page {page} of {totalPages}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-sleek-muted">
            <Download size={18} />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-sleek-muted">
            <Share2 size={18} />
          </button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button onClick={onClose} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 custom-scrollbar scroll-smooth">
        <AnimatePresence mode="wait">
          <motion.div 
            key={page}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Container */}
      <div className="h-20 border-t border-white/5 bg-[#0a0f1e]/90 flex items-center justify-center px-8 relative">
        <div className="flex items-center gap-8">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="group flex flex-col items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-sleek-blue group-hover:text-white transition-all border border-white/10 group-hover:border-sleek-blue shadow-lg">
              <ChevronLeft size={20} />
            </div>
            <span className="text-[9px] font-black uppercase opacity-50">Back</span>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              // Sliding window for dots if many pages
              let dotNum = i + 1;
              if (page > 3 && totalPages > 5) dotNum = Math.min(page - 2 + i, totalPages - 4 + i);
              
              return (
                <button 
                  key={i} 
                  onClick={() => setPage(dotNum)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${page === dotNum ? 'w-8 bg-sleek-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                />
              );
            })}
          </div>

          <button 
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="group flex flex-col items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-sleek-blue group-hover:text-white transition-all border border-white/10 group-hover:border-sleek-blue shadow-lg">
              <ChevronRight size={20} />
            </div>
            <span className="text-[9px] font-black uppercase opacity-50">Next</span>
          </button>
        </div>
        
        <div className="absolute right-8 hidden md:block">
           <p className="text-[10px] font-mono text-sleek-muted">REF: WB-AS-TB-{title.split(' ')[0].toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}

function renderArsenicosisContent(page: number, onReset: () => void) {
  switch(page) {
    case 1:
      return (
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black rounded-full uppercase tracking-tighter shadow-[0_0_15px_rgba(239,68,68,0.1)]">Level 1 Orientation</span>
            <h1 className="text-5xl font-black tracking-tighter leading-none italic uppercase">Introduction to <span className="text-sleek-blue">Arsenicosis</span></h1>
            <p className="text-xl text-sleek-muted font-light leading-relaxed">
              Arsenicosis is a chronic clinical condition resulting from long-term ingestion of arsenic-contaminated water (above 50 µg/L) for a period of 6 months or more.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-colors group">
              <div className="w-10 h-10 bg-arsenic-high/20 rounded-full flex items-center justify-center text-arsenic-high mb-4 group-hover:scale-110 transition-transform">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-sm font-black uppercase mb-1">Global Context</h3>
              <p className="text-xs text-sleek-muted">The Ganga-Meghna-Brahmaputra basin represents the largest arsenic-hit region globally.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-colors group">
              <div className="w-10 h-10 bg-sleek-blue/20 rounded-full flex items-center justify-center text-sleek-blue mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-sm font-black uppercase mb-1">Mitigation Goal</h3>
              <p className="text-xs text-sleek-muted">Early detection can reverse symptoms if safe water sources are substituted immediately.</p>
            </div>
          </div>
          <div className="p-8 bg-gradient-to-br from-arsenic-high/20 to-transparent border border-arsenic-high/30 rounded-3xl">
             <h4 className="text-xs font-black text-arsenic-high uppercase mb-4 tracking-widest">Public Health Alert</h4>
             <p className="text-lg font-bold leading-tight">In Nadia and Murshidabad, over 40% of standard hand pumps tap into the contaminated upper Holocene aquifer.</p>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-8">
          <div className="space-y-2">
             <span className="text-[10px] font-black text-sleek-blue uppercase tracking-widest bg-sleek-blue/10 px-2 py-0.5 rounded">Diagnostic Criteria</span>
             <h2 className="text-3xl font-black uppercase">Primary Dermal Signs</h2>
          </div>
          <p className="text-sleek-muted">Clinical manifestations usually start with skin changes. These are the most common early-stage diagnostic markers.</p>
          
          <div className="space-y-6">
             <div className="flex gap-6 items-start p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-16 h-16 shrink-0 bg-arsenic-high/10 rounded-full border border-arsenic-high/20 flex items-center justify-center text-3xl">🌑</div>
                <div>
                   <h3 className="font-bold text-lg mb-1 underline decoration-arsenic-high decoration-2 underline-offset-4 uppercase italic">Diffuse Melanosis</h3>
                   <p className="text-sm text-sleek-muted">Uniform darkening of the skin, most prominent on the trunk, back, and palms. Often resembles a dark tan but does not fade with time or sun avoidance.</p>
                </div>
             </div>
             
             <div className="flex gap-6 items-start p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-16 h-16 shrink-0 bg-sleek-blue/10 rounded-full border border-sleek-blue/20 flex items-center justify-center text-3xl">🌨️</div>
                <div>
                   <h3 className="font-bold text-lg mb-1 underline decoration-sleek-blue decoration-2 underline-offset-4 uppercase italic">Spotted Melanosis</h3>
                   <p className="text-sm text-sleek-muted">Also known as 'Raindrop Pigmentation'. Small white or dark spots scattered across the chest, back, and abdomen. Highly characteristic of arsenic toxicity.</p>
                </div>
             </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-8">
          <h2 className="text-3xl font-black uppercase italic">Keratosis: The Hardening</h2>
          <p className="text-sleek-muted leading-relaxed">Keratosis represents a transition from mild pigmentation to structural skin changes, occurring after prolonged exposure.</p>
          
          <div className="grid grid-cols-1 gap-4">
             <div className="p-8 bg-gradient-to-r from-[#1e1b4b] to-[#0f172a] border border-white/10 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <AlertTriangle size={80} />
                </div>
                <h3 className="text-2xl font-black mb-4">Diffuse Keratosis</h3>
                <p className="text-sm text-sleek-muted mb-4">The palms and soles become thick, hard, and rough to the touch. This can lead to painful cracking and difficulty in manual labor.</p>
                <div className="flex gap-2">
                   <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold">SYMPTOMATIC</div>
                   <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-[10px] font-bold">PRE-MALIGNANT POTENTIAL</div>
                </div>
             </div>
             
             <div className="p-8 bg-gradient-to-r from-[#1e1b4b] to-[#0f172a] border border-white/10 rounded-3xl">
                <h3 className="text-2xl font-black mb-4 uppercase">Nodular Keratosis</h3>
                <p className="text-sm text-sleek-muted">Small, hard, wart-like growths appearing on the surfaces of hands and feet. These nodules are rough and can be as large as 0.5cm in diameter.</p>
             </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
           <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-sleek-blue/30 border border-white/10 animate-pulse">
              <Info size={40} />
           </div>
           <div className="space-y-2">
             <h2 className="text-2xl font-black uppercase">Detailed technical analysis</h2>
             <p className="text-sleek-muted max-w-sm">This section contains detailed epidemiological data, stratigraphic cross-sections, and specific household mitigation guides currently being peer-reviewed.</p>
           </div>
           <button 
             onClick={onReset}
             className="px-6 py-2 bg-sleek-blue rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
           >
             Return to Overview
           </button>
        </div>
      );
  }
}

function renderAquiferContent(page: number, onReset: () => void) {
  switch(page) {
    case 1:
      return (
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-sleek-blue/10 border border-sleek-blue/20 text-sleek-blue text-[10px] font-black rounded-full uppercase tracking-tighter">Hydrogeological Brief v2.4</span>
            <h1 className="text-5xl font-black tracking-tighter leading-none uppercase"><span className="text-arsenic-safe">Deep Aquifer</span> Safety <span className="opacity-30">&</span> Navigation</h1>
            <p className="text-xl text-sleek-muted font-light leading-relaxed">
              Why 200m+ is the gold standard for arsenic-safe water in the Bengal Delta.
            </p>
          </div>
          
          <div className="p-10 bg-sleek-nav border border-white/10 rounded-[32px] relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-48 h-48 bg-sleek-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-sleek-blue/10 transition-colors" />
             <h3 className="text-xs font-black text-sleek-blue uppercase mb-6 tracking-widest">Aquifer Stratigraphy</h3>
             <div className="space-y-1">
                <div className="h-4 bg-orange-950/40 rounded flex items-center px-3 border border-orange-900/30">
                  <span className="text-[8px] font-bold text-orange-400">0m - 50m: TOP SOIL / CLAY</span>
                </div>
                <div className="h-12 bg-arsenic-high/20 rounded flex items-center px-3 border border-arsenic-high/30 justify-between">
                  <span className="text-[8px] font-bold text-arsenic-high uppercase">50m - 120m: UNCONFINED AQUIFER (HIGH ARSENIC)</span>
                  <AlertTriangle className="text-arsenic-high" size={12} />
                </div>
                <div className="h-6 bg-slate-800/80 rounded flex items-center px-3 border border-slate-700/50">
                  <span className="text-[8px] font-bold text-slate-400">120m - 180m: IMPERMEABLE CLAY SEAL (THE BARRIER)</span>
                </div>
                <div className="h-16 bg-arsenic-safe/20 rounded flex items-center px-3 border border-arsenic-safe/30 justify-between">
                  <span className="text-[8px] font-bold text-arsenic-safe uppercase underline decoration-arsenic-safe/50">180m - 300m+: DEEP PLEISTOCENE AQUIFER (SAFE)</span>
                  <div className="flex gap-1">
                     <div className="w-1 h-8 bg-arsenic-safe/40 rounded-full" />
                     <div className="w-1 h-8 bg-arsenic-safe/20 rounded-full" />
                  </div>
                </div>
             </div>
             <p className="text-[10px] text-sleek-muted mt-4 italic">*Generalized stratigraphic sequence for Nadia Central basins.</p>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-8">
          <div className="space-y-2 text-right">
             <span className="text-[10px] font-black text-arsenic-safe uppercase tracking-widest bg-arsenic-safe/10 px-2 py-0.5 rounded">Technical Compliance</span>
             <h2 className="text-3xl font-black uppercase italic">Borehole Integrity</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="md:col-span-2 space-y-6">
                <p className="text-sleek-muted leading-relaxed">Safety is not just about depth; it's about the **Borehole Seal**. If an deep well is not sealed correctly, arsenic-rich water from the upper layers can leak down through the annular space.</p>
                
                <div className="space-y-4">
                   <div className="p-5 border-l-4 border-sleek-blue bg-white/5 rounded-r-xl">
                      <h4 className="text-xs font-bold uppercase mb-1">Step 1: Double Casing</h4>
                      <p className="text-xs text-sleek-muted">Use 150mm PVC for the first 100m, followed by a reducer to 100mm for the deep screen.</p>
                   </div>
                   <div className="p-5 border-l-4 border-arsenic-safe bg-white/5 rounded-r-xl">
                      <h4 className="text-xs font-bold uppercase mb-1">Step 2: Grouting</h4>
                      <p className="text-xs text-sleek-muted">The space around the pipe MUST be filled with a bentonite-cement slurry at the clay-seal level.</p>
                   </div>
                </div>
             </div>
             <div className="bg-gradient-to-b from-slate-900 to-black p-6 rounded-3xl border border-white/5 flex flex-col justify-center items-center text-center">
                <div className="text-4xl mb-4 font-black text-arsenic-safe tracking-tighter">99.8%</div>
                <p className="text-[10px] font-bold uppercase text-sleek-muted leading-tight">Reliability score of deep wells in the Kalyani-Nabadwip belt when grouted to PHED standards.</p>
             </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-8">
          <h2 className="text-3xl font-black uppercase">Deep Well Maintenance</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="card border-sleek-border/30 bg-[#0c1222]">
              <div className="text-arsenic-high mb-3"><AlertTriangle size={24} /></div>
              <h4 className="font-bold text-xs uppercase mb-2">Red Flag: Salinity</h4>
              <p className="text-[10px] text-sleek-muted">If water becomes salty, it may indicate a breach in the casing or over-extraction during peak summer months.</p>
            </div>
            
            <div className="card border-sleek-border/30 bg-[#0c1222]">
              <div className="text-sleek-blue mb-3"><Download size={24} /></div>
              <h4 className="font-bold text-xs uppercase mb-2">Quarterly Testing</h4>
              <p className="text-[10px] text-sleek-muted">Even deep wells require testing twice a year during the 'Sync' window (Jan/July) to monitor for lateral migration.</p>
            </div>
          </div>

          <div className="p-6 bg-sleek-blue/5 border border-sleek-blue/20 rounded-2xl">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-sleek-blue/20 rounded-lg text-sleek-blue"><Info size={16} /></div>
                <h4 className="text-[10px] font-black uppercase tracking-widest">Hydraulic Loading</h4>
             </div>
             <p className="text-sm text-sleek-muted font-medium">Excessive pumping of high-capacity irrigation wells near deep drinking water wells can induce 'downward leakage'—pulling arsenic from shallow layers into deep safe zones.</p>
          </div>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
           <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-sleek-blue/30 border border-white/10">
              <ShieldCheck size={40} />
           </div>
           <div className="space-y-2">
             <h2 className="text-2xl font-black uppercase">Deep Aquifer Mapping</h2>
             <p className="text-sleek-muted max-w-sm">This module covers 3D geospatial cross-sections for the Bhagirathi river basin. Please ensure your device supports WebGL rendering for the interactive models on pages 12-14.</p>
           </div>
           <button 
             onClick={onReset}
             className="px-6 py-2 bg-sleek-blue rounded-full text-xs font-bold uppercase tracking-widest"
           >
             Go to Start
           </button>
        </div>
      );
  }
}
