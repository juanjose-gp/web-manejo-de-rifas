import RaffleForm from '../../components/admin/form_raffle';
import { useNavigate } from "react-router-dom";

export default function CreateRafflePage() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function handle_create_raffle(form) {
    console.log(' fetch ejecutándose');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('ticket_price', form.ticket_price);
    formData.append('total_numbers', form.total_numbers);

    if (form.image) {
      formData.append('image', form.image);
    }

    const response = await fetch('http://localhost:3000/raffles', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    console.log('📡 status:', response.status);

    if (!response.ok) {
      alert(' Error al crear la rifa');
      return;
    }

    alert('Rifa creada correctamente');
    navigate("/admin");
  }

  return <RaffleForm onSubmit={handle_create_raffle} />;
}