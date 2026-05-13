export default function RaffleCard({ raffle, onBuy }) {
  if (!raffle) return null;

  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl
        bg-white/5 backdrop-blur
        border border-white/10
        text-white flex flex-col
        transition hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* Imagen */}
      {raffle.image_url && (
        <div className="h-64 w-full overflow-hidden bg-black/20">
          <img
            src={raffle.image_url}
            alt={raffle.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Contenido */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-base font-semibold">{raffle.title}</h3>

          {raffle.description && (
            <p className="mt-2 text-sm text-slate-300">{raffle.description}</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6">
          <p className="text-lg font-bold text-blue-400">
            ${Number(raffle.ticket_price).toLocaleString()}
          </p>

          <div className="rounded-xl bg-white/5 p-5">
            <h3>{raffle.title}</h3>

            <button
              onClick={() => {
                console.log("🛒 click comprar", raffle.id);
                onBuy(raffle);
              }}
              className="mt-3 w-full rounded bg-blue-500 py-2 text-white"
            >
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
