import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<AiOutlineEyeInvisible />);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("formData")) || [];
    const userIndex = storedUsers.findIndex((u) => u.email.toLowerCase() === formData.email.toLowerCase());

    if (userIndex === -1) {
      setErrors({ email: "No account found. Please sign up first." });
      return;
    }

    let user = storedUsers[userIndex];

    if (user.password !== formData.password) {
      setErrors({ password: "Incorrect password. Try again." });
      return;
    }

    const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "First time login";

    user.lastLogin = new Date().toISOString();
    storedUsers[userIndex] = user;

    localStorage.setItem("formData", JSON.stringify(storedUsers));
    localStorage.setItem("currentUser", user.email); // Set the currentUser

    toast.success(`Login successful! Last login: ${lastLogin}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    // Optionally, redirect to dashboard or another page after successful login
    // window.location.href = "/dash";
  };

  const handleToggle = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
    setIcon(type === "password" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl w-full md:w-3/4 lg:w-1/2">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

        <div className="relative">
          <input
            type={type}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={handleToggle}
          >
            {icon}
          </span>
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
        </div>
<Link to="/dash">

        <button type="submit" className="w-full py-2 rounded-lg bg-blue-600 text-white">
          LOGIN
        </button>
        </Link>

        <p className="text-center mt-3 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-600">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
