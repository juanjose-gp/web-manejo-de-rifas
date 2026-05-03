export default function CartSidebar({ cart, onRemove }) {
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

      <ul className="space-y-3">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <span className="text-sm">{item.title}</span>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-400 text-xs hover:underline"
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <button className="w-full mt-4 rounded bg-blue-500 py-2 font-semibold hover:bg-blue-600">
          CONTINUAR COMPRA
        </button>
      )}
      {cart.map((item, index) => (
        <li key={index} className="flex justify-between">
          <span>{item.title}</span>
          <button onClick={() => onRemove(index)}>✕</button>
        </li>
      ))}
    </aside>
  );
}
