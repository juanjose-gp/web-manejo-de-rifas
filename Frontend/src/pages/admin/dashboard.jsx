import Background from '../../components/layout/background';

export default function AdminDashboard() {
  return (
    <Background>
      <div className="min-h-screen p-10 text-white">
        <h1 className="text-2xl font-bold mb-4">
          Panel de Administración
        </h1>

        <p className="text-slate-300">
          Desde aquí puedes gestionar las rifas, usuarios y configuraciones.
        </p>

        <div className="mt-6 space-y-2">
          <a
            href="/admin/raffles"
            className="block text-blue-400 hover:underline"
          >
            → Gestionar Rifas
          </a>
        </div>
      </div>
    </Background>
  );
}