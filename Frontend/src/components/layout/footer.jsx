import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-slate-900 text-gray-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-4">
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
    </footer>
  );
}
