import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  //  sin token o sin usuario → login
  if (!token || !userRaw) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userRaw);

  //  si se requiere rol y no coincide
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
