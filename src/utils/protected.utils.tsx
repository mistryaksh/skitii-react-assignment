import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/auth.context";
import { toast } from "sonner";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking session...
      </div>
    );
  }

  if (!user) {
    toast.warning("Please login first");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
