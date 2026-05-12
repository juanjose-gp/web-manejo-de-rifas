import { useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

export default function CheckoutAuto() {
  const { state } = useLocation();
  const cart = state?.cart || [];

  const [processing, setProcessing] = useState(false);
  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
  });

  if (cart.length === 0) {
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

  // 🔢 Totales
  const totalBoletas = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPagar = cart.reduce(
    (acc, item) => acc + item.quantity * item.ticket_price,
    0
  );

  async function handlePay() {
    if (processing) return;

    if (!buyer.name || !buyer.phone) {
      alert("Debes ingresar nombre y teléfono");
      return;
    }

    setProcessing(true);

    try {
      /*

      */
      const raffle = cart[0];

      //  Confirmar compra AUTOMÁTICA
      const confirmRes = await fetch(
        `http://localhost:3000/raffles/${raffle.id}/confirm-purchase-auto`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: raffle.quantity,
            buyer,
          }),
        }
      );

      const confirmData = await confirmRes.json();

      if (!confirmRes.ok) {
        alert(confirmData.message || "Error al confirmar la compra");
        setProcessing(false);
        return;
      }

      //  purchaseId generado
      const purchaseId = confirmData.purchaseId;

      //  Crear pago (MISMO FLUJO QUE EL MANUAL)
      const paymentRes = await fetch(
        "http://localhost:3000/payments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ purchaseId }),
        }
      );

      const paymentData = await paymentRes.json();

      if (!paymentRes.ok || !paymentData.checkoutUrl) {
        alert("Error al crear el pago");
        setProcessing(false);
        return;
      }

      //  Redirigir a Wompi
      window.location.href = paymentData.checkoutUrl;
    } catch (error) {
      console.error("Error en checkout automático:", error);
      alert("Error de conexión");
      setProcessing(false);
    }
  }

  return (
    <>
      <Header showSearchButton={false} />

      <main className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center space-y-6">
          <h1 className="text-3xl font-extrabold text-slate-800">
            Confirmar compra
          </h1>

          <p className="text-base text-slate-600 leading-relaxed">
            Deja tus números de boletas en manos de la suerte 
            <br />
            El sistema los asignará automáticamente.
          </p>

          {/* RESUMEN */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 space-y-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm text-blue-800"
              >
                <span className="font-medium">{item.title}</span>
                <span>{item.quantity} boleta(s)</span>
              </div>
            ))}

            <hr className="border-blue-200 my-2" />

            <div className="flex justify-between font-semibold text-blue-900">
              <span>Total boletas</span>
              <span>{totalBoletas}</span>
            </div>

            <div className="flex justify-between font-bold text-green-700 text-lg">
              <span>Total a pagar</span>
              <span>${totalPagar.toLocaleString()}</span>
            </div>
          </div>

          {/* FORMULARIO COMPRADOR (MISMO DEL CHECKOUT MANUAL) */}
          <div className="space-y-4 pt-2">
            <input
              placeholder="Nombre completo"
              value={buyer.name}
              onChange={(e) =>
                setBuyer({ ...buyer, name: e.target.value })
              }
              className="w-full rounded border px-4 py-2"
              required
            />

            <input
              placeholder="Teléfono (WhatsApp)"
              value={buyer.phone}
              onChange={(e) =>
                setBuyer({ ...buyer, phone: e.target.value })
              }
              className="w-full rounded border px-4 py-2"
              required
            />
          </div>

          <button
            onClick={handlePay}
            disabled={processing}
            className="w-full mt-4 rounded bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            {processing ? "Procesando..." : "IR A PAGAR"}
          </button>

          <p className="text-sm text-slate-500">
            Los números asignados se mostrarán y enviarán
            <br />
            una vez confirmado el pago.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
