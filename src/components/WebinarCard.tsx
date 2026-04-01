import { Webinar } from "../types";
import { Calendar, Users, Info, ArrowRight } from "lucide-react";

interface WebinarCardProps {
  webinar: Webinar;
  onRegister: () => void;
}

export default function WebinarCard({ webinar, onRegister }: WebinarCardProps) {
  const { fields } = webinar;

  return (
    <div className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={fields.conversion_lien_img || "https://picsum.photos/seed/finance/800/600"} 
          alt={fields.nom_event}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-blue-900 uppercase tracking-wider shadow-sm">
          ID: {fields.id_seminaire_event}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-blue-600 mb-3">
          <Calendar size={16} />
          <span className="text-sm font-semibold">
            {new Date(fields.date_event).toLocaleString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>

        <h3 className="text-xl font-bold text-blue-950 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
          {fields.nom_event}
        </h3>

        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Users size={16} />
          <span>{fields.max_user} participants max</span>
        </div>

        <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow">
          {fields.descript_event}
        </p>

        <button 
          onClick={onRegister}
          className="w-full py-3.5 bg-blue-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-all active:scale-[0.98]"
        >
          S'inscrire
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
