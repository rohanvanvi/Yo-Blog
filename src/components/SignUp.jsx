import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Input, Button } from "./index.js";
import { UserCircleIcon } from "@heroicons/react/24/solid"; // Heroicons package

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createAccount = async (data) => {
    setError("");
    try {
      await authService.createAccount(data);
      const userData = await authService.getCurrentUser();

      if (userData) {
        dispatch(login(userData));
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
        {/* Icon Section */}
        <div className="flex justify-center mb-6">
          {/* Heroicon logo */}
          <UserCircleIcon className="h-16 w-16 text-primary" />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Sign Up to Create Account
          </h2>
          <p className="mt-2 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline transition-all duration-200"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-600 bg-red-100 p-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(createAccount)} className="space-y-5">
          {/* Full Name Input */}
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", { required: "Full Name is required" })}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}

          {/* Email Input */}
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}

          {/* Password Input */}
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
