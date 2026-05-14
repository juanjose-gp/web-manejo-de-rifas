import { useState } from "react";

export default function ValidarCodigoDescuento() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const token = localStorage.getItem("token");

  async function handleValidate(e) {
    e.preventDefault();
    setResult(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/discounts/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({
          type: "error",
          message: data.message || "Código inválido",
        });
        return;
      }

      // Guardamos TODA la información útil
      setResult({
        type: "success",
        data,
      });

      setCode("");
    } catch (err) {
      setResult({
        type: "error",
        message: "Error de conexión con el servidor",
      });
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-6">
      <form
        onSubmit={handleValidate}
        className="bg-white rounded-xl shadow p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-slate-800 text-center">
          Validar código de descuento
        </h2>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ingresa el código"
          required
          maxLength={4}
          className="w-full h-11 border rounded-md px-3 text-center tracking-widest focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Validar código
        </button>

        {/* RESULTADO */}
        {result && result.type === "error" && (
          <div className="text-center text-red-500 font-medium">
            {result.message}
          </div>
        )}

        {result && result.type === "success" && (
          <div className="bg-green-50 border border-green-200 rounded p-4 text-sm space-y-2">
            <p className="text-green-700 font-semibold text-center">
              Código validado correctamente
            </p>

            <p>
              <strong>Comprador:</strong> {result.data.buyer}
            </p>
            <p>
              <strong>Correo electrónico:</strong> {result.data.email}
            </p>
            <p>
              <strong>Descuento:</strong> {result.data.discount}
            </p>
            <p>
              <strong>Patrocinador:</strong> {result.data.patrocinador}
            </p>

            <p className="text-xs text-slate-500 text-center">
              Código marcado como usado
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
