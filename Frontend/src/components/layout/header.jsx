import { Link, useNavigate } from "react-router-dom";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo_rivo.png"; 

export default function Header({ cartCount = 0, onCartClick }) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-10 h-24  backdrop-blur text-white">


        {/* LOGO A LA IZQUIERDA */}
        <Link to="/" className="flex items-center  ">
          <img
            src={logo}
            alt="RIVAO"
            className="w-48 max-h- object-contain"
          />
        </Link>

        {/* ✅ ACCIONES A LA DERECHA */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/buscar_boletas")}
            className="
              flex items-center justify-center
              h-10 w-40 rounded
              bg-blue-500 font-semibold
              text-white hover:bg-blue-600 transition
            "
          >
            Busca tus números
          </button>

          <Link to="/login">
            <UserIcon className="h-6 w-6" />
          </Link>

          <button onClick={onCartClick} className="relative">
            <ShoppingBagIcon className="h-7 w-7" />

            {cartCount > 0 && (
              <span
                className="
                  absolute -top-2 -right-2
                  h-5 w-5 rounded-full
                  bg-red-500 text-xs
                  flex items-center justify-center
                "
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}