import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import CreateRafflePage from "./pages/admin/create_raffle";
import CreateSponsorPage from "./pages/admin/patrocinador_form";
import ValidarCodigoDescuento from "./pages/patrocinador/validar_cod_descuento";

import ProtectedRoute from "./components/auth/protected_route";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

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
            <ProtectedRoute>
              <ValidarCodigoDescuento />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}