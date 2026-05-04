import { useEffect, useState } from "react";
import { getAdminRaffles, toggleRaffle } from "../../api/raffles_api";
import React from "react";

export default function AdminRafflesDashboard() {
  const [raffles, setRaffles] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function load() {
      try {
        const data = await getAdminRaffles(token);
        setRaffles(data);
      } catch (err) {
        console.error("Error cargando rifas admin:", err);
      }
    }
    load();
  }, []);

  async function handleToggle(id) {
    await toggleRaffle(id, token);
    const updated = await getAdminRaffles(token);
    setRaffles(updated);
  }

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      {/* CONTENEDOR CENTRADO Y MÁS GRANDE */}
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Panel de Administración
          </h1>

          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
            Crear patrocinador
          </button>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="p-4 text-left">Rifa</th>
                <th className="p-4 text-center">Estado</th>
                <th className="p-4 text-center">% Vendido</th>
                <th className="p-4 text-center">Recaudado</th>
                <th className="p-4 text-center">Acción</th>
              </tr>
            </thead>

            <tbody>
              {raffles.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-6 text-center text-slate-500"
                  >
                    No hay rifas registradas
                  </td>
                </tr>
              )}

              {raffles.map((r) => {
                const sold = r.tickets.length;
                const percent =
                  r.total_numbers > 0
                    ? (sold / r.total_numbers) * 100
                    : 0;
                const money = sold * r.ticket_price;
                const open = expanded === r.id;

                return (
                  <React.Fragment key={r.id}>
                    {/* FILA PRINCIPAL */}
                    <tr
                      onClick={() => setExpanded(open ? null : r.id)}
                      className="border-t cursor-pointer hover:bg-slate-50"
                    >
                      <td className="p-4 text-left font-medium">
                        {r.title}
                      </td>

                      <td className="p-4 text-center">
                        {r.is_active ? (
                          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                            Activa
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                            Inactiva
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        {percent.toFixed(0)}%
                      </td>

                      <td className="p-4 text-center font-semibold">
                        ${money.toLocaleString()}
                      </td>

                      <td
                        className="p-4 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleToggle(r.id)}
                          className={`px-4 py-1 rounded text-white text-xs ${
                            r.is_active
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {r.is_active ? "Desactivar" : "Activar"}
                        </button>
                      </td>
                    </tr>

                    {/* FILA EXPANDIDA */}
                    {open && (
                      <tr className="bg-slate-50 border-t">
                        <td colSpan={5} className="p-4">
                          {r.tickets.length === 0 ? (
                            <p className="text-sm text-slate-500">
                              Sin compras registradas para esta rifa.
                            </p>
                          ) : (
                            <div>
                              <p className="text-sm font-semibold mb-2">
                                Compradores
                              </p>
                              <ul className="space-y-1 text-sm">
                                {r.tickets.map((t) => (
                                  <li key={t.id}>
                                    {t.user?.name ?? "Usuario"} – Número{" "}
                                    {t.number}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}