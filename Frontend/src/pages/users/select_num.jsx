import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/Footer";

export default function SeleccionarNumeros() {
  const { raffleId } = useParams();
  const navigate = useNavigate();

  const [raffle, setRaffle] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  // === Sticker seleccionado ===
  const [selectedStickerIndex, setSelectedStickerIndex] = useState(null);

  // ======= CARGAR RIFA ======

  useEffect(() => {
    async function loadRaffle() {
      const res = await fetch(`http://localhost:3000/raffles/${raffleId}`);
      const data = await res.json();
      setRaffle(data);
    }
    loadRaffle();
  }, [raffleId]);

  // ======= GENERAR NÚMEROS ========

  useEffect(() => {
    if (!raffle) return;

    const soldSet = new Set(
      raffle.tickets.filter((t) => t.status === "SOLD").map((t) => t.number),
    );
    const reservedSet = new Set(
      raffle.tickets
        .filter((t) => t.status === "RESERVED")
        .map((t) => t.number),
    );

    const generated = Array.from({ length: raffle.total_numbers }, (_, i) => ({
      value: i + 1,
      sold: soldSet.has(i + 1),
      reserved: reservedSet.has(i + 1),
    }));

    setNumbers(generated);
  }, [raffle]);

  // ======= SELECCIONAR NÚMEROS =======

  function toggleNumber(num) {
    if (num.sold || num.reserved) return;

    setSelectedNumbers((prev) =>
      prev.includes(num.value)
        ? prev.filter((n) => n !== num.value)
        : [...prev, num.value],
    );
  }

  // ======= SELECCIONAR STICKER =========

  function handleSelectSticker(index) {
    if (selectedStickerIndex !== null) return;
    setSelectedStickerIndex(index);
  }

  // ======= CONTINUAR =======

  async function handleContinue() {
    if (selectedNumbers.length === 0) {
      alert("Debes seleccionar al menos un número");
      return;
    }

    try {
      //=== Reservar números ====
      const res = await fetch(
        `http://localhost:3000/raffles/${raffle.id}/reserve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numbers: selectedNumbers,
          }),
        },
      );

      if (!res.ok) {
        const error = await res.json();
        alert(error.message || "Error al reservar números");
        return;
      }

      // Ir al checkout SOLO si la reserva fue exitosa
      navigate("/checkout", {
        state: {
          raffle,
          selectedNumbers,
          selectedSticker:
            selectedStickerIndex !== null
              ? raffle.discountCodes[selectedStickerIndex]
              : null,
        },
      });
    } catch (err) {
      console.error("Error al reservar", err);
      alert("Error de conexión con el servidor");
    }
  }

  if (!raffle) {
    return <p className="text-center mt-20">Cargando rifa...</p>;
  }

  const total = selectedNumbers.length * raffle.ticket_price;

  return (
    <>
      <Header showSearchButton={false} />

      <main className="min-h-screen  px-6 py-16">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="mt-12 text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-800">
              Selecciona tus números
            </h1>

            <p className="text-slate-600">
              Rifa: <strong>{raffle.title}</strong> · Precio por número:{" "}
              <strong>${raffle.ticket_price.toLocaleString()}</strong>
            </p>
          </div>

          {/* GRID NÚMEROS */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-2">
            {numbers.map((num) => {
              const isSelected = selectedNumbers.includes(num.value);

              return (
                <button
                  key={num.value}
                  disabled={num.sold || num.reserved}
                  onClick={() => toggleNumber(num)}
                  className={`
                    h-10 rounded text-sm font-medium flex items-center justify-center transition
                    ${
                      num.sold
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : num.reserved
                          ? "bg-yellow-300 text-yellow-800 cursor-not-allowed"
                          : isSelected
                            ? "bg-blue-500 text-white"
                            : "bg-white border hover:bg-blue-100"
                    }
                  `}
                >
                  {String(num.value).padStart(3, "0")}
                </button>
              );
            })}
          </div>

          {/* RESUMEN */}
          <div className="border-t pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-slate-700">
              Números seleccionados: <strong>{selectedNumbers.length}</strong> ·
              Total: <strong>${total.toLocaleString()}</strong>
            </div>

            <button
              onClick={handleContinue}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Continuar al pago
            </button>
          </div>

          {/* STICKERS */}
          {raffle.discountCodes?.length > 0 && (
            <div className="mt-10 flex flex-col items-center gap-6 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                <span className="text-slate-900">POR LA CONFIANZA</span>{" "}
                <span className="text-blue-800">QUE NOS TIENES.</span>
              </h2>

              <p className="text-lg font-semibold text-slate-700">
                ESCOGE UNA SORPRESA.
              </p>

              <div className="flex gap-6 flex-wrap justify-center">
                {raffle.discountCodes.map((sticker, index) => {
                  const isSelected = selectedStickerIndex === index;
                  const isDisabled =
                    selectedStickerIndex !== null &&
                    selectedStickerIndex !== index;

                  return (
                    <button
                      key={sticker.id ?? index}
                      onClick={() => handleSelectSticker(index)}
                      disabled={isDisabled}
                      className={`
                        p-3 rounded-xl transition
                        ${isSelected ? "ring-4 ring-blue-600 scale-105" : ""}
                        ${
                          isDisabled
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:scale-105 hover:shadow-lg"
                        }
                      `}
                    >
                      <img
                        src={sticker.image_url}
                        alt="Sticker sorpresa"
                        className="w-32 h-32 object-contain"
                      />
                    </button>
                  );
                })}
              </div>

              {selectedStickerIndex !== null && (
                <p className="text-green-700 font-semibold">
                  Has seleccionado tu sorpresa
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
