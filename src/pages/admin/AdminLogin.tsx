import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Key, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SecurityBadge } from "@/components/ui/security-badge";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId && password) {
      navigate("/admin/dashboard");
    } else {
      setError("Please enter valid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Header Stripe */}
      <div className="bg-govt-stripe py-3 px-4">
        <div className="container flex items-center gap-2 text-primary-foreground">
          <Shield className="h-5 w-5" />
          <span className="font-semibold">SecureVote Admin Portal</span>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground mx-auto mb-4">
              <Lock className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">Admin Login</h1>
            <p className="text-primary-foreground/70">Authorized personnel only</p>
          </div>

          <div className="bg-card rounded-xl shadow-xl p-8">
            <div className="flex justify-center mb-6">
              <SecurityBadge type="encrypted" />
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="adminId">Admin ID</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="adminId"
                    placeholder="Enter your Admin ID"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    className="pl-10 input-govt"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 input-govt"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full btn-govt-primary">
                Login to Admin Portal
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 text-warning" />
                <p>
                  This is a secure government system. Unauthorized access attempts are logged and may result in legal action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
