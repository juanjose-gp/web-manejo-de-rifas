import CrearPatrocinadorForm from "../../components/admin/crear_patrocinador";
import { useNavigate } from "react-router-dom";

export default function CreateSponsorPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function handleCreateSponsor(form) {
    const res = await fetch("http://localhost:3000/admin/sponsors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Error creando patrocinador");
      return;
    }

    alert("Patrocinador creado correctamente");
    navigate("/admin");
  }

  return (
    <div className="w-full min-h-screen bg-slate-100 flex justify-center pt-10">
      <CrearPatrocinadorForm onSubmit={handleCreateSponsor} />
    </div>
  );
}
