import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";

export const SessionPage = () => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
          <p className="text-sm text-slate-500">Music Therapy Session</p>
        </div>

        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </header>
    </div>
  );
};
