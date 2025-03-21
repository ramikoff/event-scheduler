import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 7000); // Hide after 7 seconds

    return () => clearTimeout(timer); // Clear onUnmount
  }, [success]);

  const navigate = useNavigate();

  // Function to validate the form inputs
  const validateForm = () => {
    const newErrors = {};

    // Email validation using regex (RFC 5322 standard)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation: minimum 6 characters, uppercase, lowercase, number, special character
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[\W_]/.test(password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Send registration post request using Axios
      const response = await axios.post("http://localhost:3001/api/users", {
        email,
        password,
      });

      setSuccess(true);
      console.log("User registered successfully", response.data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        server: "Registration failed. Try again.",
      }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      {success && (
        <p className="text-m font-bold mb-4 text-green-600">User registered successfully.</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 w-80 md:w-96">
        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className={`input input-bordered w-full ${
              errors.email ? "border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className={`input input-bordered w-full ${
              errors.password ? "border-red-500" : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Server Error Message */}
        {errors.server && (
          <p className="text-red-500 text-sm">{errors.server}</p>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Sign Up
        </button>
      </form>

      {/* Already have an account? Login Link */}
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
