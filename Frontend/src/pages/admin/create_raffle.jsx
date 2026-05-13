import RaffleForm from "../../components/admin/form_raffle";
import { useNavigate } from "react-router-dom";

export default function CreateRafflePage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function handle_create_raffle(form) {
    const formData = new FormData();

    // Datos base
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("ticket_price", form.ticket_price);
    formData.append("total_numbers", form.total_numbers);

    // Imagen de rifa
    if (form.image) {
      formData.append("image", form.image);
    }

    // stickers como JSON
    formData.append(
      "stickers",
      JSON.stringify(
        form.stickers.map((s) => ({
          sticker_expiration: s.sticker_expiration,
          discount_code: s.discount_code,
          patrocinador: s.patrocinador,
          discount_description: s.discount_description,
        })),
      ),
    );

    // Imágenes de stickers
    form.stickers.forEach((sticker) => {
      if (sticker.sticker_image) {
        formData.append("sticker_images", sticker.sticker_image);
      }
    });

    const response = await fetch("http://localhost:3000/raffles", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(err);
      alert("Error al crear la rifa");
      return;
    }

    alert(" Rifa creada correctamente");
    navigate("/admin");
  }

  return <RaffleForm onSubmit={handle_create_raffle} />;
}
