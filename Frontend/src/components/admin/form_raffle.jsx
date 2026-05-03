import { useState } from 'react';

export default function RaffleForm({ on_submit }) {
  const [form, set_form] = useState({
    title: '',
    description: '',
    ticket_price: '',
    total_numbers: 100,
    image: null,
  });

  function handle_change(e) {
    const { name, value } = e.target;
    
    set_form({
      ...form,
      
      [name]:
        name === 'ticket_price' || name === 'total_numbers'
          ? Number(value)
          : value,
          
    });
   
  }

  function handle_image_change(e) {
    set_form({ ...form, image: e.target.files[0] });
  }

 
function handle_submit(e) {
  e.preventDefault();
  console.log(' handle_submit ejecutado', form);
  on_submit(form);
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handle_submit}
        className="
          w-full max-w-md
          bg-white
          rounded-2xl
          shadow-lg
          p-8
          space-y-6
        "
      >
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Crear rifa
        </h2>

        {/* Título */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Título</label>
          <input
            name="title"
            onChange={handle_change}
            required
            placeholder="Ej: Rifa Moto 0km"
            className="
              w-full h-11
              rounded-md
              border border-gray-300
              px-3
              text-gray-900
              placeholder-gray-400
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
            "
          />
        </div>

        {/* Descripción */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Descripción</label>
          <textarea
            name="description"
            rows={4}
            onChange={handle_change}
            placeholder="Describe la rifa"
            className="
              w-full
              rounded-md
              border border-gray-300
              px-3 py-2
              text-gray-900
              placeholder-gray-400
              resize-none
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
            "
          />
        </div>

        {/* Precio y números */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Precio</label>
            <input
              name="ticket_price"
              type="number"
              min="0"
              onChange={handle_change}
              placeholder="$"
              className="
                w-full h-11
                rounded-md
                border border-gray-300
                px-3
                text-gray-900
                placeholder-gray-400
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-600">Números</label>
            <select
              name="total_numbers"
              value={form.total_numbers}
              onChange={handle_change}
              className="
                w-full h-11
                rounded-md
                border border-gray-300
                px-3
                text-gray-900
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-blue-500
              "
            >
              <option value={100}>100</option>
              <option value={1000}>1000</option>
            </select>
          </div>
        </div>

        {/* Imagen */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">
            Imagen de la rifa
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handle_image_change}
            className="
              block w-full
              text-sm text-gray-700
              file:mr-3
              file:rounded-md
              file:border-0
              file:bg-blue-600
              file:px-4
              file:py-2
              file:text-white
              hover:file:bg-blue-700
            "
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="
            w-full
            h-11
            rounded-md
            bg-blue-600
            text-white
            font-semibold
            transition
            hover:bg-blue-700
          "
        >
          CREAR RIFA
        </button>
      </form>
    </div>
  );
}