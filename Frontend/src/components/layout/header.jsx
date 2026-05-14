import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import logo from "../../assets/logo_rivo.png";

export default function Header({
  cartCount = 0,
  onCartClick,
  showSearchButton = true,
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="flex items-center px-4 sm:px-6 lg:px-10 h-20 backdrop-blur text-white">
          {/* HAMBURGUESA (solo mobile si hay acciones) */}
          {showSearchButton && (
            <button
              className="lg:hidden mr-3"
              onClick={() => setMenuOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center flex-1 justify-center lg:justify-start"
          >
            <img src={logo} alt="RIVO" className="w-32 lg:w-48" />
          </Link>

          {/* DESKTOP ACTIONS */}
          {showSearchButton && (
            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => navigate("/buscar_boletas")}
                className="h-10 px-4 rounded bg-blue-500 hover:bg-blue-600"
              >
                Busca tus números
              </button>

              <Link to="/login">
                <UserIcon className="h-6 w-6" />
              </Link>

              <button onClick={onCartClick} className="relative">
                <ShoppingBagIcon className="h-7 w-7" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* BOTÓN MOBILE BUSCAR */}
          {showSearchButton && (
            <button
              onClick={() => navigate("/buscar_boletas")}
              className="lg:hidden h-9 px-3 rounded bg-blue-500"
            >
              Buscar #
            </button>
          )}
        </div>
      </header>

      {/* MENÚ MOBILE */}
      {menuOpen && showSearchButton && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setMenuOpen(false)}
          />

          {/* DRAWER */}
          <div className="relative z-50 bg-black text-white h-full w-72 p-10">
            <button onClick={() => setMenuOpen(false)} className="mb-8">
              <XMarkIcon className="h-6 w-6" />
            </button>

            <nav className="flex flex-col gap-6">
              <button></button>

              {/* CARRITO */}
              <button
                onClick={() => {
                  onCartClick();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                <span>Carrito ({cartCount})</span>
              </button>

              {/* LOGIN */}
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left"
              >
                <UserIcon className="h-5 w-5" />
                <span>Iniciar sesión</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
