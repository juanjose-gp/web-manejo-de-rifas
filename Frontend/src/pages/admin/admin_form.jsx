import { useState } from 'react';

export default function CreateUserForm({ on_submit }) {
  const [form, set_form] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'USER',
  });

  function handle_change(e) {
    set_form({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handle_submit(e) {
    e.preventDefault();
    on_submit(form);
  }

  return (
    <form
      onSubmit={handle_submit}
      className="space-y-4 rounded-xl bg-white/5 backdrop-blur p-6 border border-white/10"
    >
      <h2 className="text-xl font-semibold text-white">
        Crear usuario
      </h2>

      <input
        className="w-full rounded bg-black/40 p-2 text-white"
        placeholder="Nombre"
        name="name"
        onChange={handle_change}
        required
      />

      <input
        className="w-full rounded bg-black/40 p-2 text-white"
        placeholder="Email"
        name="email"
        type="email"
        onChange={handle_change}
        required
      />

      <input
        className="w-full rounded bg-black/40 p-2 text-white"
        placeholder="Teléfono"
        name="phone"
        onChange={handle_change}
        required
      />

      <input
        className="w-full rounded bg-black/40 p-2 text-white"
        placeholder="Contraseña"
        name="password"
        type="password"
        onChange={handle_change}
        required
      />

      <select
        className="w-full rounded bg-black/40 p-2 text-white"
        name="role"
        onChange={handle_change}
      >
        <option value="USER">Usuario</option>
        <option value="ADMIN">Administrador</option>
        <option value="SPONSOR">Patrocinador</option>
      </select>

      <button
        type="submit"
        className="w-full rounded bg-blue-500 py-2 font-semibold hover:bg-blue-600"
      >
        CREAR USUARIO
      </button>
    </form>
  );
}
