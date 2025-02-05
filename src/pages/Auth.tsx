import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, using basic validation
    if (email === "demo@example.com" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Successfully logged in!");
      navigate("/");
    } else {
      toast.error("Invalid credentials! Use demo@example.com / password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 glass-card p-8 rounded-xl">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold animate-fade-in text-gradient">
            Carsify
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Please login to continue.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 mt-8">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary/50"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}