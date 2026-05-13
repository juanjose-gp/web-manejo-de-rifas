import { useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import { useNavigate } from "react-router-dom";

export default function CheckoutAuto() {
  const { state } = useLocation();
  const cart = state?.cart || [];
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
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

  // ==== Totales ====
  const totalBoletas = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPagar = cart.reduce(
    (acc, item) => acc + item.quantity * item.ticket_price,
    0,
  );

  async function handlePay(e) {
    e.preventDefault();

    if (!buyer.name || !buyer.email) {
      alert("Debes ingresar nombre y correo");
      return;
    }

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
        },
      );

      const confirmData = await confirmRes.json();

      if (!confirmRes.ok) {
        alert(confirmData.message || "Error al confirmar la compra");
        setProcessing(false);
        return;
      }

      // ===== purchaseId generado ======
      const purchaseId = confirmData.purchaseId;

      //  Crear pago (MISMO FLUJO QUE EL MANUAL)
      const paymentRes = await fetch("http://localhost:3000/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ purchaseId }),
      });

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
