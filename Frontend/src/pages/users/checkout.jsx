import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/Footer";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Datos recibidos desde seleccionar_numeros
  const { raffle, selectedNumbers } = location.state || {};

  // Protección básica por si se entra directo a la ruta
  if (!raffle || !selectedNumbers || selectedNumbers.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-slate-600">
            No hay información de compra disponible.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  const total = selectedNumbers.length * raffle.ticket_price;

  function handlePay() {
    // ⚠️ Aquí irá la integración real con el backend/pasarela
    console.log("✅ Ir a pagar", {
      raffleId: raffle.id,
      numbers: selectedNumbers,
      total,
    });

    // Simulación temporal
    alert("Redirigiendo a la pasarela de pago...");
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-100 px-6 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 space-y-6">
          
          <h1 className="text-2xl font-bold text-slate-800">
            Confirmar compra
          </h1>

          {/* RESUMEN DE LA RIFA */}
          <div className="space-y-2 text-slate-700">
            <p>
              <strong>Rifa:</strong> {raffle.title}
            </p>
            <p>
              <strong>Precio por número:</strong>{" "}
              ${Number(raffle.ticket_price).toLocaleString()}
            </p>
          </div>

          {/* NÚMEROS SELECCIONADOS */}
          <div>
            <h2 className="font-semibold text-slate-800 mb-2">
              Números seleccionados
            </h2>

            <div className="flex flex-wrap gap-2">
              {selectedNumbers.map((n) => (
                <span
                  key={n}
                  className="px-3 py-1 rounded bg-blue-100 text-blue-800 text-sm font-medium"
                >
                  {String(n).padStart(3, "0")}
                </span>
              ))}
            </div>
          </div>

          {/* TOTAL */}
          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-lg font-semibold text-slate-800">
              Total a pagar
            </span>
            <span className="text-xl font-bold text-green-600">
              ${total.toLocaleString()}
            </span>
          </div>

          {/* ACCIONES */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 rounded border text-slate-600 hover:bg-slate-100"
            >
              Volver
            </button>

            <button
              onClick={handlePay}
              className="px-6 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Ir a pagar
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}