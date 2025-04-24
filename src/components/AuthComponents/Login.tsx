import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../Services/Api/authApis";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "../../Services/Context/AuthContext";
import GoogleLogin from "./GoogleAuth";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth()!; 
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await postLogin(email, password);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("id", data.user.id);
        localStorage.setItem("userName", data.user.name);

        setUser({ token: data.token, role: data.user.role, id: data.user._id });
        console.log("User Data:", data.user);

        setTimeout(() => {
          if (data.user.role === "admin") {
            navigate("/admin/packages");
          } else {
            navigate("/");
          }
        }, 100)
        
      } else {
        setError("Invalid credentials");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full mt-4" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

    
    <GoogleLogin/>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </form>
  );
};

export default LoginComponent;
