import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createUserWithEmailAndPassword } from "../../Services/Api/authApis";
import { useAuth } from "../../Services/Context/AuthContext";

const SignUpComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useAuth(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      const user = res.user;

      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("role", "user");

      setUser({ token: data.token, role: data.user.role });

      // Optionally redirect user here
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Name</label>
        <Input
          id="name"
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full"
          required
        />
      </div>

      <Button type="submit" variant="default" className="w-full mt-6" disabled={loading}>
        {loading ? "Signing Up..." : "Create Account"}
      </Button>


      {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
    </form>
  );
};

export default SignUpComponent;
