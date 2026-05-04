const API_URL = 'http://localhost:3000';

/* ========================== */
/* 🔓 PÚBLICO (HOME)          */
/* ========================== */

export async function get_raffles() {
  const response = await fetch(`${API_URL}/raffles`);

  if (!response.ok) {
    throw new Error('Error al obtener rifas');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

/* ========================== */
/* 🔐 ADMINISTRACIÓN          */
/* ========================== */

/**
 * Obtener rifas con ventas (ADMIN)
 */
export async function getAdminRaffles(token) {
  const response = await fetch(`${API_URL}/raffles/admin/raffles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al cargar rifas del admin');
  }

  return response.json();
}

/**
 * Activar / desactivar rifa
 */
export async function toggleRaffle(id, token) {
  const response = await fetch(
    `${API_URL}/raffles/admin/raffles/${id}/toggle`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error al cambiar estado de la rifa');
  }

  return response.json();
}
