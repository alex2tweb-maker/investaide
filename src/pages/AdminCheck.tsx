import { useState, useEffect } from "react";
import { Database, CheckCircle2, XCircle, RefreshCw, ArrowLeft, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

interface CheckResult {
  status: "ok" | "error" | "pending";
  count: number;
  error: string | null;
}

interface ConnectionStatus {
  planning: CheckResult;
  conseiller: CheckResult;
}

export default function AdminCheck() {
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const checkConnection = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/check-connection");
      const data = await res.json();
      setStatus(data);
    } catch (error) {
      console.error("Check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/admin" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-900 mb-8 transition-colors">
        <ArrowLeft size={18} />
        Retour au tableau de bord
      </Link>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Database size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-950">Diagnostic Airtable</h1>
              <p className="text-slate-500 text-sm">Vérification de l'accès aux tables de la base Webycool.</p>
            </div>
          </div>
          <button 
            onClick={checkConnection}
            disabled={loading}
            className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all disabled:opacity-50"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Table Planning */}
          <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-blue-950 flex items-center gap-2">
                Table: <span className="text-blue-600">planning</span>
              </h3>
              {status?.planning.status === "ok" ? (
                <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-bold">
                  <CheckCircle2 size={18} />
                  Connecté
                </span>
              ) : status?.planning.status === "error" ? (
                <span className="flex items-center gap-1.5 text-red-600 text-sm font-bold">
                  <XCircle size={18} />
                  Erreur
                </span>
              ) : (
                <span className="text-slate-400 text-sm italic">En attente...</span>
              )}
            </div>
            
            {status?.planning.status === "ok" && (
              <p className="text-slate-600 text-sm">
                Lecture réussie. La table contient des enregistrements valides.
              </p>
            )}
            {status?.planning.error && (
              <div className="mt-2 p-3 bg-red-50 rounded-lg text-red-700 text-xs font-mono overflow-x-auto">
                {status.planning.error}
              </div>
            )}
          </div>

          {/* Table Conseiller */}
          <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-blue-950 flex items-center gap-2">
                Table: <span className="text-blue-600">conseiller</span>
              </h3>
              {status?.conseiller.status === "ok" ? (
                <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-bold">
                  <CheckCircle2 size={18} />
                  Connecté
                </span>
              ) : status?.conseiller.status === "error" ? (
                <span className="flex items-center gap-1.5 text-red-600 text-sm font-bold">
                  <XCircle size={18} />
                  Erreur
                </span>
              ) : (
                <span className="text-slate-400 text-sm italic">En attente...</span>
              )}
            </div>
            
            {status?.conseiller.status === "ok" && (
              <p className="text-slate-600 text-sm">
                Lecture réussie. La table contient des enregistrements valides.
              </p>
            )}
            {status?.conseiller.error && (
              <div className="mt-2 p-3 bg-red-50 rounded-lg text-red-700 text-xs font-mono overflow-x-auto">
                {status.conseiller.error}
              </div>
            )}
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-3 text-slate-500 text-xs">
            <ShieldAlert size={14} />
            <p>Ces tests vérifient uniquement la lecture. Les permissions d'écriture ne sont pas testées ici.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
