import React, { useState } from "react";
import { X, Mail, Lock, User, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import InputField from "./InputField";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Basic validation
      if (!formData.fullName || !formData.email || !formData.password) {
        throw new Error("Please fill in all fields");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Add your actual registration logic here
      console.log("Registration data:", formData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Add your Google OAuth registration logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Example: window.location.href = '/api/auth/google/register';
    } catch (err) {
      setError("Google registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-title"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 hover:rotate-90 transition-all duration-300"
          aria-label="Close register modal"
        >
          <X size={20} />
        </button>

        {/* Register Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md">
            <User className="text-white" size={20} />
          </div>
        </div>

        {/* Title */}
        <h2
          id="register-title"
          className="text-xl font-bold text-gray-800 text-center mb-2"
        >
          Create Your Account
        </h2>
        <p className="text-gray-500 text-center text-sm mb-4">
          Join us and start your journey!
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm mb-4 text-center">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <InputField
            icon={User}
            label="Full Name"
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            placeholder="Enter your full name"
          />

          <InputField
            icon={Mail}
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
          />

          <InputField
            icon={Lock}
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Create a password"
            showPasswordToggle
          />

          <InputField
            icon={Lock}
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            placeholder="Confirm your password"
            showPasswordToggle
          />

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Register"
            )}
          </button>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">
                Or register with
              </span>
            </div>
          </div>

          {/* Google Register Button */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-2 px-3 hover:bg-gray-50 transition duration-300"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="text-gray-700 text-sm">Continue with Google</span>
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-green-500 hover:text-green-600 font-medium hover:underline"
            >
              Login now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
