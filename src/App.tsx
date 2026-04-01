import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminCheck from "./pages/AdminCheck";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/check" element={<AdminCheck />} />
          </Routes>
        </main>
        <footer className="bg-slate-950 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Invest'aide. Tous droits réservés.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Propulsé par Webycool
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
