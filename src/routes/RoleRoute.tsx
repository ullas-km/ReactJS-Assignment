import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

type RoleRouteProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export default function RoleRoute({
  allowedRoles,
  children,
}: Readonly<RoleRouteProps>) {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
