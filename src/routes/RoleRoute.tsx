import { Navigate } from "react-router-dom";

type RoleRouteProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export default function RoleRoute({
  allowedRoles,
  children,
}: Readonly<RoleRouteProps>) {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}