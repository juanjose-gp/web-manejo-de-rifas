export default function CartDrawer({ open, cart, onClose, onRemove }) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-80
          bg-blue-950 text-white
          z-50
          transform transition-transform
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-4 flex justify-between items-center border-b border-white/10">
          <h3 className="text-lg font-semibold">Bolsa de compra</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-4 space-y-4">
          {cart.length === 0 && (
            <p className="text-slate-300 text-sm">
              No has agregado rifas.
            </p>
          )}

          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{item.title}</span>
              <button
                onClick={() => onRemove(index)}
                className="text-red-400 text-xs"
              >
                Quitar
              </button>
            </div>
          ))}

          {cart.length > 0 && (
            <button className="w-full mt-4 rounded bg-blue-500 py-2 font-semibold hover:bg-blue-600">
              CONTINUAR COMPRA
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
