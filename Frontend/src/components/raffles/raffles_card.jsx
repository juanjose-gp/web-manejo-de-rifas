export default function RaffleCard({ raffle }) {
  return (
    <div
      className="
        relative
        rounded-2xl
        bg-white/5
        backdrop-blur
        border border-white/10
        p-5
        text-white
        flex flex-col
        justify-between
        transition
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* Contenido */}
      <div>
        <h3 className="text-base font-semibold leading-snug">
          {raffle.title}
        </h3>

        {raffle.description && (
          <p className="mt-2 text-sm text-slate-300">
            {raffle.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6">
        <p className="text-lg font-bold text-blue-400">
          ${raffle.ticket_price.toLocaleString()}
        </p>

        <button
          className="
            mt-3 w-full
            rounded-lg
            bg-blue-500
            py-2
            text-sm font-semibold
            transition
            hover:bg-blue-600
          "
        >
         COMPRAR
        </button>
      </div>
    </div>
  );
}
