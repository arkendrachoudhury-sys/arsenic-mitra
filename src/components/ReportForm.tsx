import React, { useState } from 'react';
import { Send, MapPin, Droplet, Camera, ShieldCheck, X } from 'lucide-react';
import { motion } from 'motion/react';

interface ReportFormProps {
  onClose: () => void;
}

export default function ReportForm({ onClose }: ReportFormProps) {
  const [formData, setFormData] = useState({
    siteName: '',
    district: 'Nadia',
    concentration: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-sleek-border bg-sleek-nav">
        <h3 className="font-bold text-sm uppercase tracking-widest flex items-center gap-2 text-sleek-blue">
          <ShieldCheck size={16} />
          Report Contamination Site
        </h3>
        <button onClick={onClose} className="p-1 hover:bg-sleek-border rounded-md text-sleek-muted transition-colors">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-sleek-muted uppercase tracking-widest">Site/Village Name</label>
          <div className="relative">
             <MapPin className="absolute left-3 top-3 text-sleek-muted" size={14} />
             <input 
               required
               className="w-full bg-sleek-nav border border-sleek-border rounded-md py-2.5 pl-10 pr-4 text-xs focus:border-sleek-blue outline-none transition-all"
               placeholder="e.g. Beldanga East Cluster"
               value={formData.siteName}
               onChange={(e) => setFormData({...formData, siteName: e.target.value})}
             />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-sleek-muted uppercase tracking-widest">District</label>
            <select 
              className="w-full bg-sleek-nav border border-sleek-border rounded-md py-2.5 px-3 text-xs focus:border-sleek-blue outline-none"
              value={formData.district}
              onChange={(e) => setFormData({...formData, district: e.target.value})}
            >
              <option>Nadia</option>
              <option>Murshidabad</option>
              <option>North 24 Parganas</option>
              <option>Malda</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-sleek-muted uppercase tracking-widest">Inferred Conc (µg/L)</label>
            <div className="relative">
               <Droplet className="absolute left-3 top-3 text-sleek-muted" size={14} />
               <input 
                 type="number"
                 className="w-full bg-sleek-nav border border-sleek-border rounded-md py-2.5 pl-10 pr-4 text-xs focus:border-sleek-blue outline-none"
                 placeholder="0-500"
                 value={formData.concentration}
                 onChange={(e) => setFormData({...formData, concentration: e.target.value})}
               />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-sleek-muted uppercase tracking-widest">Site Documentation (OCR Optional)</label>
          <div className="border-2 border-dashed border-sleek-border rounded-lg p-6 text-center hover:border-sleek-blue transition-all cursor-pointer bg-sleek-bg/50">
             <Camera className="mx-auto text-sleek-muted mb-2" size={24} />
             <p className="text-[10px] text-sleek-muted font-medium">Click to upload lab report or site image</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-sleek-muted uppercase tracking-widest">Observations</label>
          <textarea 
            className="w-full bg-sleek-nav border border-sleek-border rounded-md p-3 text-xs focus:border-sleek-blue outline-none min-h-[80px] resize-none"
            placeholder="Describe tube well condition, water color, or presence of dermal lesions in nearby population..."
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />
        </div>

        <div className="p-3 bg-sleek-blue/5 border border-sleek-blue/20 rounded-md">
          <p className="text-[9px] text-sleek-blue leading-tight uppercase font-medium">
            Submission Integrity: Data will be labeled as UNVERIFIED until validated by the District Health Sub-Center (DHSC).
          </p>
        </div>
      </form>

      <div className="p-4 border-t border-sleek-border bg-sleek-nav">
        <button 
          disabled={isSubmitting}
          onClick={handleSubmit} 
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <>
              <Send size={14} />
              Submit Ground Data
            </>
          )}
        </button>
      </div>
    </div>
  );
}
