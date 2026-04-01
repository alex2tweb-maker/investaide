import { useState, useEffect, FormEvent } from "react";
import { Webinar, Conseiller } from "../types";
import { Lock, LayoutDashboard, Users, ExternalLink, Calendar, ShieldAlert, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<'webinars' | 'conseillers'>('webinars');
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [conseillers, setConseillers] = useState<Conseiller[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === "admin1234") {
      setIsAuthenticated(true);
      fetchAdminData();
    } else {
      setError("Mot de passe incorrect");
    }
  };

  async function fetchAdminData() {
    setLoading(true);
    try {
      const [webinarsRes, conseillersRes] = await Promise.all([
        fetch("/api/webinars"),
        fetch("/api/conseillers")
      ]);
      const webinarsData = await webinarsRes.json();
      const conseillersData = await conseillersRes.json();
      setWebinars(webinarsData.records || []);
      setConseillers(conseillersData.records || []);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-blue-950 text-center mb-2">Espace Administration</h1>
          <p className="text-slate-500 text-center mb-8 text-sm">Veuillez saisir votre mot de passe pour accéder à la gestion.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Mot de passe</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs font-bold ml-1">{error}</p>}
            <button className="w-full py-4 bg-blue-950 text-white rounded-xl font-bold hover:bg-blue-900 transition-all active:scale-[0.98] shadow-lg shadow-blue-950/20">
              Se connecter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">Tableau de Bord</h1>
          <p className="text-slate-500">Gérez vos webinaires et vos conseillers Invest'aide.</p>
          <div className="mt-2">
            <Link 
              to="/admin/check" 
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Activity size={14} />
              Vérifier la connexion Airtable
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {activeTab === 'webinars' ? (
            <a 
              href="https://airtable.com/appMygdNfMb2CaYO6/pagHpgbNNIpzbz4a4/edit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
            >
              <ExternalLink size={20} />
              Gérer les webinaires
            </a>
          ) : (
            <a 
              href="https://airtable.com/appMygdNfMb2CaYO6/pagdG7tbhT0ipiEGo/edit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            >
              <Users size={20} />
              Ajouter un conseiller
            </a>
          )}
          
          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            <button 
              onClick={() => setActiveTab('webinars')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'webinars' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutDashboard size={18} />
              Webinaires
            </button>
            <button 
              onClick={() => setActiveTab('conseillers')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'conseillers' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Users size={18} />
              Conseillers
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'webinars' ? (
          <motion.div 
            key="webinars"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Aperçu</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Nom Séminaire</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date & Heure</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">ID Event</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {webinars.filter(w => w.fields.etat === 'lancé' || w.fields.etat === 'en prépa').map((w) => (
                    <tr key={w.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-5">
                        <img 
                          src={w.fields.conversion_lien_img} 
                          className="w-12 h-12 rounded-lg object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-bold text-blue-950">{w.fields.nom_event}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <Calendar size={14} />
                          {new Date(w.fields.date_event).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          w.fields.etat === 'lancé' ? 'bg-emerald-50 text-emerald-600' : 
                          w.fields.etat === 'en prépa' ? 'bg-amber-50 text-amber-600' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {w.fields.etat || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">
                          {w.fields.id_seminaire_event}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="conseillers"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Conseiller</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {conseillers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {c.fields.prenom_conseil?.[0] || ""}{c.fields.nom_conseil?.[0] || ""}
                          </div>
                          <span className="font-bold text-blue-950">{c.fields.prenom_conseil} {c.fields.nom_conseil}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-slate-600 text-sm">{c.fields.mail_conseil}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
