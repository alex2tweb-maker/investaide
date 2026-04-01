import { useState, useEffect } from "react";
import { Webinar, Conseiller } from "../types";
import WebinarCard from "../components/WebinarCard";
import RegistrationModal from "../components/RegistrationModal";
import { motion } from "motion/react";

export default function Home() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [conseillers, setConseillers] = useState<Conseiller[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);

  useEffect(() => {
    async function fetchData() {
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
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-16 text-center bg-blue-900 py-12 px-6 rounded-3xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Nos Webinaires Gratuits
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-blue-100 max-w-2xl mx-auto text-lg"
        >
          Découvrez nos sessions d'experts pour optimiser votre patrimoine et préparer votre avenir financier.
        </motion.p>
      </header>

      {loading ? (
        <div className="flex flex-wrap justify-center gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full max-w-sm h-[500px] bg-slate-50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {webinars.filter(w => w.fields.etat === 'lancé').map((webinar, index) => (
            <motion.div
              key={webinar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full max-w-sm"
            >
              <WebinarCard 
                webinar={webinar} 
                onRegister={() => setSelectedWebinar(webinar)} 
              />
            </motion.div>
          ))}
        </div>
      )}

      {selectedWebinar && (
        <RegistrationModal 
          webinar={selectedWebinar} 
          conseillers={conseillers}
          onClose={() => setSelectedWebinar(null)} 
        />
      )}
    </div>
  );
}
