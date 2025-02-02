import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({ ...preve, [name]: value }));
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setUploadPhoto(file);
    setData((preve) => ({ ...preve, profile_pic: uploadPhoto?.url }));
  };

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);
      if (response.data.success) {
        setData({ name: "", email: "", password: "", profile_pic: "" });
        navigate("/email");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mt-5 flex justify-center items-center min-h-screen">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden p-6">
        <h3 className="text-2xl font-bold text-center text-gray-700">
          Register
        </h3>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
            value={data.name}
            onChange={handleOnChange}
            required
          />

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

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
            value={data.password}
            onChange={handleOnChange}
            required
          />

          <label htmlFor="profile_pic" className="cursor-pointer">
            <div className="h-14 bg-gray-200 flex justify-center items-center border rounded-lg hover:border-primary transition cursor-pointer">
              <p className="text-sm max-w-[300px] truncate">
                {uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"}
              </p>
              {uploadPhoto?.name && (
                <button
                  className="text-lg ml-2 text-red-600 hover:text-red-800"
                  onClick={handleClearUploadPhoto}
                >
                  <IoClose />
                </button>
              )}
            </div>
          </label>
          <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            className="hidden"
            onChange={handleUploadPhoto}
          />

          <button className="w-full login-btn text-lg px-4 py-2  rounded-lg font-bold text-white transition">
            Register
          </button>
        </form>

        <p className="my-3 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to={"/email"}
            className="login-btn-text font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
