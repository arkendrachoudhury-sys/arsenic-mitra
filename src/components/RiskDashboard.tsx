import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Droplet, Info, ShieldAlert, History } from 'lucide-react';

const MOCK_HISTORICAL = [
  { year: '2015', conc: 12 },
  { year: '2017', conc: 45 },
  { year: '2019', conc: 88 },
  { year: '2021', conc: 110 },
  { year: '2023', conc: 95 },
  { year: '2025', conc: 120 },
];

export default function RiskDashboard({ locationName = "Nadia Central", initialData = null }: { locationName: string, initialData?: any }) {
  const [realTimeValue, setRealTimeValue] = useState<number | null>(initialData?.concentration || null);
  
  useEffect(() => {
    if (initialData) {
      setRealTimeValue(initialData.concentration);
    } else {
      setRealTimeValue(null);
    }

    const interval = setInterval(() => {
      if (initialData) {
        // Simulate real-time sensor fluctuation ± 0.5
        setRealTimeValue(prev => prev !== null ? Number((prev + (Math.random() - 0.5)).toFixed(1)) : null);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [initialData]);
  
  return (
    <div className="space-y-4">
      {/* Risk Scorer */}
      <div className={`card border-l-4 ${!realTimeValue ? 'border-sleek-border' : realTimeValue > 50 ? 'border-arsenic-high' : 'border-arsenic-safe'} bg-sleek-nav shadow-md`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] font-bold text-sleek-muted uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 ${realTimeValue ? 'bg-arsenic-high animate-ping' : 'bg-sleek-muted'} rounded-full`} />
              {realTimeValue ? 'Live Sensor Stream' : 'Station Offline'}
            </p>
            <h3 className="text-xl font-bold tracking-tight">{locationName}</h3>
          </div>
          <div className="flex flex-col items-end">
             <div className={`text-2xl font-black ${realTimeValue ? (realTimeValue > 50 ? 'text-arsenic-high' : 'text-arsenic-safe') : 'text-sleek-muted'} flex items-baseline gap-1`}>
               {realTimeValue !== null ? realTimeValue : '--'}<span className="text-[10px] font-medium text-sleek-muted">µg/L</span>
             </div>
             <div className="pill risk-high mt-1 text-[9px]">{realTimeValue ? (realTimeValue > 100 ? 'Local Maxima' : 'Observed') : 'No Data'}</div>
          </div>
        </div>
        
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-[9px] font-bold text-sleek-muted uppercase">
            <span>Safe</span>
            <span>Unsafe (50+)</span>
          </div>
          <div className="h-2 w-full bg-sleek-border rounded-full overflow-hidden flex">
            {realTimeValue ? (
              <>
                <div className="h-full bg-arsenic-safe w-[10%]" />
                <div className="h-full bg-arsenic-moderate w-[15%]" />
                <div 
                  className={`h-full ${realTimeValue > 50 ? 'bg-arsenic-high' : 'bg-sleek-muted/30'} flex-1 transition-all duration-1000`} 
                  style={{ width: `${Math.min(100, realTimeValue)}%` }}
                />
              </>
            ) : (
              <div className="h-full bg-sleek-muted/20 w-full animate-pulse" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-sleek-bg p-2.5 rounded border border-sleek-border/50">
             <div className="flex items-center gap-2 text-sleek-muted mb-1">
                <ShieldAlert size={12} />
                <span className="text-[9px] font-bold uppercase">Uncertainty</span>
             </div>
             <p className="text-xs font-bold data-tag">{realTimeValue ? `± ${(realTimeValue * 0.07).toFixed(1)} µg/L` : 'N/A'}</p>
          </div>
          <div className="bg-sleek-bg p-2.5 rounded border border-sleek-border/50">
             <div className="flex items-center gap-2 text-sleek-muted mb-1">
                <Info size={12} />
                <span className="text-[9px] font-bold uppercase">Confidence</span>
             </div>
             <p className={`text-xs font-bold ${realTimeValue ? 'text-sleek-blue' : 'text-sleek-muted'}`}>
                {initialData ? `${(initialData.confidence * 100).toFixed(0)}%` : 'Low (Inferred)'}
             </p>
          </div>
        </div>

        {/* Bioremediation Info */}
        <div className={`mt-4 p-3 ${initialData?.bioremediation ? 'bg-green-500/10 border-green-500/20' : 'bg-sleek-bg border-sleek-border'} border rounded-lg`}>
           <div className={`text-[10px] font-bold ${initialData?.bioremediation ? 'text-green-500' : 'text-sleek-muted'} uppercase tracking-widest mb-1`}>Local Bioremediation</div>
           <div className="flex justify-between items-center">
              <span className="text-xs font-medium truncate pr-2 italic">
                {initialData?.bioremediation ? `Species: ${initialData.bioremediation.plantType}` : 'Monitoring target species...'}
              </span>
              <span className={`text-[10px] font-mono ${initialData?.bioremediation ? 'text-green-400 bg-green-500/10' : 'text-sleek-muted bg-sleek-border/30'} px-2 py-0.5 rounded`}>
                {initialData?.bioremediation ? 'DETECTED' : 'NOT FOUND'}
              </span>
           </div>
        </div>
      </div>

      {/* Historical Trend */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <History className="text-sleek-blue" size={16} />
          <h4 className="font-bold text-xs uppercase tracking-wider">Temporal Analysis</h4>
        </div>
        
        <div className="h-[140px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_HISTORICAL}>
              <defs>
                <linearGradient id="colorConc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="year" fontSize={9} stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis fontSize={9} stroke="#64748b" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '4px', fontSize: '10px' }}
                itemStyle={{ color: '#EF4444' }}
              />
              <Area type="monotone" dataKey="conc" stroke="#EF4444" fillOpacity={1} fill="url(#colorConc)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mitigation */}
      <div className="bg-sleek-blue/5 border border-sleek-blue/20 rounded-lg p-4">
        <h4 className="text-sleek-blue font-bold mb-3 flex items-center gap-2 text-[11px] uppercase tracking-wider">
          <Droplet size={14} />
          Immediate Action Protocol
        </h4>
        <ul className="space-y-2 text-[11px] text-sleek-muted">
          <li className="flex gap-2">
            <span className="text-sleek-blue">•</span>
            Cease domestic use of shallow aquifer sources.
          </li>
          <li className="flex gap-2">
            <span className="text-sleek-blue">•</span>
            Utilize deep tube wells ({'>'}150m) identified on map.
          </li>
        </ul>
      </div>
    </div>
  );
}
