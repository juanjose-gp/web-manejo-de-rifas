import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} RIVAO</span>

          <div className="flex gap-4">
            <Link to="/terminos_y_condiciones" className="hover:text-white">
              Términos
            </Link>
            <Link to="/politicas_de_privacidad" className="hover:text-white">
              Privacidad
            </Link>
            <Link to="/preguntas_frecuentes" className="hover:text-white">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}