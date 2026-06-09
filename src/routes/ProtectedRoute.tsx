import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

type ProtectedRouteProps = Readonly<{
  children: React.ReactNode;
}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAppSelector((state) => state.auth.token);

  // not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // logged in
  return children;
}
