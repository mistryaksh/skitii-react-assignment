import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context";
import { toast } from "sonner";

export const LoginPage = () => {
  const [patientId, setPatientId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/session", { replace: true });
      toast.success("Welcome back!");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    setError("");
    const res = login(patientId.trim(), pin.trim());
    if (!res.success) {
      setError(res.error || "Login failed");
      return;
    }
    navigate("/session", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-center">Patient Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 w-full">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Login Failed!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Input
            placeholder="Patient ID (e.g. PT001)"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />

          <Input
            placeholder="PIN"
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />

          <Button className="w-full h-12 text-lg" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
