
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, store user data in localStorage
    if (email && password && username) {
      localStorage.setItem("registeredEmail", email);
      localStorage.setItem("registeredPassword", password);
      localStorage.setItem("registeredUsername", username);
      toast.success("Registration successful! Please login.");
      navigate("/auth");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 glass-card p-8 rounded-xl animate-fade-up">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gradient">
            Join Carsify
          </h1>
          <p className="text-muted-foreground">
            Create an account to start renting premium cars.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6 mt-8">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-secondary/50"
            />
          </div>
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
            Register
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0"
              onClick={() => navigate("/auth")}
            >
              Login here
            </Button>
          </p>
        </form>
      </div>
    </div>
  </div>
  );
}
