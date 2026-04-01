import { Link } from "react-router-dom";
import { ShieldCheck, Home } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="https://www.invest-aide.fr/wp-content/uploads/2025/06/invest-aide-1-e1532160441644.png" 
            alt="Invest'aide Logo" 
            className="max-w-[100px] sm:max-w-[200px] h-auto w-full"
            referrerPolicy="no-referrer"
          />
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
          >
            <Home size={18} />
            <span>Accueil</span>
          </Link>
          <Link 
            to="/admin" 
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-all"
          >
            <ShieldCheck size={16} />
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
