import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const token = localStorage.getItem("token");

  // not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // logged in
  return children;
} 