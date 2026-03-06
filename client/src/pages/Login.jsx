import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("user", JSON.stringify(data));

      setUser(data);   

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container">
      
      <form onSubmit={handleSubmit} className="card">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="log">Login</button>
        <p>
          Don't Have an Account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;