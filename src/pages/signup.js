import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<AiOutlineEyeInvisible />);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("formData");
      if (!storedData) {
        localStorage.setItem("formData", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error initializing localStorage:", error);
    }
  }, []);

  const validatePassword = (password) => {
    const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pass.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value || "" }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char";
    }

    const storedUsers = JSON.parse(localStorage.getItem("formData")) || [];
    const isEmailRegistered = storedUsers.some(
      (data) => data.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (isEmailRegistered) {
      newErrors.email = "This email is already registered. Try another email.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Add new user to localStorage
    const updatedUsers = [...storedUsers, formData];
    localStorage.setItem("formData", JSON.stringify(updatedUsers));

    // Set current user in localStorage
    localStorage.setItem("currentUser", formData.email); // Set the currentUser

    setTimeout(() => {
      setLoading(false);
      window.location.href = "/login"; // Redirect to login page after successful sign-up
    }, 2000);
  };

  const handleToggle = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
    setIcon(type === "password" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl w-full md:w-3/4 lg:w-1/2">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

        <PhoneInput
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handlePhoneChange}
          className="p-2 border rounded w-full"
        />
        {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}

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

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 text-white"
          disabled={loading}
        >
          {loading ? "Processing..." : "SIGN UP"}
        </button>

        <Link to="/login">
          <button type="button" className="w-full py-2 rounded-lg bg-gray-600 text-white mt-2">
            LOG IN
          </button>
        </Link>
      </form>
    </div>
  );
};

export default FormComponent;
