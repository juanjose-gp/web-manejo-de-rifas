import { Link } from 'react-router-dom';
import { ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-6 py-4 bg-blue-900/90 backdrop-blur text-white">
        <h1 className="text-xl font-bold">Rifas</h1>

        <div className="flex items-center gap-6">
          <Link to="/login">
            <UserIcon className="h-6 w-6" />
          </Link>

          <button onClick={onCartClick} className="relative">
            <ShoppingBagIcon className="h-7 w-7" />

            {cartCount > 0 && (
              <span className="
                absolute -top-2 -right-2
                h-5 w-5
                rounded-full
                bg-red-500
                text-xs
                flex items-center justify-center
              ">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}