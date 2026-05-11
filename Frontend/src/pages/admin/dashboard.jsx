import { useEffect, useState } from "react";
import { getAdminRaffles, toggleRaffle } from "../../api/raffles_api";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function AdminRafflesDashboard() {
  const [raffles, setRaffles] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
  }, [token]);

  async function handleToggle(id) {
    await toggleRaffle(id, token);
    const updated = await getAdminRaffles(token);
    setRaffles(updated);
  }

  return (
    <div className="bg-slate-100 min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Panel de Administración
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin/crear_patrocinador")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
            >
              Crear patrocinador
            </button>

            <button
              onClick={() => navigate("/admin/crear_rifa")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
            >
              Crear rifa
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-sm">
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
                {raffles.map((r) => {
                  const sold =
                    r.purchases?.reduce(
                      (acc, p) => acc + p.tickets.length,
                      0,
                    ) || 0;

                  const percent =
                    r.total_numbers > 0 ? (sold / r.total_numbers) * 100 : 0;

                  const money = sold * r.ticket_price;
                  const open = expanded === r.id;

                  return (
                    <React.Fragment key={r.id}>
                      <tr
                        onClick={() => setExpanded(open ? null : r.id)}
                        className="border-t cursor-pointer hover:bg-slate-50"
                      >
                        <td className="p-4 font-medium">{r.title}</td>

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
                            {!r.purchases || r.purchases.length === 0 ? (
                              <p className="text-sm text-slate-500">
                                Sin compras registradas.
                              </p>
                            ) : (
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="text-slate-600">
                                    <th className="text-left py-2">
                                      Comprador
                                    </th>
                                    <th className="text-left py-2">Teléfono</th>
                                    <th className="text-left py-2">Números</th>
                                    <th className="text-left py-2">
                                      Descuento
                                    </th>
                                    <th className="text-left py-2">
                                      Patrocinador
                                    </th>
                                    <th className="text-left py-2">Código</th>
                                    <th className="text-left py-2">Vence</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {r.purchases.map((p) => (
                                    <tr key={p.id} className="border-t">
                                      <td className="py-2">{p.buyerName}</td>

                                      <td className="py-2">{p.buyerPhone}</td>

                                      <td className="py-2">
                                        {p.tickets
                                          .map((t) =>
                                            String(t.number).padStart(3, "0"),
                                          )
                                          .join(" - ")}
                                      </td>

                                      <td className="py-2">
                                        {p.discountCode?.code ?? "—"}
                                      </td>

                                      <td className="py-2">
                                        {p.discountCode?.patrocinador ?? "—"}
                                      </td>

                                      {/* ✅ NUEVO: CÓDIGO DE VALIDACIÓN */}
                                      <td className="py-2 font-mono font-semibold text-blue-700">
                                        {p.validationCode ?? "—"}
                                      </td>

                                      {/* ✅ NUEVO: FECHA DE VENCIMIENTO */}
                                      <td className="py-2">
                                        {p.discountCode?.expiresAt
                                          ? new Date(
                                              p.discountCode.expiresAt,
                                            ).toLocaleDateString()
                                          : "—"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
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
    </div>
  );
}
