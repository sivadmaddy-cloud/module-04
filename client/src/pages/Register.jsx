import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await API.post("/auth/register", form);
    console.log()
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/dashboard");
  } catch (error) {
    alert(error.response?.data?.message || "Error");
  }
};

  return (
    <div className="container">
      
      <form onSubmit={handleSubmit} className="card">
         <h2>Register</h2>
        <input
          type="text"
          placeholder="Name "
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email "
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password "
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="regi">Register</button>
       <p>
        Already Have an Account <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;