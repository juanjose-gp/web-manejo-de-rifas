export function get_token() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}

export function is_authenticated() {
  return Boolean(get_token());
}