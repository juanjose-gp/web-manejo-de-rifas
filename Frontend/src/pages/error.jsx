import { useSearchParams } from "react-router-dom";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const [params] = useSearchParams();
  const purchaseId = params.get("purchaseId");
  const navigate = useNavigate();

  return (
    <>
      {/*  Header SOLO con logo */}
      <Header showSearchButton={false} />

      <main className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center space-y-6">
          {/*  TÍTULO PRINCIPAL */}
          <h1 className="text-3xl font-extrabold text-slate-800">
            ¡Tuvimos un error con tu compra!
          </h1>

          {/* MENSAJE PRINCIPAL */}
          <p className="text-base text-slate-600 leading-relaxed">
            Tu pago no fue recibido correctamente.
            <br />
            Estamos validando la transacción.
          </p>

          {/*  BLOQUE DESTACADO */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4">
            <p className="text-blue-800 font-semibold">
              por favor intenta de nuvo. Revisa muy bien los datos ingresados
            </p>
            <p className="text-blue-700 text-sm mt-1">
              y espera 2 minutos para escoger los mismos numeros anteriores.
            </p>
          </div>

          {/* MENSAJE FINAL */}
          <p className="text-sm text-slate-500">
            si el error percibe no dudes en comunicarse con nosotros.
            <br />
            por nuestros canales oficiales.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 rounded bg-gray-600 py-3 font-semibold text-white hover:bg-gray-700 transition"
          >
            Volver al inicio
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
