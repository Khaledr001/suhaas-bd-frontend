import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface ProtectedRouteProps {
  allowedRoles?: ("ADMIN" | "USER")[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Unauthorized</h2>
          <p className="text-gray-600">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
