import { useState } from "react";

export default function ValidarNumBoleta() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const token = localStorage.getItem("token");

  async function handleValidate(e) {
    e.preventDefault();
    setResult(null);

    try {
      const res = await fetch("http://localhost:3000/discounts/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({ type: "error", message: data.message });
        return;
      }

      setResult({ type: "success", message: "Código válido " });
    } catch (err) {
      setResult({ type: "error", message: "Error de conexión" });
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-6">
      <form
        onSubmit={handleValidate}
        className="bg-white rounded-xl shadow p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-slate-800 text-center">
          Buscar numero de boleta
        </h2>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ingresa el código"
          required
          className="w-full h-11 border rounded-md px-3 focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Buscar numeros
        </button>

        {result && (
          <div
            className={`text-center font-medium ${
              result.type === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {result.message}
          </div>
        )}
      </form>
    </div>
  );
}
