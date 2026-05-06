import CreateUserForm from '../../components/admin/create_user_form';
import { create_user_admin } from '../../api/admin_api';

export default function AdminUsers() {
  const token = localStorage.getItem('token'); // por ahora

  async function handle_create_user(data) {
    try {
      await create_user_admin(token, data);
      alert('Usuario creado correctamente');
    } catch (err) {
      alert(err.message || 'Error al crear usuario');
    }
  }

  return (
    <div className="min-h-screen p-10 text-white">
      <CreateUserForm onSubmit={handle_create_user} />
    </div>
  );
}
