import { Navigate } from "react-router-dom";

type ProtectedRouteProps = Readonly<{
  children: React.ReactNode;
}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  // not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // logged in
  return children;
}
