import { useState } from "react";
import DarkGradientLayout from "../components/layout/background";
import RafflesGrid from "../components/raffles/raffles_grid";
import Header from "../components/layout/header";
import CartDrawer from "../components/cart/cart_drawer";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  function addToCart(raffle) {
    //console.log(" addToCart ejecutado", raffle);
    setCart((prev) => [...prev, raffle]);
    setCartOpen(true);
  }

  return (
    <DarkGradientLayout>
      <Header cartCount={cart.length} onCartClick={() => setCartOpen(true)} />

      <section className="px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <RafflesGrid onBuy={addToCart} />
        </div>
      </section>
    
      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={(i) =>
          setCart((prev) => prev.filter((_, index) => index !== i))
        }
      />
    </DarkGradientLayout>
  );
}
