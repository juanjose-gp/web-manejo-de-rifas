import { useNavigate } from "react-router-dom";

export default function CartDrawer({
  open,
  cart,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const navigate = useNavigate();

  function handleContinue() {
    navigate("/checkout_auto", {
      state: { cart },
    });
  }

  // Total estimado
  const totalEstimado = cart.reduce(
    (acc, item) => acc + item.quantity * item.ticket_price,
    0,
  );

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}

      {/* DRAWER */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-80
          bg-blue-950 text-white
          z-50
          flex flex-col
          transform transition-transform
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="p-4 flex justify-between items-center border-b border-white/10">
          <h3 className="text-lg font-semibold">Bolsa de compra</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* CONTENIDO ( con scroll) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 && (
            <p className="text-slate-300 text-sm">No has agregado rifas.</p>
          )}

          {cart.map((item) => (
            <div key={item.id} className="bg-white/5 rounded-lg p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.title}</span>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-400 text-xs"
                >
                  Quitar
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onDecrease(item.id)}
                    className="w-7 h-7 rounded-full bg-slate-700"
                  >
                    −
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => onIncrease(item.id)}
                    className="w-7 h-7 rounded-full bg-blue-500"
                  >
                    +
                  </button>
                </div>

                <span className="text-xs text-slate-300">boletas</span>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER FIJO (total + botón) */}
        {cart.length > 0 && (
          <div className="border-t border-white/10 p-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300">Total estimado:</span>
              <span className="font-semibold">
                ${totalEstimado.toLocaleString("es-CO")} COP
              </span>
            </div>

            <button
              onClick={handleContinue}
              className="w-full rounded bg-blue-500 py-2 font-semibold"
            >
              IR A PAGAR
            </button>
          </div>
        )}
      </aside>
    </>
  );
}