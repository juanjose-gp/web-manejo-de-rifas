import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RafflesGrid from "../components/raffles/raffles_grid";
import CartDrawer from "../components/cart/cart_drawer";
import Header from "../components/layout/header";
import Footer from "../components/layout/Footer";
import DarkGradientLayout from "../components/layout/background";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  function handleBuy(raffle) {
    // RIFA DE 100 → selección de números
    if (raffle.total_numbers === 100) {
      navigate(`/rifas/${raffle.id}/seleccionar_numeros`, {
        state: { raffle },
      });
      return;
    }

    // RIFA DE 1000 → carrito
    setCart((prev) => [...prev, raffle]);
    setCartOpen(true);
  }

  return (
    <DarkGradientLayout>
      {/* ✅ CONTENEDOR PRINCIPAL */}
      <div className="min-h-screen flex flex-col">
        <Header />

        {/* ✅ CONTENIDO QUE EMPUJA EL FOOTER */}
        <main className="flex-grow px-12 py-24">
          <RafflesGrid onBuy={handleBuy} />
        </main>

        {/* ✅ FOOTER PEGADO ABAJO */}
        <Footer />

        <CartDrawer
          open={cartOpen}
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={(i) =>
            setCart((prev) => prev.filter((_, index) => index !== i))
          }
        />
      </div>
    </DarkGradientLayout>
  );
}