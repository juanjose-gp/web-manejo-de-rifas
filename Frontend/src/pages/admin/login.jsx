import { useState } from "react";
import { login } from "../../api/auth_api";
import Background from "../../components/layout/background";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [error, set_error] = useState(null);

  async function handle_submit(e) {
    e.preventDefault();
    set_error(null);

    try {
      const data = await login(email, password);

      // guardar token
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // redirigir según rol
      switch (data.user.role) {
        case "ADMIN":
          navigate("/admin");
          break;

        case "SPONSOR":
          navigate("/patrocinador/validar_codigo");
          break;

        default:
          throw new Error("Usuario sin permisos");
      }
    } catch (err) {
      set_error(err.message);
    }
  }

  return (
    <Background>
      <div className="min-h-screen flex justify-center items-center px-6">
        <form
          onSubmit={handle_submit}
          className="w-full max-w-sm space-y-4 rounded-xl bg-white/5 backdrop-blur p-6 border border-white/10 text-white"
        >
          <h2 className="text-xl font-semibold text-center">Iniciar sesión</h2>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <input
            className="w-full rounded bg-black/40 p-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => set_email(e.target.value)}
            required
          />

          <input
            className="w-full rounded bg-black/40 p-2"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => set_password(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 font-semibold hover:bg-blue-600"
          >
            INGRESAR
          </button>
        </form>
      </div>
    </Background>
  );
}
