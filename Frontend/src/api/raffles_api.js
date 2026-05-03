const API_URL = 'http://localhost:3000';

/**
 * Obtener todas las rifas (público)
 */
export async function get_raffles() {
  const response = await fetch(`${API_URL}/raffles`);

  if (!response.ok) {
    throw new Error('Error al obtener rifas');
  }

  const data = await response.json();

  // ✅ defensa absoluta
  return Array.isArray(data) ? data : [];
}

/**
 * Crear una rifa (ADMIN)
 */
export async function create_raffle(raffle_data, token) {
  const response = await fetch(`${API_URL}/raffles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(raffle_data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al crear la rifa');
  }

  return response.json();
}
