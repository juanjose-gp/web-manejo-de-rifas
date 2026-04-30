const API_URL = 'http://localhost:3000';

export async function get_raffles() {
  const response = await fetch(`${API_URL}/raffles`);
  if (!response.ok) {
    throw new Error('Error al obtener rifas');
  }
  return response.json();
}