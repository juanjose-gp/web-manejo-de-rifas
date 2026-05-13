import { useState } from "react";
import RaffleForm from "../../components/admin/raffle_form";
import { create_raffle } from "../../api/raffles_api";

export default function AdminRaffles() {
  const [message, set_message] = useState(null);
  const token = localStorage.getItem("token");

  async function handle_create_raffle(form) {
    try {
      await create_raffle(
        {
          title: form.title,
          description: form.description,
          ticket_price: form.ticket_price,
          total_numbers: form.total_numbers,
        },
        token,
      );

      set_message({ type: "success", text: " Rifa creada correctamente" });
    } catch (err) {
      set_message({ type: "error", text: err.message });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {message && (
        <div
          className={`text-center py-4 ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <RaffleForm onSubmit={handle_create_raffle} />
    </div>
  );
}
