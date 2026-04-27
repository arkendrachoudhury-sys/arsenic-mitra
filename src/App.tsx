import React, { useState, useEffect } from 'react';
import { 
  Map as MapIcon, 
  FileText, 
  Users, 
  BookOpen, 
  Bell, 
  Search, 
  Layers, 
  Navigation,
  Activity,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import GeospatialRiskMap from './components/GeospatialRiskMap';
import RiskDashboard from './components/RiskDashboard';
import MedicalAssessor from './components/MedicalAssessor';
import ReportForm from './components/ReportForm';
import ResourceViewer from './components/ResourceViewer';

import { WEST_BENGAL_DISTRICTS, MOCK_RECORDS } from './types';

type Tab = 'map' | 'assess' | 'education' | 'social';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('map');
  const [selectedLocation, setSelectedLocation] = useState<string>(MOCK_RECORDS[0].name);
  const [selectedRecord, setSelectedRecord] = useState<any>(MOCK_RECORDS[0]);
  const [focusLocation, setFocusLocation] = useState<[number, number] | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lastSync, setLastSync] = useState(new Date());
  const [showReportForm, setShowReportForm] = useState(false);
  const [viewingResource, setViewingResource] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate silent data update without flickering
      setLastSync(new Date());
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleLocationSelect = (lat: number, lng: number) => {
    // Find nearest monitoring record
    const nearest = MOCK_RECORDS.find(r => {
      const d = Math.sqrt(Math.pow(r.lat - lat, 2) + Math.pow(r.lng - lng, 2));
      return d < 0.1; // Increased radius to ~11km for better touch/click tolerance
    });

    if (nearest) {
      setSelectedLocation(nearest.name);
      setSelectedRecord(nearest);
    } else {
      setSelectedLocation(`Site ${lat.toFixed(3)}, ${lng.toFixed(3)}`);
      setSelectedRecord(null);
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtName = e.target.value;
    const district = WEST_BENGAL_DISTRICTS.find(d => d.name === districtName);
    if (district) {
      setFocusLocation(district.center);
      // Try to find a mock record with the same name or very close to center
      const record = MOCK_RECORDS.find(r => 
        r.name.includes(districtName) || 
        Math.sqrt(Math.pow(r.lat - district.center[0], 2) + Math.pow(r.lng - district.center[1], 2)) < 0.2
      );
      
      if (record) {
        setSelectedLocation(record.name);
        setSelectedRecord(record);
      } else {
        setSelectedLocation(district.name);
        setSelectedRecord(null);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-sleek-bg text-sleek-text overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-sleek-nav border-b border-sleek-border flex items-center px-4 md:px-6 justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 md:hidden text-sleek-muted hover:text-white"
          >
            <Menu size={20} />
          </button>
          <div className="w-8 h-8 bg-sleek-blue rounded-md grid place-items-center font-black text-white shadow-lg shrink-0">
            As
          </div>
          <h1 className="text-base md:text-lg font-semibold tracking-tight truncate">
            AQUA-SENSE <span className="font-light text-sleek-muted hidden xs:inline">West Bengal</span>
          </h1>
        </div>
        
        <div className="flex gap-2 md:gap-4 items-center">
          <div className="pill bg-sleek-border flex items-center gap-1.5 md:gap-2 text-sleek-text py-1 md:py-1.5 px-2 md:px-3">
            <span className="w-1.5 h-1.5 bg-arsenic-safe rounded-full animate-pulse" />
            <span className="text-[9px] md:text-[10px]">Synced {lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>
          <button className="text-sleek-muted hover:text-white transition-colors">
            <Bell size={18} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar - Mobile Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className={`absolute md:relative z-40 w-[280px] h-full bg-sleek-nav border-r border-sleek-border p-4 flex flex-col gap-4 shrink-0 overflow-y-auto custom-scrollbar shadow-2xl md:shadow-none`}
            >
              <div className="flex items-center justify-between md:hidden mb-4">
                <span className="text-xs font-bold text-sleek-blue uppercase tracking-widest">Navigator</span>
                <button onClick={() => setIsSidebarOpen(false)} className="text-sleek-muted">
                  <X size={20} />
                </button>
              </div>

              <div className="text-[11px] font-bold text-sleek-muted uppercase tracking-[0.1em] mb-1">Regional Layers</div>
              
              <nav className="space-y-1">
                <NavButton 
                  active={activeTab === 'map'} 
                  onClick={() => { setActiveTab('map'); if (window.innerWidth < 768) setIsSidebarOpen(false); }}
                  icon={<MapIcon size={18} />}
                  label="Spatial Analysis Map"
                />
                <NavButton 
                  active={activeTab === 'assess'} 
                  onClick={() => { setActiveTab('assess'); if (window.innerWidth < 768) setIsSidebarOpen(false); }}
                  icon={<Activity size={18} />}
                  label="Clinical Narrative Engine"
                />
                <NavButton 
                  active={activeTab === 'education'} 
                  onClick={() => { setActiveTab('education'); if (window.innerWidth < 768) setIsSidebarOpen(false); }}
                  icon={<BookOpen size={18} />}
                  label="Public Health Resources"
                />
              </nav>

              <div className="card mt-2">
                <div className="text-[12px] font-semibold mb-3">District Focus</div>
                <select 
                  onChange={handleDistrictChange}
                  className="w-full bg-sleek-nav border border-sleek-border text-white p-2 rounded text-xs outline-none focus:border-sleek-blue"
                >
                  <option value="">Select District...</option>
                  {WEST_BENGAL_DISTRICTS.map(d => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="card">
                 <div className="text-[12px] font-semibold mb-2">Model Confidence</div>
                 <div className="h-1 bg-sleek-border rounded-full overflow-hidden">
                   <div className="h-full bg-sleek-blue w-[84%]" />
                 </div>
                 <div className="flex justify-between text-[10px] mt-2 text-sleek-muted">
                   <span>Global Uncertainty</span>
                   <span>± 4.2%</span>
                 </div>
              </div>

              <button className="btn-primary mt-auto flex items-center justify-center gap-2">
                 <BookOpen size={14} />
                 Resources
              </button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <main className="flex-1 relative bg-[#020617] overflow-hidden flex flex-col md:flex-row">
          <AnimatePresence mode="wait">
            {activeTab === 'map' ? (
              <motion.div 
                key="map-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col lg:flex-row relative"
              >
                <div className="flex-1 relative">
                  <GeospatialRiskMap userLocation={focusLocation} onLocationSelect={handleLocationSelect} />
                  <div className="absolute top-4 left-4 z-[1000] card bg-slate-950/90 backdrop-blur-sm border-sleek-blue/30 max-w-[200px] shadow-2xl">
                    <div className="text-[10px] font-bold text-sleek-blue uppercase mb-1">Target Monitoring</div>
                    <div className="text-[12px] font-bold truncate">{selectedLocation}</div>
                  </div>
                </div>

                {/* Details Panel - Mobile Bottom Sheet / Desktop Sidebar */}
                <aside className="h-[40%] lg:h-full lg:w-[320px] bg-sleek-nav border-t lg:border-t-0 lg:border-l border-sleek-border p-4 flex flex-col gap-4 shrink-0 overflow-y-auto custom-scrollbar z-10 shadow-2xl">
                  <div className="text-[11px] font-bold text-sleek-muted uppercase tracking-[0.1em] mb-1">Point Insight</div>
                  <RiskDashboard locationName={selectedLocation} initialData={selectedRecord} />
                  
                  <div className="grid grid-cols-2 gap-2 mt-4 pb-2">
                    <button className="card hover:border-sleek-blue flex flex-col items-center justify-center gap-2 py-3 bg-sleek-nav">
                       <span className="text-xl">📸</span>
                       <span className="text-[9px] font-bold uppercase">SCAN LAB</span>
                    </button>
                    <button 
                      onClick={() => setShowReportForm(true)}
                      className="card hover:border-sleek-blue flex flex-col items-center justify-center gap-2 py-3 bg-sleek-nav"
                    >
                       <span className="text-xl">⚠️</span>
                       <span className="text-[9px] font-bold uppercase">REPORT SITE</span>
                    </button>
                  </div>
                </aside>

                {/* Report Form Modal Overlay */}
                <AnimatePresence>
                  {showReportForm && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-[2000] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="w-full max-w-md bg-sleek-bg border border-sleek-border rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                      >
                        <ReportForm onClose={() => setShowReportForm(false)} />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                key="other-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-full overflow-y-auto custom-scrollbar"
              >
                {activeTab === 'assess' && <MedicalAssessor />}
                {activeTab === 'education' && (
                  <div className="p-10 max-w-5xl mx-auto space-y-10">
                     <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">Public Health Compendium</h2>
                        <p className="text-sleek-muted text-sm">Actionable mitigation strategies for West Bengal basins.</p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <EduCard 
                          title="Arsenicosis Identification" 
                          content="Visual guides for detecting primary skin manifestations." 
                          onClick={() => setViewingResource("Arsenicosis Identification")}
                        />
                        <EduCard 
                          title="Deep Aquifer Safety" 
                          content="Technical specs for Nabadwip borehole depths." 
                          onClick={() => setViewingResource("Deep Aquifer Safety")}
                        />
                     </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Resource Viewer Modal Overlay */}
          <AnimatePresence>
            {viewingResource && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[3000] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center sm:p-4"
              >
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 30 }}
                  className="w-full h-full max-w-6xl md:max-h-[85vh] bg-sleek-bg border border-white/10 rounded-none sm:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
                >
                  <ResourceViewer title={viewingResource} onClose={() => setViewingResource(null)} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="h-10 bg-sleek-bg border-t border-sleek-border flex items-center px-6 justify-between text-[11px] text-sleek-muted tracking-wide shrink-0">
        <div>DATA SOURCES: CGWB (2022), PHED WEST BENGAL (2023), NRDWP REPOSITORY</div>
        <div className="uppercase">Statistic Inference Platform • Incipient Real-time Detection Engine</div>
      </footer>
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-sm
        ${active ? 'bg-sleek-blue text-white shadow-md' : 'text-sleek-muted hover:bg-sleek-border/30 hover:text-white'}`}
    >
      <div className={active ? 'text-white' : 'text-sleek-muted'}>
        {icon}
      </div>
      <span className="whitespace-nowrap font-medium">{label}</span>
    </button>
  );
}

function EduCard({ title, content, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="card hover:border-sleek-blue group cursor-pointer"
    >
       <div className="w-10 h-10 bg-sleek-nav rounded-lg mb-3 flex items-center justify-center group-hover:scale-110 transition-transform border border-sleek-border">
          <BookOpen className="text-sleek-blue" size={20} />
       </div>
       <h3 className="font-bold text-sm mb-1">{title}</h3>
       <p className="text-[11px] text-sleek-muted leading-relaxed">{content}</p>
       <button className="mt-3 text-[9px] font-bold uppercase tracking-widest text-sleek-blue opacity-50 group-hover:opacity-100 transition-opacity">Technical Brief →</button>
    </div>
  );
}
