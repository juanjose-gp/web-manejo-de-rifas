import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

export default function ResultadoPago() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const purchaseId = params.get("purchaseId");

  useEffect(() => {
    if (!purchaseId) {
      navigate("/error", { replace: true });
      return;
    }

    let attempts = 0;
    const maxAttempts = 20; //
    const intervalTime = 1000; //

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/purchases/${purchaseId}`,
        );

        const data = await res.json();

        if (data.status === "PAID") {
          clearInterval(interval);
          navigate("/gracias", { replace: true });
          return;
        }

        attempts++;

        if (attempts >= maxAttempts) {
          clearInterval(interval);
          navigate("/error", { replace: true });
        }
      } catch {
        clearInterval(interval);
        navigate("/error", { replace: true });
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [purchaseId, navigate]);

  return (
    <>
      <Header showSearchButton={false} />
      <main className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center space-y-6">
          <h1 className="text-3xl font-extrabold text-blue-600">
            Validando tu pago…
          </h1>
          <p className="text-slate-600">
            Por favor espera un momento mientras confirmamos tu compra.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
