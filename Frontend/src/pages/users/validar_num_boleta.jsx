import { useState } from "react";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/Footer";
import DarkGradientLayout from "../../components/layout/background";
import { useNavigate } from "react-router-dom";

export default function ValidarNumBoleta() {
  const [email, setemail] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  async function handleValidate(e) {
    e.preventDefault();
    setResult(null);

    try {
      const res = await fetch(
        "http://localhost:3000/raffles/validate-tickets",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setResult({ type: "error", message: data.message });
        return;
      }

      setResult({ type: "success", data });
    } catch (err) {
      setResult({ type: "error", message: "Error de conexión" });
    }
  }

  return (
    <DarkGradientLayout>
      <div className="min-h-screen flex flex-col">
        {/* HEADER */}
        <Header showSearchButton={false} />

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-grow flex flex-col items-center justify-center px-6">
          {/* TÍTULO */}
          <h1 className="mb-6 text-center">
            <span className="block text-3xl font-extrabold">
              Ingresa el correo electrónico
            </span>
            <span className="block text-lg mt-2">
              usado en el formulario de compra.
            </span>
          </h1>

          {/* FORMULARIO */}
          <form
            onSubmit={handleValidate}
            className="bg-white rounded-xl shadow p-8 w-full max-w-md space-y-5"
          >
            <h2 className="text-xl font-semibold text-slate-800 text-center">
              Busca tus números de boleta.
            </h2>

            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="correo ingresado en el formulario de compra"
              required
              className="text-slate-800 bg-white w-full h-11 border rounded-md px-3 focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full rounded bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600 transition"
            >
              Buscar números
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full mt-4 rounded bg-gray-600 py-3 font-semibold text-white"
            >
              Volver
            </button>

            {/* ERRORES */}
            {result?.type === "error" && (
              <p className="text-center text-red-500">{result.message}</p>
            )}

            {/* RESULTADOS */}
            {result?.type === "success" &&
              result.data.map((r, i) => (
                <div
                  key={i}
                  className="border-t pt-4 mt-4 text-center space-y-2"
                >
                  <p className="font-semibold text-slate-800">{r.raffle}</p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {r.numbers.map((n) => (
                      <span
                        key={n}
                        className="px-3 py-1 rounded bg-green-100 text-green-800 font-mono text-sm"
                      >
                        {n}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-slate-600">
                    Total: {r.total} boleta(s)
                  </p>
                </div>
              ))}
          </form>
        </main>
      </div>
    </DarkGradientLayout>
  );
}
