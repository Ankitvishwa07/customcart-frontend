import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOTP = async () => {
    try {
      await axios.post("/api/auth/send-otp", {
        email: formData.email,
      });
      alert("OTP sent successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/signup", formData);

      localStorage.setItem("token", res.data.token);
      alert("Signup successful");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <div className="otp">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <button type="button" onClick={handleSendOTP}>
              Send OTP
            </button>
          </div>

          <input
            type="text"
            name="otp"
            placeholder="OTP"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
