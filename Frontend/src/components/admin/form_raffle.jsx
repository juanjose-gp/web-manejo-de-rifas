import { useState } from "react";

export default function RaffleForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    ticket_price: "",
    total_numbers: 100,
    image: null,
    stickers: [
      {
        sticker_image: null,
        sticker_expiration: "",
        discount_code: "",
        patrocinador: "",
        discount_description: "",
      },
    ],
  });

  //===== HANDLERS GENERALES ======

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "ticket_price" || name === "total_numbers"
          ? Number(value)
          : value,
    });
  }

  function handleImageChange(e) {
    setForm({ ...form, image: e.target.files[0] });
  }

  //===== STICKERS =====

  function handleStickerChange(index, e) {
    const { name, value } = e.target;
    const stickers = [...form.stickers];
    stickers[index][name] = value;
    setForm({ ...form, stickers });
  }

  function handleStickerImage(index, file) {
    const stickers = [...form.stickers];
    stickers[index].sticker_image = file;
    setForm({ ...form, stickers });
  }

  function addSticker() {
    if (form.total_numbers === 100) {
      setForm({
        ...form,
        stickers: [
          ...form.stickers,
          {
            sticker_image: null,
            sticker_expiration: "",
            discount_code: "",
            patrocinador: "",
            discount_description: "",
          },
        ],
      });
    }
  }

  // ======  SUBMIT + VALIDACIÓN =====

  function handleSubmit(e) {
    e.preventDefault();

    // Validar códigos duplicados
    const codes = form.stickers.map((s) => s.discount_code.trim());
    const hasDuplicates = new Set(codes).size !== codes.length;

    const codeInput = e.target.querySelector('[name="discount_code"]');

    if (hasDuplicates) {
      codeInput.setCustomValidity("No puedes repetir códigos de descuento");
      codeInput.reportValidity();
      return;
    }

    codeInput.setCustomValidity("");
    onSubmit(form);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Crear rifa
        </h2>

        {/* Título */}
        <input
          name="title"
          placeholder="Título"
          required
          onChange={handleChange}
          className="w-full h-11 border rounded px-3"
        />
        {/* Descripción */}
        <textarea
          name="description"
          placeholder="Descripción"
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        {/* Precio */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="ticket_price"
            type="number"
            min="1"
            required
            onChange={handleChange}
            placeholder="Precio"
            className="h-11 border rounded px-3"
          />
          {/* # boletas */}
          <select
            name="total_numbers"
            value={form.total_numbers}
            onChange={handleChange}
            className="h-11 border rounded px-3"
          >
            <option value={100}>100</option>
            <option value={1000}>1000</option>
          </select>
        </div>

        {/* Imagen rifa */}
        <input
          type="file"
          accept="image/*"
          required
          onChange={handleImageChange}
        />

        {/* Stickers */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="text-xl font-semibold text-center">Stickers</h3>

          {form.stickers.map((sticker, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 space-y-2 bg-gray-50"
            >
              <strong>Sticker #{index + 1}</strong>
              {/* fecha vence sticker */}
              <input
                type="date"
                name="sticker_expiration"
                required
                onChange={(e) => handleStickerChange(index, e)}
                className="w-full h-10 border rounded px-3"
              />
              {/* imagen sticker */}
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => handleStickerImage(index, e.target.files[0])}
              />
              {/* % descuento */}
              <input
                name="discount_code"
                required
                onChange={(e) => handleStickerChange(index, e)}
                placeholder="Descuento ej: 10%"
                className="w-full h-10 border rounded px-3"
              />
              {/* patrocinador */}
              <input
                name="patrocinador"
                required
                onChange={(e) => handleStickerChange(index, e)}
                placeholder="Patrocinador"
                className="w-full h-10 border rounded px-3"
              />
              {/* descripcion stickers */}
              <textarea
                name="discount_description"
                required
                rows={2}
                onChange={(e) => handleStickerChange(index, e)}
                placeholder="Descripción"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
          {/* + stickers */}
          {form.total_numbers === 100 && (
            <button
              type="button"
              onClick={addSticker}
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Agregar otro sticker
            </button>
          )}
        </div>
        {/* crear */}
        <button
          type="submit"
          className="w-full h-11 bg-blue-600 text-white rounded"
        >
          CREAR RIFA
        </button>
      </form>
    </div>
  );
}