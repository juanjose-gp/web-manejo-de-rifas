import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RafflesGrid from "../components/raffles/raffles_grid";
import CartDrawer from "../components/cart/cart_drawer";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import DarkGradientLayout from "../components/layout/background";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  /* =========================
     AGREGAR RIFA AL CARRITO
     ========================= */
  function handleBuy(raffle) {
    // ✅ RIFA DE 100 → selección manual
    if (raffle.total_numbers === 100) {
      navigate(`/rifas/${raffle.id}/seleccionar_numeros`, {
        state: { raffle },
      });
      return;
    }

    // ✅ RIFA DE 1000 → carrito con cantidad
    setCart((prev) => {
      const existing = prev.find((item) => item.id === raffle.id);

      if (existing) {
        return prev.map((item) =>
          item.id === raffle.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: raffle.id,
          title: raffle.title,
          ticket_price: raffle.ticket_price,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  }

  /* =========================
     MANEJO DE CANTIDADES
     ========================= */
  function handleIncrease(id) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function handleDecrease(id) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemove(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <DarkGradientLayout>
      <div className="min-h-screen flex flex-col">
        {/* ✅ HEADER */}
        <Header />

        {/* ✅ CONTENIDO PRINCIPAL */}
        <main className="flex-grow px-12 py-24">
          <RafflesGrid onBuy={handleBuy} />
        </main>

        {/* ✅ FOOTER */}
        <Footer />

        {/* ✅ CART DRAWER */}
        <CartDrawer
          open={cartOpen}
          cart={cart}
          onClose={() => setCartOpen(false)}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
        />
      </div>
    </DarkGradientLayout>
  );
}