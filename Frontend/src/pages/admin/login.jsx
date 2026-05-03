import { useState } from 'react';
import { login } from '../../api/auth_api';
import Background from '../../components/layout/background';
import { useNavigate } from 'react-router-dom'

export default function AdminLogin({ on_login_success }) {
  const navigate = useNavigate();
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [error, set_error] = useState(null);

  async function handle_submit(e) {
    e.preventDefault();
    set_error(null);

    try {
      const data = await login(email, password);

      if (data.user.role !== 'ADMIN') {
        throw new Error('No tienes permisos de administrador');
      }

     localStorage.setItem('token', data.access_token);
    navigate('/admin');
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
          <h2 className="text-xl font-semibold text-center">
            Login Administrador
          </h2>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

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