import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import CreateRafflePage from "./pages/admin/create_raffle";
import CreateSponsorPage from "./pages/admin/patrocinador_form";
import ValidarCodigoDescuento from "./pages/patrocinador/validar_cod_descuento";
import ValidarNumBoleta from "./pages/users/validar_num_boleta";
import PrivacyPolicy from "./pages/legal/privacy";
import TermsAndConditions from "./pages/legal/terms";
import FaqPage from "./pages/help/faq";
import SeleccionarNumeros from "./pages/users/select_num";
import Checkout from "./pages/users/checkout";
import CheckoutAuto from "./pages/users/checkout_auto";
import ProtectedRoute from "./components/auth/protected_route";
import ResultadoPago from "./pages/resultado_pago";
import Gracias from "./pages/gracias";
import Error from "./pages/error";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buscar_boletas" element={<ValidarNumBoleta />} />
        <Route path="/politicas_de_privacidad" element={<PrivacyPolicy />} />
        <Route
          path="/terminos_y_condiciones"
          element={<TermsAndConditions />}
        />
        <Route path="/preguntas_frecuentes" element={<FaqPage />} />
        <Route
          path="/rifas/:raffleId/seleccionar_numeros"
          element={<SeleccionarNumeros />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout_auto" element={<CheckoutAuto />} />
        <Route path="/estado_pago" element={<ResultadoPago />} />
        <Route path="/gracias" element={<Gracias />} />
        <Route path="/error" element={<Error />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/crear_rifa"
          element={
            <ProtectedRoute role="ADMIN">
              <CreateRafflePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/crear_patrocinador"
          element={
            <ProtectedRoute role="ADMIN">
              <CreateSponsorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patrocinador/validar_codigo"
          element={
            <ProtectedRoute role="SPONSOR">
              <ValidarCodigoDescuento />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/validar_codigo"
          element={
            <ProtectedRoute role="ADMIN">
              <ValidarCodigoDescuento />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
