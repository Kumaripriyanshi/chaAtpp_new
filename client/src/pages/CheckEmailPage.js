import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa6";

const CheckEmailPage = () => {
  const [data, setData] = useState({ email: "" });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;
    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);
      if (response.data.success) {
        setData({ email: "" });
        navigate("/password", { state: response?.data?.data });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <div className="w-fit mx-auto mb-4 text-gray-600">
          <FaRegUser size={80} />
        </div>
        <h3 className="text-2xl font-bold text-center text-gray-700">Login</h3>
        <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
            value={data.email}
            onChange={handleOnChange}
            required
          />
          <button className="w-full login-btn text-lg px-4 py-2 rounded-lg font-bold text-white transition">
            LOGIN
          </button>
        </form>
        <p className="my-3 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="login-btn-text font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
