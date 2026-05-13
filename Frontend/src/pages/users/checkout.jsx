import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/Footer";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const { raffle, selectedNumbers, selectedSticker } = location.state || {};

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
  });

  if (!raffle || !selectedNumbers || selectedNumbers.length === 0) {
    return (
      <>
        <Header showSearchButton={false} />
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

  async function handlePay(e) {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);

    const payload = {
      numbers: selectedNumbers,
      buyer,
      stickerId: selectedSticker ? selectedSticker.id : null,
    };
    if (!buyer.name || !buyer.email) {
      alert("Debes ingresar nombre y teléfono");
      setProcessing(false);
      return;
    }

    try {
      // ===== Confirmar compra (crear Purchase en PENDING) ====
      const confirmRes = await fetch(
        `http://localhost:3000/raffles/${raffle.id}/confirm-purchase`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const confirmData = await confirmRes.json();

      if (!confirmRes.ok) {
        alert(confirmData.message || "Error al confirmar la compra");
        setProcessing(false);
        return;
      }

      // ==== confirmData.purchaseId EXISTE ======
      console.log("Purchase creada:", confirmData.purchaseId);

      // ===== Crear pago en Wompi ======
      const paymentRes = await fetch("http://localhost:3000/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          purchaseId: confirmData.purchaseId,
        }),
      });

      const paymentData = await paymentRes.json();

      if (!paymentRes.ok || !paymentData.checkoutUrl) {
        alert("Error al crear el pago");
        setProcessing(false);
        return;
      }

      // ====== REDIRIGIR A WOMPI =======
      window.location.href = paymentData.checkoutUrl;
    } catch (error) {
      console.error("Error en checkout:", error);
      alert("Error de conexión");
      setProcessing(false);
    }
  }

  return (
    <>
      <Header showSearchButton={false} />

      <main className="min-h-screen bg-slate-100 px-6 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 space-y-8">
          {/* TÍTULO */}
          <h1 className="text-2xl font-bold text-slate-800">
            Confirmar compra
          </h1>

          {/* RESUMEN */}
          <div className="space-y-2 text-slate-700">
            <p>
              <strong>Rifa:</strong> {raffle.title}
            </p>
            <p>
              <strong>Precio por número:</strong> $
              {Number(raffle.ticket_price).toLocaleString()}
            </p>
          </div>

          {/* NÚMEROS */}
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

          {/* DATOS DEL COMPRADOR */}
          <div className="space-y-4 border-t pt-6">
            <h2 className="text-lg font-semibold text-slate-800">
              Datos del comprador
            </h2>
            <form onSubmit={handlePay}>
              <div className="space-y-4 border-t pt-6">
                <h2 className="text-lg font-semibold text-slate-800">
                  Datos del comprador
                </h2>

                <input
                  name="name"
                  placeholder="Nombre completo"
                  value={buyer.name}
                  onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
                  className="w-full rounded border px-4 py-2"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={buyer.email}
                  onChange={(e) =>
                    setBuyer({ ...buyer, email: e.target.value })
                  }
                  className="w-full rounded border px-4 py-2"
                  required
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Ingresa un correo válido (ej: nombre@gmail.com)",
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </div>

              {/* BOTONES */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 rounded border text-slate-600 hover:bg-slate-100"
                >
                  Volver
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-800 transition"
                >
                  Ir a pagar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
