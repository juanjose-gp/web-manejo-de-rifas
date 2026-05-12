import { useSearchParams } from "react-router-dom";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";


export default function Gracias() {
  const [params] = useSearchParams();
  const purchaseId = params.get("purchaseId");

  return (
    <>
      {/*  Header SOLO con logo */}
      <Header showSearchButton={false} />

      <main className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center space-y-6">

          {/*  TÍTULO PRINCIPAL */}
          <h1 className="text-3xl font-extrabold text-slate-800">
            ¡Gracias por tu compra! 
          </h1>

          {/* MENSAJE PRINCIPAL */}
          <p className="text-base text-slate-600 leading-relaxed">
            Tu pago fue recibido correctamente.
            <br />
            Estamos validando la transacción.
          </p>

          {/*  BLOQUE DESTACADO */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4">
            <p className="text-blue-800 font-semibold">
               No necesitas hacer nada más
            </p>
            <p className="text-blue-700 text-sm mt-1">
              La confirmación se procesa automáticamente.
            </p>
          </div>
          {/* PURCHASE ID (opcional pero útil) */}
          {purchaseId && (
            <p className="text-sm text-slate-500">
              Referencia de compra:
              <br />
              <span className="font-mono text-slate-800">
                #{purchaseId}
              </span>
            </p>
          )}

          {/* MENSAJE FINAL */}
          <p className="text-sm text-slate-500">
            Si el pago fue aprobado, recibirás tu confirmación
            <br />
            por nuestros canales oficiales.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}