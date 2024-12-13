import React, { useState } from "react";
import { X, Mail, Lock, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import InputField from "./InputField";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all fields");
      }
      // Add your actual login logic here
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Add your Google OAuth logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Example: window.location.href = '/api/auth/google';
    } catch (err) {
      setError("Google login failed. Please try again.");
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
      aria-labelledby="login-title"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 hover:rotate-90 transition-all duration-300"
          aria-label="Close login modal"
        >
          <X size={20} />
        </button>

        {/* Login Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md">
            <Mail className="text-white" size={20} />
          </div>
        </div>

        {/* Title */}
        <h2
          id="login-title"
          className="text-xl font-bold text-gray-800 text-center mb-2"
        >
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center text-sm mb-4">
          We're excited to see you again!
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm mb-4 text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
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
            placeholder="Enter your password"
            showPasswordToggle
          />

          <button
            type="button"
            className="text-xs text-green-500 hover:text-green-600 mb-2"
          >
            Forgot Password?
          </button>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Login"
            )}
          </button>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-2 px-3 hover:bg-gray-50 transition duration-300"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="text-gray-700 text-sm">Continue with Google</span>
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-green-500 hover:text-green-600 font-medium hover:underline"
            >
              Register now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
