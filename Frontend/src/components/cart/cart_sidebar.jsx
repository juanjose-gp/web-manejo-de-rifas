export default function CartSidebar({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <aside
      className="
        w-80
        bg-white/10
        backdrop-blur
        border border-white/10
        rounded-xl
        p-4
        text-white
        h-fit
        sticky top-24
      "
    >
      <h3 className="text-lg font-semibold mb-4">Bolsa de compra</h3>

      {cart.length === 0 && (
        <p className="text-slate-300 text-sm">No has agregado rifas.</p>
      )}

      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-2 bg-white/5 rounded-lg p-3"
          >
            {/* Título */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{item.title}</span>
              <button
                onClick={() => onRemove(item.id)}
                className="text-red-400 text-xs hover:underline"
              >
                Quitar
              </button>
            </div>

            {/* Controles de cantidad */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onDecrease(item.id)}
                  className="w-7 h-7 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                >
                  −
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => onIncrease(item.id)}
                  className="w-7 h-7 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-slate-300">boletas</span>
            </div>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <button className="w-full mt-6 rounded bg-blue-500 py-2 font-semibold hover:bg-blue-600 transition">
          CONTINUAR
        </button>
      )}
    </aside>
  );
}
