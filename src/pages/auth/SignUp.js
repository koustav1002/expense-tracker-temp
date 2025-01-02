import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ email, name, password });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-10 rounded-lg shadow-md w-[450px] max-w-[600px]">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="JohnDoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(91,33,182)]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[rgb(91,33,182)] hover:bg-[rgb(43,14,80)] text-white py-2 px-4 rounded w-full mt-[15px]"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/sign-in")}
            className="text-[rgb(91,33,182)] hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
