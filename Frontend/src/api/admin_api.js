const API_URL = 'http://localhost:3000';

export async function create_user_admin(token, user_data) {
  const response = await fetch(`${API_URL}/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user_data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
}
