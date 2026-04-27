import React, { useState } from 'react';
import { Camera, FileText, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { generateMedicalNarrative } from '@/src/lib/gemini';
import { motion, AnimatePresence } from 'motion/react';

export default function MedicalAssessor() {
  const [image, setImage] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [narrative, setNarrative] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const processAssessment = async () => {
    setLoading(true);
    try {
      const res = await generateMedicalNarrative(
        image ? "Uploaded skin lesion image" : "No image provided",
        symptoms
      );
      setNarrative(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-8 h-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2 tracking-tight">
          <FileText className="text-sleek-blue" />
          Clinical Narrative Engine
        </h2>
        <div className="pill bg-arsenic-high/10 text-arsenic-high px-3 py-1 border border-arsenic-high/20">
          Inference Tool Only
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="relative group">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              className="hidden" 
              id="lesion-upload"
            />
            <label 
              htmlFor="lesion-upload"
              className={`flex flex-col items-center justify-center aspect-video rounded-lg border border-sleek-border bg-sleek-nav transition-all cursor-pointer overflow-hidden
                ${image ? 'border-sleek-blue' : 'hover:border-sleek-blue hover:bg-slate-800'}`}
            >
              {image ? (
                <img src={image} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="text-center space-y-2">
                  <Camera className="w-8 h-8 mx-auto text-sleek-muted group-hover:text-sleek-blue" />
                  <p className="text-xs text-sleek-muted">Scan Lab Report or Lesion Site</p>
                </div>
              )}
            </label>
            {image && (
              <button 
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 p-1.5 bg-sleek-bg/80 rounded-md text-white hover:bg-arsenic-high"
              >
                ✕
              </button>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-sleek-muted uppercase tracking-widest">Symptom Log</label>
            <textarea
              className="w-full bg-sleek-nav border border-sleek-border rounded-lg p-3 focus:border-sleek-blue outline-none min-h-[140px] text-sm text-sleek-text resize-none"
              placeholder="Record pigmentation changes, keratosis location, or known groundwater concentration..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>

          <button 
            onClick={processAssessment}
            disabled={loading || (!image && !symptoms)}
            className="btn-primary w-full flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Sparkles size={16} />
                Generate Medical Narrative
              </>
            )}
          </button>
        </div>

        <div className="card bg-sleek-nav relative flex flex-col min-h-[400px]">
          <div className="border-b border-sleek-border pb-3 mb-4 flex items-center justify-between">
            <span className="text-[10px] font-bold text-sleek-blue uppercase tracking-widest flex items-center gap-2">
               <FileText size={12} />
               Inferred Clinical Protocol
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {narrative ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="text-xs text-sleek-text leading-relaxed whitespace-pre-line font-medium opacity-90">
                    {narrative}
                  </div>
                  <div className="mt-8 p-3 bg-sleek-bg rounded border border-sleek-border text-[9px] text-sleek-muted leading-tight">
                    <b>DISCLAIMER:</b> This narrative is generated based on statistical risk clusters and user-stated symptoms. Must be reviewed by a licensed physician via formal hair/nail toxicology.
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-3">
                  <FileText size={32} />
                  <p className="text-xs max-w-[200px]">Input patient data to generate an exportable clinical narrative.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
