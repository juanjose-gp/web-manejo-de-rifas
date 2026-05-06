import { useState } from "react";

export default function CrearPatrocinadorForm({ onSubmit }) {
    console.log("onSubmit:", onSubmit);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-6">
         
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          rounded-2xl
          shadow-lg
          p-8
          w-full
          max-w-md
          space-y-6
        "
      >
        <h2 className="text-2xl font-semibold text-slate-800 text-center">
          Crear Patrocinador
        </h2>
        
        {/* Nombre */}
        <div className="space-y-1">
          <label className="text-sm text-slate-600">Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre completo"
            required
            className="
              w-full h-11
              rounded-md
              border border-slate-300
              px-3
              text-slate-900
              placeholder-slate-400
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
            "
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm text-slate-600">Correo electrónico</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
            className="
              w-full h-11
              rounded-md
              border border-slate-300
              px-3
              text-slate-900
              placeholder-slate-400
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
            "
          />
        </div>

        {/* Teléfono */}
        <div className="space-y-1">
          <label className="text-sm text-slate-600">Teléfono</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Opcional"
            className="
              w-full h-11
              rounded-md
              border border-slate-300
              px-3
              text-slate-900
              placeholder-slate-400
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
            "
          />
        </div>

        {/* Contraseña */}
        <div className="space-y-1">
          <label className="text-sm text-slate-600">Contraseña</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña segura"
            required
            className="
              w-full h-11
              rounded-md
              border border-slate-300
              px-3
              text-slate-900
              placeholder-slate-400
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
            "
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="
            w-full h-11
            rounded-md
            bg-blue-600
            text-white
            font-semibold
            transition
            hover:bg-blue-700
          "
        >
          Crear patrocinador
        </button>
      </form>
    </div>
  );
}
