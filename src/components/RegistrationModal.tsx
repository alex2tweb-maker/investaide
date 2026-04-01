import { useState, FormEvent, ChangeEvent } from "react";
import { Webinar, Conseiller, RegistrationFormData } from "../types";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RegistrationModalProps {
  webinar: Webinar;
  conseillers: Conseiller[];
  onClose: () => void;
}

export default function RegistrationModal({ webinar, conseillers, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({
    id_seminaire_event: webinar.fields.id_seminaire_event
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(onClose, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all z-10"
        >
          <X size={20} />
        </button>
 
        <div className="p-8">
          {status === 'success' ? (
            <div className="py-12 text-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-blue-950 mb-2">Inscription Validée !</h2>
              <p className="text-slate-600">Vous recevrez prochainement un email de confirmation.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-lg font-bold text-slate-500 mb-1">Inscription au webinaire</h2>
                <p className="text-2xl font-bold text-blue-900 leading-tight">{webinar.fields.nom_event}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Prénom</label>
                    <input 
                      required
                      name="prenom"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      placeholder="Jean"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nom</label>
                    <input 
                      required
                      name="nom"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                  <input 
                    required
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    placeholder="jean.dupont@exemple.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Téléphone</label>
                  <input 
                    required
                    type="tel"
                    name="telephone"
                    pattern="0[0-9]{9}"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    placeholder="0611223344"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Conseiller</label>
                  <select 
                    required
                    name="conseiller"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white appearance-none"
                  >
                    <option value="">Sélectionnez un conseiller</option>
                    {conseillers.map(c => (
                      <option key={c.id} value={`${c.fields.nom_conseil}`}>
                        {c.fields.prenom_conseil} {c.fields.nom_conseil}
                      </option>
                    ))}
                  </select>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium">Une erreur est survenue. Veuillez réessayer.</p>
                )}

                <button 
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-blue-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-all active:scale-[0.98] disabled:opacity-70 mt-4 shadow-lg shadow-blue-900/20"
                >
                  {status === 'submitting' ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Envoyer l'inscription"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
