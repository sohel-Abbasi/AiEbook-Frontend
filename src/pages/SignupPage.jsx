import React, { useState } from "react";
import { Mail, Lock, User, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        formData,
      );
      const { token } = response.data;

      // After successful registration, fetch user profile to log them in
      const profileResponse = await axiosInstance.get(
        API_PATHS.AUTH.GET_PROFILE,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      login(profileResponse.data, token);
      toast.success("Account Created Successfully");
      navigate("/dashboard");
    } catch (error) {
      localStorage.clear();
      toast.error(
        error.response?.data?.message ||
          "Registration Failed, Please try again",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-600 mb-4 shadow-sm">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create an Account
        </h1>
        <p className="text-gray-500">
          Start your journey of creating amazing eBooks today.
        </p>
      </div>

      {/* Signup Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Full Name"
            type="text"
            name="name"
            icon={User}
            value={formData.name}
            onChange={handleChange}
            placeholder="John"
            required
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            icon={Mail}
            value={formData.email}
            onChange={handleChange}
            placeholder="john@timetoprogram.com"
            required
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            icon={Lock}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full shadow-md hover:-translate-y-0.5"
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-2 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-violet-700 hover:text-violet-600 hover:underline transition-all"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
