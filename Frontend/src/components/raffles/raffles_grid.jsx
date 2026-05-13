import { useEffect, useState } from "react";
import { get_raffles } from "../../api/raffles_api";
import RaffleCard from "./raffles_card";

export default function RafflesGrid({ onBuy, raffle }) {
  const [raffles, set_raffles] = useState([]);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState(null);

  useEffect(() => {
    get_raffles()
      .then(set_raffles)
      .catch((err) => set_error(err.message))
      .finally(() => set_loading(false));
  }, []);

  if (loading) return <p className="text-slate-300">Cargando rifas...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;
  if (raffles.length === 0)
    return <p className="text-slate-300">No hay rifas disponibles.</p>;

  return (
    <div className="flex justify-center">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {raffles.map((raffle) => (
          <RaffleCard key={raffle.id} raffle={raffle} onBuy={onBuy} />
        ))}
      </div>
    </div>
  );
}
